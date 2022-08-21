import xpath from 'xpath2.js'

const staticContext = xpath.createStaticContext()
staticContext.defaultFunctionNamespace = 'http://www.w3.org/2005/xpath-functions'
staticContext.defaultElementNamespace = '*'

const queryAll = (root: typeof window, selector: string): Element[] => {
    const dynamicContext = xpath.createDynamicContext(staticContext, root)
    const expression = xpath.compile(selector, staticContext)
    return xpath.execute(expression, dynamicContext)
}

export default {
    query: (root: typeof window, selector: string): Element | undefined =>
        queryAll(root, selector)[0],
    queryAll,
}
