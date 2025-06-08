import { atom } from "recoil"

export const sectionState = atom<string>({
    key: "sectionState",
    default: "home"
})