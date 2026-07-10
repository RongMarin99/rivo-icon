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
export type ArrowRedoProps = typeof __propDef.props;
export type ArrowRedoEvents = typeof __propDef.events;
export type ArrowRedoSlots = typeof __propDef.slots;
export default class ArrowRedo extends SvelteComponent<ArrowRedoProps, ArrowRedoEvents, ArrowRedoSlots> {
}
export {};
//# sourceMappingURL=ArrowRedo.svelte.d.ts.map