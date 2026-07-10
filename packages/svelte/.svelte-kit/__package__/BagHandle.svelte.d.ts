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
export type BagHandleProps = typeof __propDef.props;
export type BagHandleEvents = typeof __propDef.events;
export type BagHandleSlots = typeof __propDef.slots;
export default class BagHandle extends SvelteComponent<BagHandleProps, BagHandleEvents, BagHandleSlots> {
}
export {};
//# sourceMappingURL=BagHandle.svelte.d.ts.map