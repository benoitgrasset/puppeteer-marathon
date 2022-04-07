const puppeteer = require("puppeteer");
const fastcsv = require("fast-csv");
const fs = require("fs");
const writeStream = fs.createWriteStream("data.csv");

const url =
  "https://resultscui.active.com/events/SchneiderElectricMarathondeParis2022";

const getData = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  await page.waitForTimeout(5000);

  for (let i = 0; i < 100; i++) {
    const button = await page.$(
      "#root > div.app > div.app__content > div.page-body > div > div > div > div > div > div:nth-child(2) > div > div.view-more-list > div.view-more-list__footer > a"
    );
    await button.evaluate((b) => b.click());
    await page.waitForTimeout(1500); // error avec 800
    console.log("CHARGER PLUS | ", i + 1);
  }

  const data = await page.evaluate(async () => {
    const rows = document.querySelectorAll("div.event-home__item");
    const persons = [];
    rows.forEach((row) => {
      persons.push({
        rank: row.querySelector(".event-home__rank").innerText,
        // person: row.querySelector(".event-home__person .event-home__result>a")
        //   .innerText,
        result: row.querySelector(".event-home__finish .event-home__result")
          .innerText,
      });
    });
    return persons;
  });

  browser.close();

  return data;
};

getData().then((value) => {
  fastcsv
    .write(value, { headers: true })
    .on("finish", function () {
      console.log("Write to CSV successfully!");
    })
    .pipe(writeStream);
});
