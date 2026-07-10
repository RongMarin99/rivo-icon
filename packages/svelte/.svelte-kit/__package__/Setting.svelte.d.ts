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
export type SettingProps = typeof __propDef.props;
export type SettingEvents = typeof __propDef.events;
export type SettingSlots = typeof __propDef.slots;
export default class Setting extends SvelteComponent<SettingProps, SettingEvents, SettingSlots> {
}
export {};
//# sourceMappingURL=Setting.svelte.d.ts.map