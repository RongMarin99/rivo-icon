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
export type BalloonProps = typeof __propDef.props;
export type BalloonEvents = typeof __propDef.events;
export type BalloonSlots = typeof __propDef.slots;
export default class Balloon extends SvelteComponent<BalloonProps, BalloonEvents, BalloonSlots> {
}
export {};
//# sourceMappingURL=Balloon.svelte.d.ts.map