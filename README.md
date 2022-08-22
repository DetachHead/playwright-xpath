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
