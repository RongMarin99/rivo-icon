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
export type AlertCircleProps = typeof __propDef.props;
export type AlertCircleEvents = typeof __propDef.events;
export type AlertCircleSlots = typeof __propDef.slots;
export default class AlertCircle extends SvelteComponent<AlertCircleProps, AlertCircleEvents, AlertCircleSlots> {
}
export {};
//# sourceMappingURL=AlertCircle.svelte.d.ts.map