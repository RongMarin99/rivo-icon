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
export type BaseballProps = typeof __propDef.props;
export type BaseballEvents = typeof __propDef.events;
export type BaseballSlots = typeof __propDef.slots;
export default class Baseball extends SvelteComponent<BaseballProps, BaseballEvents, BaseballSlots> {
}
export {};
//# sourceMappingURL=Baseball.svelte.d.ts.map