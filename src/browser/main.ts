import { evaluateXPathToFirstNode, evaluateXPathToNodes, Options } from 'fontoxpath'

const options: Options = {
    // https://github.com/FontoXML/fontoxpath/issues/525#issuecomment-1235325777
    namespaceResolver: (prefix) => {
        switch (prefix) {
            case 'svg':
                return 'http://www.w3.org/2000/svg'
            case '':
                return 'http://www.w3.org/1999/xhtml'
            default:
                throw new Error(
                    `Unused prefix used in XPath: ${prefix}. Only the 'svg' and the default namespace are registered.`,
                )
        }
    },
}

export default {
    queryAll: (root: Element | Document, selector: string): Element[] =>
        evaluateXPathToNodes(selector, root, undefined, undefined, options),
    query: (root: Element | Document, selector: string): Element | undefined =>
        evaluateXPathToFirstNode<Element>(selector, root, undefined, undefined, options) ??
        undefined,
}
