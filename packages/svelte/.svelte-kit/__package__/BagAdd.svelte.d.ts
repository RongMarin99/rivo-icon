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
export type BagAddProps = typeof __propDef.props;
export type BagAddEvents = typeof __propDef.events;
export type BagAddSlots = typeof __propDef.slots;
export default class BagAdd extends SvelteComponent<BagAddProps, BagAddEvents, BagAddSlots> {
}
export {};
//# sourceMappingURL=BagAdd.svelte.d.ts.map