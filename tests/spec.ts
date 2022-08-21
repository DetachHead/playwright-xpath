import selectorEngine from '../dist/node/main'
import { test } from '@playwright/test'
import { selectors } from 'playwright'

test.beforeAll(async () => {
    await selectors.register('xpath2', selectorEngine)
})

test('any node', async ({ page }) => {
    await page.setContent('<div>asdf</div>')
    await page.waitForSelector('xpath2=//*')
})

test('node type', async ({ page }) => {
    await page.setContent('<div><span>asdf</span></div>')
    await page.waitForSelector('xpath2=//span')
})

test('xpath 2 function', async ({ page }) => {
    await page.setContent('<div><button>Click me</button></div>')
    await page.click("xpath2=//button[starts-with(., 'Click')]")
})
