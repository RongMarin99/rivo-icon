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
export type BarcodeProps = typeof __propDef.props;
export type BarcodeEvents = typeof __propDef.events;
export type BarcodeSlots = typeof __propDef.slots;
export default class Barcode extends SvelteComponent<BarcodeProps, BarcodeEvents, BarcodeSlots> {
}
export {};
//# sourceMappingURL=Barcode.svelte.d.ts.map