import {atom} from "recoil"

export const setting_header = atom<string>({
    key: "setting_header",
    default: "[英単語]ステージ1"
})