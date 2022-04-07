import React from "react";
import { render } from "react-dom";
import "./style.css";

const options = {
  headers: {
    accept: "application/vnd.active.results-service.v1+json",
    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "Access-Control-Allow-Origin": "*",
    "x-requested-with": "XMLHttpRequest",
    cookie:
      "passportTracking=ACTIVE; passportTracking_LEGACY=ACTIVE; passportPersonInfo_LEGACY=83B69CBF-BA23-4A65-A6F4-DDDC997980E1; user_full_name=c2ZjSm9kR2dsZ3AvekdDdTdITVNBRmFud0c5Tk90a201Z3NkeTVuOHVyMD0tLTVtVGlaYUNHM1dDNW00WGJZVUtXOGc9PQ%3D%3D--9db8c0f3757ecc1a385538682b184f33f3104374; user_first_name=YlRNN2NaV2pMWGhsbXRROWtVRFdLcG9SL3BjV25NMDIxVUJSbGhvRm1JZz0tLTBCT2I1K0laYnJreTRhSjQrallqcHc9PQ%3D%3D--448d7734afd08fc373a8e275172bba0b0a5fdff0; TS018aa77a=01572f3dbe667460f514a739d2ed4393171608b2b2b8f7c6d59f0e732a7f7c03e15602b6bbfe08ea35f5903fe75f40cbec8001f1f710e23b021caa45ed2a6f33a8fba0beac07745cbc153b34c5adab4cb8a3092f40d723afbd24d8c4513c081261a125b619079519f11e36d53ce7b29a50e37a78eb67b8f4a2881aef58ac8ae4a7cae9305c07cbdf494b7ca147c6f583ab3a021070e8a961223117c45fdf2094dfc3cc98f2d32b414526550c4b2ef9124da8005c870940b027237f5576a9c5e2b05d8e1c2f; BIGipServer~activeworks~aw_prod_resultscui_pool=!9Awy2BIFJAcMNAlJq/7l89BUzpHX7q2XCupPB7RBscky6Tum7yhM2iwrBpxqJeHUMbDZbEDf7mPMlNc=; ACTIVEPASSPORTID_LEGACY=ZmQ1ZDQ0YjQtMDRlZS00OWQ0LWJlOGMtOTA2MjVlMWViYWNk; ACTIVEWORKSCOOKIE_LEGACY=ZmQ1ZDQ0YjQtMDRlZS00OWQ0LWJlOGMtOTA2MjVlMWViYWNk; TS01884b47=01572f3dbe4bd5c926fedab24da9d2e3e475b052c6f1222448ff79ab5971eeb162cdda08fe35d4bdca750843230989697e3aa67266321b2744a2f7a75800b7abebbb505d9b65ebe6ef0642dab63d04dd3ab418f0f8d211483189a718a14c0d0cc250f539bbb878c9a05a94a93ac1736a2e62ed94a654b4d4c951539d2650ed8321b93922ad95f17d77823985cafd09bdee617bd867e5f6aef35df083762b3b6365fae7cfa83c20fb2410b33edbb7a25c00588d4f8f187f3a128d6ecc3e22180e8d82d6e6081bf1d038c5f31054ece6623561617fb95e9528d36b5d12f19f2a6afac66975e3d956a24df480b2283f47c45c6647b1719adea100e5073a73ec4604b48a94c79e14fdc13a48cb0857643e97e659621fe096b81df77a92b8f45534bf6722d6898c; OptanonAlertBoxClosed=2022-04-04T16:24:01.105Z; OPTOUTMULTI=0:0%7Cc1:0%7Cc3:0%7Cc4:0; s_fid=67FE0AC4AA7F4DF2-3351CA7E91F810AB; s_cc=true; s_vi=[CS]v1|31259D72B8B4F49C-60000B82A8BACDE4[CE]; utag_main=v_id:017ff563edeb000b3ea89ac68aa804073004906b00bd0$_sn:2$_se:4$_ss:0$_st:1649099253274$ses_id:1649097444914%3Bexp-session$_pn:4%3Bexp-session$vapi_domain:active.com; OptanonConsent=isIABGlobal=false&datestamp=Mon+Apr+04+2022+20%3A37%3A34+GMT%2B0200+(heure+d%E2%80%99%C3%A9t%C3%A9+d%E2%80%99Europe+centrale)&version=5.11.0&landingPath=NotLandingPage&groups=1%3A1%2C0_126569%3A1%2C105%3A1%2C2%3A1%2C104%3A1%2C0_126572%3A1%2C4%3A1%2C106%3A1%2C0_126571%3A1%2C3%3A1%2C0_126577%3A1%2C0_126579%3A1%2C0_126576%3A1%2C0_126575%3A1%2C0_126578%3A1%2C0_176497%3A1%2C0_127061%3A1%2C0_165538%3A1%2C0_176495%3A1%2C0_165640%3A1%2C0_165534%3A1%2C0_176493%3A1%2C0_175182%3A1%2C0_176463%3A1%2C0_176498%3A1%2C0_177396%3A1%2C0_165537%3A1%2C0_165542%3A1%2C0_165358%3A1%2C0_176499%3A1%2C0_126598%3A1&AwaitingReconsent=false; TS0168f5b2=01572f3dbed5eb184e096d109b9c3c58ccf3e9962539ffaeff59661a6c4a6213c1a283c825d028897498cb7785cdf4121fc4a73a6c03ab600ff91d0a4c78996309676958fbeb04d23134e2d1bba21500f4d40139244eea713625a330f4468fa70061b330bb0507f6710858ca56a0b4e7adba09c174890be3442fd70a9f946a8e602d6f710f07dba356e77d38fc652536fcf54816d6",
    Referer:
      "https://resultscui.active.com/events/SchneiderElectricMarathondeParis2022",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
  body: null,
  method: "GET",
};

const offset = 2000;

const url = `https://resultscui.active.com/api/results/events/SchneiderElectricMarathondeParis2022/participants?groupId=943954&routeId=170393&offset=${offset}&limit=50`;

const url2 = "https://jsonplaceholder.typicode.com/users";

const App = () => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  console.log("BG", data);

  const items = data.items;

  return (
    <div>
      {items.map((item) => {
        return <div>{item.finalResult.finalResult}</div>;
      })}
    </div>
  );
};

render(<App />, document.getElementById("root"));
