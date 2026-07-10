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
export type PlusFilledProps = typeof __propDef.props;
export type PlusFilledEvents = typeof __propDef.events;
export type PlusFilledSlots = typeof __propDef.slots;
export default class PlusFilled extends SvelteComponent<PlusFilledProps, PlusFilledEvents, PlusFilledSlots> {
}
export {};
//# sourceMappingURL=PlusFilled.svelte.d.ts.map