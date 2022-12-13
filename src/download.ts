import fs from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';
import url from 'url';
import progress from './progress'

progress();

const DOWNLOAD_TIMEOUT_MILLISECONDS = 30000; // 30 seconds

const [downloadUrl] = process.argv.slice(2);
if (!downloadUrl) {
  throw new Error(`Invalid url: ${downloadUrl}`);
}

const filename = url.parse(downloadUrl).pathname?.split('/').pop();
if (!filename) {
  throw new Error(`Invalid filename: ${filename}`);
}

const filepath = path.resolve(__dirname, '..', 'downloads', filename);

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const [page] = await browser.pages();
  await page.setRequestInterception(true);

  let initialRequest = true;

  page.on('request', (request) => {
    // cancel any navigation requests after the initial `page.goto()`
    if (request.isNavigationRequest() && !initialRequest) {
      return request.abort();
    }
    initialRequest = false;
    request.continue();
  });

  let lastResponseTime = Date.now();

  page.on('response', async (response) => {
    if (response.url().includes(downloadUrl)) {
      lastResponseTime = Date.now();
      const buffer = await response.buffer();
      await fs.writeFile(filepath, buffer);
    }
  });

  await page.goto(downloadUrl);

  setInterval(() => {
    if (Date.now() - lastResponseTime > DOWNLOAD_TIMEOUT_MILLISECONDS) {
      browser.close();
      process.exit();
    }
  }, DOWNLOAD_TIMEOUT_MILLISECONDS);
})();
