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
export type AmericanFootballProps = typeof __propDef.props;
export type AmericanFootballEvents = typeof __propDef.events;
export type AmericanFootballSlots = typeof __propDef.slots;
export default class AmericanFootball extends SvelteComponent<AmericanFootballProps, AmericanFootballEvents, AmericanFootballSlots> {
}
export {};
//# sourceMappingURL=AmericanFootball.svelte.d.ts.map