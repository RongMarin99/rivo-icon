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
export type AddCircleProps = typeof __propDef.props;
export type AddCircleEvents = typeof __propDef.events;
export type AddCircleSlots = typeof __propDef.slots;
export default class AddCircle extends SvelteComponent<AddCircleProps, AddCircleEvents, AddCircleSlots> {
}
export {};
//# sourceMappingURL=AddCircle.svelte.d.ts.map