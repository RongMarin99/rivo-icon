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
export type SettingFilledProps = typeof __propDef.props;
export type SettingFilledEvents = typeof __propDef.events;
export type SettingFilledSlots = typeof __propDef.slots;
export default class SettingFilled extends SvelteComponent<SettingFilledProps, SettingFilledEvents, SettingFilledSlots> {
}
export {};
//# sourceMappingURL=SettingFilled.svelte.d.ts.map