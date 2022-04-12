const puppeteer = require("puppeteer");
const fastcsv = require("fast-csv");
const fs = require("fs");
const writeStream = fs.createWriteStream("data.csv");
const axios = require("axios");

type Result = {
  rank: string;
  result: string;
};

const url =
  "https://resultscui.active.com/events/SchneiderElectricMarathondeParis2022";

const scrapData = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  await page.waitForTimeout(5000);

  for (let i = 0; i < 400; i++) {
    const button = await page.$(
      "#root > div.app > div.app__content > div.page-body > div > div > div > div > div > div:nth-child(2) > div > div.view-more-list > div.view-more-list__footer > a"
    );
    await button.evaluate((b) => b.click());
    await page.waitForTimeout(1500); // error avec 800
    console.log("CHARGER PLUS | ", i + 1);
  }

  const data = await page.evaluate(async () => {
    const rows = document.querySelectorAll("div.event-home__item");
    const results: Array<Result> = [];
    rows.forEach((row) => {
      results.push({
        rank: (row.querySelector(".event-home__rank") as HTMLElement).innerText,
        // person: row.querySelector(".event-home__person .event-home__result>a")
        //   .innerText,
        result: (
          row.querySelector(
            ".event-home__finish .event-home__result"
          ) as HTMLElement
        ).innerText,
      });
    });
    return results;
  });

  browser.close();

  return data;
};

const scrapDataAndWriteToCSV = () => {
  scrapData().then((value) => {
    fastcsv
      .write(value, { headers: true })
      .on("finish", function () {
        console.log("Write to CSV successfully!");
      })
      .pipe(writeStream);
  });
};

type Person = {
  firstName: string;
  lastName: string;
  gender: "M" | "F";
  age: number;
  enterprisePersonId: string;
  address: {};
};

type FinalResult = {
  id: number;
  participantId: number;
  finishTime: string;
  chipTimeResult: string;
  gunTime: string;
  gunTimeResult: string;
  averageSpeed: number;
  displayPace: string;
  disqualified: boolean;
  finalResult: string;
  distanceUnit: string;
  routeStageResults: any[];
};

type Item = {
  id: number;
  bib: string;
  externalId: string;
  finalResult: FinalResult;
  person: Person;
  groupRanks: string[];
  participantCustomFields: {
    photoURL: string;
    certificateURL: string;
    videoURL: string;
  };
};

// HTTP Request
const groupId = 944142;
const routeId = 170406;
const limit = 100;
const items: Array<Item> = [];
const offsets: Array<number> = [];
for (let i = 0; i < 400; i++) {
  offsets.push(i * limit);
}

const parseItem = (data: any, offset: number) => {
  return data.items.map((item: Item, index: number) => {
    const rank = offset + index + 1;
    const result = item.finalResult.finalResult;
    const hour = "0" + result.split("PT")[1].split("H")[0];
    let minut = "";
    let second = "";
    if (!result.includes("M")) {
      minut = "00";
      second = result.split("PT")[1].split("H")[1].split("S")[0];
    } else {
      minut = result.split("PT")[1].split("H")[1].split("M")[0];
      second = result.split("PT")[1].split("H")[1].split("M")[1].split("S")[0];
      minut = minut.length === 2 ? minut : "0" + minut;
    }
    if (second.length === 0) {
      second = "00";
    }
    if (second.length === 1) {
      second = "0" + second;
    }

    return {
      rank,
      result: hour + ":" + minut + ":" + second,
    };
  });
};

async function makeMultipleRequests() {
  for (const i in offsets) {
    const offset = offsets[i];
    const fetchUrl = `https://resultscui.active.com/api/results/events/SchneiderElectricMarathondeParis2022/participants?groupId=${groupId}&routeId=${routeId}&offset=${offset}&limit=${limit}`;
    await axios.get(fetchUrl).then((res) => {
      const newItems = parseItem(res.data, offset);
      items.push(...newItems);
    });
    const progress = (offset / offsets[offsets.length - 1]) * 100;
    console.log(`offset: ${offset} (${progress.toFixed(2)}%)`);
  }
  return items;
}

makeMultipleRequests().then((items) => {
  fastcsv
    .write(items, { headers: true })
    .on("finish", function () {
      console.log("Write to CSV successfully!");
    })
    .pipe(writeStream);
});
