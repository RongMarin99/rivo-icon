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
export type AtCircleProps = typeof __propDef.props;
export type AtCircleEvents = typeof __propDef.events;
export type AtCircleSlots = typeof __propDef.slots;
export default class AtCircle extends SvelteComponent<AtCircleProps, AtCircleEvents, AtCircleSlots> {
}
export {};
//# sourceMappingURL=AtCircle.svelte.d.ts.map