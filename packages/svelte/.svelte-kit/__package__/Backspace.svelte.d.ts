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
export type BackspaceProps = typeof __propDef.props;
export type BackspaceEvents = typeof __propDef.events;
export type BackspaceSlots = typeof __propDef.slots;
export default class Backspace extends SvelteComponent<BackspaceProps, BackspaceEvents, BackspaceSlots> {
}
export {};
//# sourceMappingURL=Backspace.svelte.d.ts.map