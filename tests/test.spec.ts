import selectorEngine from '../dist/node/main'
import { test } from '@playwright/test'
import { selectors } from 'playwright'

test.beforeAll(async () => {
    await selectors.register('xpath3', selectorEngine)
})

test('any node', async ({ page }) => {
    await page.setContent('<div>asdf</div>')
    await page.waitForSelector('xpath3=//*')
})

test('node type', async ({ page }) => {
    await page.setContent('<div><span>asdf</span></div>')
    await page.waitForSelector('xpath3=//span')
})

test('xpath 2 function', async ({ page }) => {
    await page.setContent('<div><button>Click me</button></div>')
    await page.click("xpath3=//button[starts-with(., 'Click')]")
})

test.describe('svg', () => {
    test('svg', async ({ page }) => {
        await page.setContent('<svg><text>asdf</text></svg>')
        await page.waitForSelector('xpath3=//svg:svg')
    })

    test('svg inner element', async ({ page }) => {
        await page.setContent('<svg><text>asdf</text></svg>')
        await page.waitForSelector('xpath3=//svg:svg/svg:text')
    })
})

// TODO: xpath 3 tests
