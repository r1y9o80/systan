import { atom } from "recoil";

export const settings_recoil = atom<Record<string,any>>({
    key: "settings",
    default: {
        selectSum: 3,
        noneInSelect_Active: true,
        questionSum: 40,
        deduplicationRange: 5,
        selectWeight: 2,
    }
})