import { atom } from "recoil";
import { TypeToList } from "../types/toList";

export const toList = atom<TypeToList>({
    key: "toList",
    default: {data:{}, title:""},
})