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
export type BandageProps = typeof __propDef.props;
export type BandageEvents = typeof __propDef.events;
export type BandageSlots = typeof __propDef.slots;
export default class Bandage extends SvelteComponent<BandageProps, BandageEvents, BandageSlots> {
}
export {};
//# sourceMappingURL=Bandage.svelte.d.ts.map