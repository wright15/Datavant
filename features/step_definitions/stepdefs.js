const assert = require('assert');
const { expect } = require('@playwright/test');
const { Before, After, Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(60000);

let browser;
let context;
let page;

Before(async () => {
  // Launch the Chromium browser
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  // Close the browser and its associated context
  await context.close();
  await browser.close();
});

Given('The user navigates to {string}', async (url) => {
  await page.goto(url);
  await page.waitForTimeout(5000);
});


/*
Tickets 
feature 
step 
defintions
*/
const todayDate = new Date().getDate();
let deptDaysToAdd;
let retDaysToAdd;

When('Departing from Lagos', async function () {
  await page.getByPlaceholder('From ').click();
  await page.getByPlaceholder('From ').fill('Lagos');
});

Then('Arriving in Porto - Campanha', async function () {
  await page.getByPlaceholder('To ').click();
  await page.getByPlaceholder('To ').fill('Porto - Campanha');
});

Then('Departing {int} days from Today', async function (int) {
  deptDaysToAdd = int;
  await page.getByPlaceholder('Date', { exact: true }).click();
  await page.waitForTimeout(5000);
  await page.locator('#datepicker-first_table').getByText(todayDate + deptDaysToAdd).click();
});

Then('Return {int} days from Today', async function (int) {
  retDaysToAdd = int;
  await page.getByPlaceholder('Return date').click();
  await page.waitForTimeout(5000);
  await page.locator('#datepicker-second_table').getByText((todayDate + retDaysToAdd).toString(), { exact: true }).click();
});

Then('Submit request for tickets', async function () {
  await page.getByRole('button', { name: 'Submit »' }).click();
  await page.waitForTimeout(5000);
});

Then('Click Cancel', async function () {
  await page.getByRole('button', { name: 'X Cancel' }).click();
  await page.waitForTimeout(5000);
});

Then('Validate all parameters for the train search', async function () {
  const todayDate = new Date();
  //const todayDate = new Date(2006, 11, 30); // Month is zero-based (0 = January, 11 = December) //For testing end year edge case
  deptDaysToAdd;
  retDaysToAdd;

  const deptDate = new Date(todayDate);
  deptDate.setDate(todayDate.getDate() + deptDaysToAdd);

  const retDate = new Date(todayDate);
  retDate.setDate(todayDate.getDate() + retDaysToAdd);

  const deptMonth = deptDate.getMonth() + 1;
  const retMonth = retDate.getMonth() + 1;

  const deptYear = deptDate.getFullYear();
  const retYear = retDate.getFullYear();

  const deptPageDate = `${deptYear}-${deptMonth}-${deptDate.getDate()}`;
  const retPageDate = `${retYear}-${retMonth}-${retDate.getDate()}`;


  await page.waitForFunction(() => {
    const textOnPage = document.body.textContent;  // Get the text content of the entire page
    return textOnPage.includes('Lagos');  // Check if 'Lagos' is in the page's text
  }, { timeout: 5000 });

  await page.waitForFunction(() => {
    const textOnPage = document.body.textContent;  // Get the text content of the entire page
    return textOnPage.includes('Porto - Campanha');  // Check if 'Porto - Campanha' is in the page's text
  }, { timeout: 5000 });

  const pageContent = await page.textContent('body');
  expect(pageContent).toContain(deptPageDate); // Date time format 17 October, 2023 does not appear in body as i would expect
  expect(pageContent).toContain(retPageDate);

});
