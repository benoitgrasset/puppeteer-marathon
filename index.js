var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var puppeteer = require("puppeteer");
var fastcsv = require("fast-csv");
var fs = require("fs");
var writeStream = fs.createWriteStream("data.csv");
var axios = require("axios");
var url = "https://resultscui.active.com/events/SchneiderElectricMarathondeParis2022";
var scrapData = function () { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, i, button, data;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch({ headless: true })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto(url)];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.waitForTimeout(5000)];
            case 4:
                _a.sent();
                i = 0;
                _a.label = 5;
            case 5:
                if (!(i < 400)) return [3 /*break*/, 10];
                return [4 /*yield*/, page.$("#root > div.app > div.app__content > div.page-body > div > div > div > div > div > div:nth-child(2) > div > div.view-more-list > div.view-more-list__footer > a")];
            case 6:
                button = _a.sent();
                return [4 /*yield*/, button.evaluate(function (b) { return b.click(); })];
            case 7:
                _a.sent();
                return [4 /*yield*/, page.waitForTimeout(1500)];
            case 8:
                _a.sent(); // error avec 800
                console.log("CHARGER PLUS | ", i + 1);
                _a.label = 9;
            case 9:
                i++;
                return [3 /*break*/, 5];
            case 10: return [4 /*yield*/, page.evaluate(function () { return __awaiter(_this, void 0, void 0, function () {
                    var rows, results;
                    return __generator(this, function (_a) {
                        rows = document.querySelectorAll("div.event-home__item");
                        results = [];
                        rows.forEach(function (row) {
                            results.push({
                                rank: row.querySelector(".event-home__rank").innerText,
                                // person: row.querySelector(".event-home__person .event-home__result>a")
                                //   .innerText,
                                result: row.querySelector(".event-home__finish .event-home__result").innerText
                            });
                        });
                        return [2 /*return*/, results];
                    });
                }); })];
            case 11:
                data = _a.sent();
                browser.close();
                return [2 /*return*/, data];
        }
    });
}); };
var scrapDataAndWriteToCSV = function () {
    scrapData().then(function (value) {
        fastcsv
            .write(value, { headers: true })
            .on("finish", function () {
            console.log("Write to CSV successfully!");
        })
            .pipe(writeStream);
    });
};
// HTTP Request
var groupId = 947610; // to update
var routeId = 170632; // to update
var limit = 100;
var items = [];
var offsets = [];
for (var i = 0; i < 50; i++) {
    offsets.push(i * limit);
}
var parseItem = function (data, offset) {
    return data.items.map(function (item, index) {
        var rank = offset + index + 1;
        var result = item.finalResult.finalResult;
        var hour = "0" + result.split("PT")[1].split("H")[0];
        var minut = "";
        var second = "";
        if (!result.includes("M")) {
            minut = "00";
            second = result.split("PT")[1].split("H")[1].split("S")[0];
        }
        else {
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
            rank: rank,
            result: "2022-04-03 " + hour + ":" + minut + ":" + second
        };
    });
};
function makeMultipleRequests() {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, _a, _b, _i, i;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _loop_1 = function (i) {
                        var offset, fetchUrl, progress, requestTime, time;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    offset = offsets[i];
                                    fetchUrl = "https://resultscui.active.com/api/results/events/SchneiderElectricMarathondeParis2022/participants?groupId=".concat(groupId, "&routeId=").concat(routeId, "&offset=").concat(offset, "&limit=").concat(limit);
                                    return [4 /*yield*/, axios.get(fetchUrl).then(function (res) {
                                            var newItems = parseItem(res.data, offset);
                                            items.push.apply(items, newItems);
                                        })];
                                case 1:
                                    _d.sent();
                                    progress = (offset / offsets[offsets.length - 1]) * 100;
                                    requestTime = 2.2;
                                    time = (offsets.length - Number(i)) * requestTime;
                                    console.log("offset: ".concat(offset, " (").concat(progress.toFixed(2), "%) (").concat(time, "s restant)"));
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a = [];
                    for (_b in offsets)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    i = _a[_i];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, items];
            }
        });
    });
}
makeMultipleRequests().then(function (items) {
    fastcsv
        .write(items, { headers: true })
        .on("finish", function () {
        console.log("Write to CSV successfully!");
    })
        .pipe(writeStream);
    var json = JSON.stringify(items);
    fs.writeFile("data.json", json, function (err) {
        if (err)
            throw err;
        console.log("complete");
    });
});
