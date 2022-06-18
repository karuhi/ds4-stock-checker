import puppeteer from 'puppeteer'
import { urls } from './items.js'

;(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--lang=ja'],
    })
    await Promise.all(
        urls.map((url) => getStockStateByColor(browser, url))
    ).then(() => console.log('取得完了'))

    browser.close()
})()

const getStockStateByColor = async (browser, url) => {
    console.log(`${url.color}取得開始`)
    const page = await browser.newPage()
    await page.goto(url.url)
    await page
        .waitForSelector(
            'div.mainbox:nth-child(1) > dl:nth-child(2) > dt:nth-child(1)'
        )
        .then(async (element) => {
            var text = await page
                .evaluate((element) => element.textContent, element)
                .catch((err) => {
                    reject('evaluate err!!')
                })
            console.log('===========')
            console.log(`${url.color}取得完了✨`)
            console.log(text.replace(/\s+/g, ''))
            console.log('===========')
            resolve('succes!!')
        })
        .catch((err) => {
            return 'err!!'
        })
    page.close()
}
