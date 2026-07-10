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
export type AttachProps = typeof __propDef.props;
export type AttachEvents = typeof __propDef.events;
export type AttachSlots = typeof __propDef.slots;
export default class Attach extends SvelteComponent<AttachProps, AttachEvents, AttachSlots> {
}
export {};
//# sourceMappingURL=Attach.svelte.d.ts.map