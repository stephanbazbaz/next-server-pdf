import puppeteer from 'puppeteer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = req.body
        // await postToPdf(body)
        const result = await getPdf(body)
        res.setHeader( 'Content-Type', 'application/pdf')
        res.setHeader( 'Content-disposition', `attachment;filename=report.pdf`)
        res.send(result);
    } else {
        // Handle any other HTTP method
    }
}

async function gotoExtended(page, request) {
    const {postData} = request;
    const url = "http://localhost:3000/GetPokes"
    let wasCalled = false;
    await page.setRequestInterception(true);
    const interceptRequestHandler = async (request) => {
        try {
            if (wasCalled) {
                return await request.continue();
            }
            wasCalled = true;
            const requestParams = {
                method: 'POST',
                postData,
                headers: {
                    "Content-Type": "application/json"
                }
            };

            await request.continue(requestParams);
            await page.setRequestInterception(true);
        } catch (error) {
            console.log('Error while request interception', {error});
        }
    };
    await page.on('request', interceptRequestHandler);
    return page.goto(url);
}

async function postToPdf(body) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await gotoExtended(page, {postData: JSON.stringify(body)});
    await page.content()
    await page.emulateMediaType('screen');
    const pdf = await page.pdf({
        format: 'A4',
        path: '/home/stephan/Desktop/newresultttttt.pdf',
        printBackground: true,
    });
    await browser.close();
    return pdf
}

async function getPdf(obj) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.once('request', (request) => {
        const data = {
            method: 'POST',
            postData: JSON.stringify(obj),
            headers: {
                ...request.headers(),
                'Content-Type': 'application/json',
            },
        };

        request.continue(data);
        // Immediately disable setRequestInterception, or all other requests will hang
        page.setRequestInterception(false);
    });

    // Navigate, trigger the intercept, and resolve the response
    await page.goto('http://localhost:3000/GetPokes', {
        waitUntil: 'networkidle0',
    });

    await page.content();
    await page.emulateMediaType('screen');
    const pdf = await page.pdf({
        format: 'A4',
        path: '/home/stephan/Desktop/newresultttttt.pdf',
        printBackground: true,
    });
    // Close the browser - done!
    await browser.close();
    return pdf;
}