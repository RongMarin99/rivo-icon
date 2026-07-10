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
export type BagRemoveProps = typeof __propDef.props;
export type BagRemoveEvents = typeof __propDef.events;
export type BagRemoveSlots = typeof __propDef.slots;
export default class BagRemove extends SvelteComponent<BagRemoveProps, BagRemoveEvents, BagRemoveSlots> {
}
export {};
//# sourceMappingURL=BagRemove.svelte.d.ts.map