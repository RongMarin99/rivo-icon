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
export type AtProps = typeof __propDef.props;
export type AtEvents = typeof __propDef.events;
export type AtSlots = typeof __propDef.slots;
export default class At extends SvelteComponent<AtProps, AtEvents, AtSlots> {
}
export {};
//# sourceMappingURL=At.svelte.d.ts.map