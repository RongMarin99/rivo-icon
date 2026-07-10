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
export type PlusProps = typeof __propDef.props;
export type PlusEvents = typeof __propDef.events;
export type PlusSlots = typeof __propDef.slots;
export default class Plus extends SvelteComponent<PlusProps, PlusEvents, PlusSlots> {
}
export {};
//# sourceMappingURL=Plus.svelte.d.ts.map