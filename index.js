import puppeteer from 'puppeteer'
import { items, company } from './items.js'
const parallelCount = 4

const getControllerStocks = async (items, parallelCount) => {
    const parallelBatches = Math.ceil(items.length / parallelCount)

    console.log(`itemCount: ${items.length}, ParallelCount: ${parallelCount}`)

    console.log(`Batches: ${parallelBatches}`)

    // Itemsの配列を並列で処理する
    let k = 0
    for (let i = 0; i < items.length; i += parallelCount) {
        k++
        console.log('\nBatch ' + k + ' of ' + parallelBatches)
        // Chromiumを起動する
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--lang=ja'],
        })
        // puppeteer.launch()で起動したChromiumを使用する
        const context = await browser.createIncognitoBrowserContext()
        const page = await context.newPage()
        page.setJavaScriptEnabled(false)

        const promises = []
        for (let j = 0; j < parallelCount; j++) {
            const elem = i + j
            // elements[elem]が存在するか確認する
            if (items[elem] !== undefined) {
                // スクレイピングをPromiseする
                console.log(`🖖 ${items[elem].name.ja} Cheking...`)
                promises.push(
                    browser.newPage().then(async (page) => {
                        await page.setViewport({ width: 1280, height: 800 })
                        try {
                            // page.gotoがエラーにならない場合のみ実行する
                            await page.goto(items[elem].url)
                            await page
                                .waitForSelector(
                                    items[elem].name.company == 0
                                        ? 'div.mainbox:nth-child(1) > dl:nth-child(2) > dt:nth-child(1)'
                                        : '#js_buyBoxMain > ul:nth-child(1) > li:nth-child(1) > div:nth-child(1) > p:nth-child(1)',
                                    { timeout: 3000 }
                                )
                                .then(async (element) => {
                                    var text = await page.evaluate(
                                        (element) => element.textContent,
                                        element
                                    )
                                    console.log(
                                        `✅ ${items[elem].name.ja} is Successfly Checked.`
                                    )
                                    console.log(
                                        `[${
                                            company[items[elem].name.company]
                                                .name
                                        }] ${text.replace(/\s+/g, '')}`
                                    )
                                })
                        } catch (err) {
                            console.log(
                                `❌ ${items[elem].name.ja} is Failed to Check.`
                            )
                        } finally {
                            await page.close()
                        }
                    })
                )
            }
        }

        // すべてのPromiseの終了を待ってからブラウザを終了する
        await Promise.all(promises)
        await browser.close()

        console.log('\nCheck has All ended.\nwaiting for next batch...\n')
    }
}

getControllerStocks(items, parallelCount)
