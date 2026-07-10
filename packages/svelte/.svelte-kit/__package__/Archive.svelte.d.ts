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
export type ArchiveProps = typeof __propDef.props;
export type ArchiveEvents = typeof __propDef.events;
export type ArchiveSlots = typeof __propDef.slots;
export default class Archive extends SvelteComponent<ArchiveProps, ArchiveEvents, ArchiveSlots> {
}
export {};
//# sourceMappingURL=Archive.svelte.d.ts.map