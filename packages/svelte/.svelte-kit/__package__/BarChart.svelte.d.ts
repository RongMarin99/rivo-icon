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
export type BarChartProps = typeof __propDef.props;
export type BarChartEvents = typeof __propDef.events;
export type BarChartSlots = typeof __propDef.slots;
export default class BarChart extends SvelteComponent<BarChartProps, BarChartEvents, BarChartSlots> {
}
export {};
//# sourceMappingURL=BarChart.svelte.d.ts.map