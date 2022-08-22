import { evaluateXPathToFirstNode, evaluateXPathToNodes, Options } from 'fontoxpath'

const options: Options = {
    // needed for firefox for some reason
    namespaceResolver: () => 'http://www.w3.org/1999/xhtml',
}

export default {
    queryAll: (root: Element | Document, selector: string): Element[] =>
        evaluateXPathToNodes(selector, root, undefined, undefined, options),
    query: (root: Element | Document, selector: string): Element | undefined =>
        evaluateXPathToFirstNode<Element>(selector, root, undefined, undefined, options) ??
        undefined,
}
