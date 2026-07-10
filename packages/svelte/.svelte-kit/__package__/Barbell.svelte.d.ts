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
export type BarbellProps = typeof __propDef.props;
export type BarbellEvents = typeof __propDef.events;
export type BarbellSlots = typeof __propDef.slots;
export default class Barbell extends SvelteComponent<BarbellProps, BarbellEvents, BarbellSlots> {
}
export {};
//# sourceMappingURL=Barbell.svelte.d.ts.map