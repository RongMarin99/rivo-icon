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
export type ArrowUndoProps = typeof __propDef.props;
export type ArrowUndoEvents = typeof __propDef.events;
export type ArrowUndoSlots = typeof __propDef.slots;
export default class ArrowUndo extends SvelteComponent<ArrowUndoProps, ArrowUndoEvents, ArrowUndoSlots> {
}
export {};
//# sourceMappingURL=ArrowUndo.svelte.d.ts.map