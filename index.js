import puppeteer from 'puppeteer'
import { items } from './items.js'
;(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--lang=ja'],
    })
    await Promise.all(
        items.map((item) => getStockStateByColor(browser, item))
    ).then(() => console.log('取得完了'))

    browser.close()
})()

const getStockStateByColor = async (browser, item) => {
    console.log(`${item.color}取得開始`)
    const page = await browser.newPage()
    await page.goto(item.url)
    await page
        .waitForSelector(
            'div.mainbox:nth-child(1) > dl:nth-child(2) > dt:nth-child(1)'
        )
        .then(async (element) => {
            var text = await page.evaluate(
                (element) => element.textContent,
                element
            )
            console.log('===========')
            console.log(`${item.color}取得完了✨`)
            console.log(text.replace(/\s+/g, ''))
            console.log('===========')
        })
    page.close()
}
