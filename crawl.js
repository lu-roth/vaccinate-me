// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const baseUrl = 'https://www.impfen-saarland.de/service/api/left_over/availabilities.json?event_category_id=';
const locations = [{
    id: '85042',
    name: 'Saarbrücken'
    },
    {
        id: '85041',
        name: 'Saarlouis'
    },
    {
        id: '85040',
        name: 'Neunkirchen'
    },
    {
        id: '87534',
        name: 'Lebach'
    },
    {
        id: '87534-night',
        name: 'Lebach_nacht'
    }];
let availabilities = [];

puppeteer.launch({headless: true}).then(async browser => {
    console.log('Start Crawling..')
    for (let i = 0; i < locations.length; i++) {
        console.log('Location: ID ' + locations[i].id + ' ' + locations[i].name)
        const page = await browser.newPage()
        await page.goto(baseUrl + locations[i].id)
        await page.waitForTimeout(5000)
        const content = await page.content();
        const innerText = await page.evaluate(() => {
            return JSON.parse(document.querySelector("body").innerText);
        });
        console.log(innerText);
        if (innerText.availabilities.length) {
            availabilities.push(locations[i])
        }
    }

    if (availabilities.length) {
        console.log('Found Locations with appointments ✨');
        console.log(availabilities);
        await browser.close()
        return 0;
    } else {
        console.log('No Appointments available');
        await browser.close()
        return 1;
    }
})
