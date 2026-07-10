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
export type AnalyticsProps = typeof __propDef.props;
export type AnalyticsEvents = typeof __propDef.events;
export type AnalyticsSlots = typeof __propDef.slots;
export default class Analytics extends SvelteComponent<AnalyticsProps, AnalyticsEvents, AnalyticsSlots> {
}
export {};
//# sourceMappingURL=Analytics.svelte.d.ts.map