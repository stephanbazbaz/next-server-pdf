import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  const { id } = req.query
  console.log(id);
  await printPDF(id)
  res.status(200).json({ success: true })
}
async function printPDF(id) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`http://localhost:3000/GetPokes/${id}`, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('screen');
  const pdf = await page.pdf({
    format: 'A4',
    path: '/home/stephan/Desktop/newresult.pdf',
    printBackground: true,
  });

  await browser.close();
  return pdf
}