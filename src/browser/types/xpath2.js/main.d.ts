// TODO: complete these and make a PR to either xpath2.js or definitelytyped
declare module 'xpath2.js' {
    import { NonNullish } from '@detachhead/ts-helpers/dist/utilityTypes/misc'

    export type NamespaceResolver = (prefix: string) => string | null
    export class StaticContext {
        constructor(namespaceResolver?: NamespaceResolver, baseURI?: string | null)
        public namespaceResolver: NamespaceResolver | null
        baseURI: string
        defaultFunctionNamespace: string
        defaultElementNamespace: string
    }
    export class DynamicContext {
        constructor(
            staticContext: StaticContext,
            item: unknown,
            scope?: unknown,
            domAdapter?: unknown,
        )

        staticContent: StaticContext
        // TODO: figure out what these types are
        item: unknown
        scope: unknown
        stack: NonNullish
        DOMAdapter: Document // TODO: this isnt fully accurate, its actually a DOMAdapter which is a supertype of document i think
    }

    export class Expression {
        constructor(expression: string, staticContext: StaticContext)
        internalExpression: unknown
    }

    export function createStaticContext(
        resolver?: NamespaceResolver,
        baseURI?: string,
    ): StaticContext

    export function createDynamicContext(
        staticContext: StaticContext,
        item: unknown,
        scope?: unknown,
        domAdapter?: unknown,
    ): DynamicContext

    function compile(expression: string, staticContext: StaticContext): Expression
    function execute(expression: Expression, dynamicContext: DynamicContext): Element[]
}
