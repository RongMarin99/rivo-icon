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
export type AppsProps = typeof __propDef.props;
export type AppsEvents = typeof __propDef.events;
export type AppsSlots = typeof __propDef.slots;
export default class Apps extends SvelteComponent<AppsProps, AppsEvents, AppsSlots> {
}
export {};
//# sourceMappingURL=Apps.svelte.d.ts.map