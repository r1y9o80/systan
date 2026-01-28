import { atom } from "recoil";
import { TypeSetting } from "../types/setting";

export const settings_recoil = atom<TypeSetting>({
    key: "settings",
    default: {
        selectSum: 3,
        noneInSelect_Active: true,
        questionSum: 40,
        deduplicationRange: 5,
        selectWeight: 2,
    }
})