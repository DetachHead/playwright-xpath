# playwright-xpath

a playwright [custom selector engine](https://playwright.dev/docs/extensibility#custom-selector-engines) for [xpath 2.0](https://en.wikipedia.org/wiki/XPath_2.0)

maybe also xpath 3 in the future idk

## installation

```bash
npm install playwright-xpath
```

## usage

```ts
import { selectors } from 'playwright'
import xpath2 from 'playwright-xpath2'

selectors.register('xpath2', xpath2)
;(async () => {
    await page.setContent('<button>Click me</button>')

    // (the starts-with function is only available in xpath 2)
    await page.click("xpath2=//button[starts-with(., 'Click')]")
})()
```
