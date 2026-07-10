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
export type BagCheckProps = typeof __propDef.props;
export type BagCheckEvents = typeof __propDef.events;
export type BagCheckSlots = typeof __propDef.slots;
export default class BagCheck extends SvelteComponent<BagCheckProps, BagCheckEvents, BagCheckSlots> {
}
export {};
//# sourceMappingURL=BagCheck.svelte.d.ts.map