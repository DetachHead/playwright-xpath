import { evaluateXPathToFirstNode, evaluateXPathToNodes, Options } from 'fontoxpath'

const options: Options = {
    // https://github.com/FontoXML/fontoxpath/issues/525#issuecomment-1235325777
    namespaceResolver: (prefix) => (prefix ? null : 'http://www.w3.org/1999/xhtml'),
}

export default {
    queryAll: (root: Element | Document, selector: string): Element[] =>
        evaluateXPathToNodes(selector, root, undefined, undefined, options),
    query: (root: Element | Document, selector: string): Element | undefined =>
        evaluateXPathToFirstNode<Element>(selector, root, undefined, undefined, options) ??
        undefined,
}
