import { atom } from "recoil";

export const userData_recoil = atom<Object>({
    key: "userData",
    default: {},
})