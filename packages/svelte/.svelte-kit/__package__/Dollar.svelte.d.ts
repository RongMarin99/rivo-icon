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
export type DollarProps = typeof __propDef.props;
export type DollarEvents = typeof __propDef.events;
export type DollarSlots = typeof __propDef.slots;
export default class Dollar extends SvelteComponent<DollarProps, DollarEvents, DollarSlots> {
}
export {};
//# sourceMappingURL=Dollar.svelte.d.ts.map