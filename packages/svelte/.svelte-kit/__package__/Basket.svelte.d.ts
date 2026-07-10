import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        size?: number | string;
        color?: string;
        strokeWidth?: number | string;
        class?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type BasketProps = typeof __propDef.props;
export type BasketEvents = typeof __propDef.events;
export type BasketSlots = typeof __propDef.slots;
export default class Basket extends SvelteComponent<BasketProps, BasketEvents, BasketSlots> {
}
export {};
//# sourceMappingURL=Basket.svelte.d.ts.map