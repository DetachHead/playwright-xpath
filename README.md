# playwright-xpath

a playwright [custom selector engine](https://playwright.dev/docs/extensibility#custom-selector-engines) for xpath 3.1 using [fontoxpath](https://github.com/FontoXML/fontoxpath)

## installation

```bash
npm install playwright-xpath
```

## usage

```ts
import { selectors } from 'playwright'
import xpath3 from 'playwright-xpath'

selectors.register('xpath3', xpath3)
;(async () => {
    await page.setContent('<button>Click me</button>')

    // (the starts-with function is only available in xpath 2 and above)
    await page.click("xpath3=//button[starts-with(., 'Click')]")
})()
```

## features

### xpath 3.1

currently, all browsers (and playwright) only support xpath 1.0. however there are many useful features that were added in xpath 2 and above which are now supported thanks to [fontoxpath](https://github.com/FontoXML/fontoxpath)

### svg support

due to how xml namespaces work, `svg` elements do not work when using xpath on html. to work around this, the `playwright-xpath` selector engine allows you to specify the `svg` prefix:

```ts
await page.setContent('<svg><text>asdf</text></svg>')
await page.waitForSelector('xpath=//svg/text') // doesn't work
await page.waitForSelector('xpath3=//svg/text') // doesn't work
await page.waitForSelector('xpath=//svg:svg/svg:text') // doesn't work
await page.waitForSelector('xpath3=//svg:svg/svg:text') // works
```

for more information, see [this thread](https://github.com/FontoXML/fontoxpath/issues/525#issuecomment-1235325777)
