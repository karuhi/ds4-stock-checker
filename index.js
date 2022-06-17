const puppeteer = require("puppeteer");

const jw = {
  baseUrl: "https://joshinweb.jp/game/26171/",
  cts: {
    black: "4948872414203.html",
    white: "4948872414340.html",
    red: "4948872414296.html",
    blue: "4948872414562.html",
    gold: "4948872414357.html",
    cooper: "4948872414753.html",
  },
  getUrl: (ct) => {
    return { url: `${jw.baseUrl}${jw.cts[ct]}`, color: ct };
  },
};
const urls = [
  jw.getUrl("black"),
  jw.getUrl("white"),
  jw.getUrl("red"),
  jw.getUrl("blue"),
  jw.getUrl("gold"),
  jw.getUrl("cooper"),
];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--lang=ja"],
  });
  await Promise.all(urls.map((url) => getStockStateByColor(browser, url))).then(
    () => console.log("取得完了")
  );

  browser.close();
})();

const getStockStateByColor = async (browser, url) => {
  console.log(`${url.color}取得開始`);
  const page = await browser.newPage();
  await page.goto(url.url);
  var element = await page.waitForSelector(
    "div.mainbox:nth-child(1) > dl:nth-child(2) > dt:nth-child(1)"
  );
  var text = await page.evaluate((element) => element.textContent, element);
  console.log("===========");
  console.log(`${url.color}取得完了✨`);
  console.log(text.replace(/\s+/g, ""));
  console.log("===========");
  page.close();
};
