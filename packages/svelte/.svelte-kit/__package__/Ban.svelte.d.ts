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
export type BanProps = typeof __propDef.props;
export type BanEvents = typeof __propDef.events;
export type BanSlots = typeof __propDef.slots;
export default class Ban extends SvelteComponent<BanProps, BanEvents, BanSlots> {
}
export {};
//# sourceMappingURL=Ban.svelte.d.ts.map