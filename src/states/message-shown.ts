import { atom } from "recoil";

export const message_shown = atom<boolean>({
    key: "message_shown",
    default: true,
})