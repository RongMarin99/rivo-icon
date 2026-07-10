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
export type ClockProps = typeof __propDef.props;
export type ClockEvents = typeof __propDef.events;
export type ClockSlots = typeof __propDef.slots;
export default class Clock extends SvelteComponent<ClockProps, ClockEvents, ClockSlots> {
}
export {};
//# sourceMappingURL=Clock.svelte.d.ts.map