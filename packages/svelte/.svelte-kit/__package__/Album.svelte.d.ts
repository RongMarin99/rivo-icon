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
export type AlbumProps = typeof __propDef.props;
export type AlbumEvents = typeof __propDef.events;
export type AlbumSlots = typeof __propDef.slots;
export default class Album extends SvelteComponent<AlbumProps, AlbumEvents, AlbumSlots> {
}
export {};
//# sourceMappingURL=Album.svelte.d.ts.map