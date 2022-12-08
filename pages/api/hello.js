import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  await printPDF()

  res.status(200).json({ name: 'John Doe' })
}
async function printPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/GetPokes/1', { waitUntil: 'networkidle0' });
  await page.emulateMediaType('screen');
  const pdf = await page.pdf({
    format: 'A4',
    path: '/Users/user/Desktop/result.pdf',
    printBackground: true,
  });

  await browser.close();
  return pdf
}