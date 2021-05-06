const mailer = require('./mailer');
const ENV = require('./env');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

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
        await page.goto(ENV.baseUrl + locations[i].id)
        await page.waitForTimeout(5000)
        const content = await page.content();
        const innerText = await page.evaluate(() => {
            return JSON.parse(document.querySelector("body").innerText);
        });
        console.log(innerText);
        availabilities.push(locations[i])
        if (innerText.availabilities.length) {
            availabilities.push(locations[i])
        }
    }

    if (availabilities.length) {
        console.log('Found Locations with appointments ✨');
        console.log(availabilities);
        mailer.sendMail(availabilities);
        await browser.close()
        return 0;
    } else {
        console.log('No Appointments available');
        await browser.close()
        return 1;
    }
})
