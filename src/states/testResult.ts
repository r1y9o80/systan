import {atom} from "recoil"
import { TypeTestResult } from "../types/testResult"

export const testResult = atom<TypeTestResult>({
    key: "testResult",
    default: {data: {}, answerdKeys: [], presentedKeys: []}
})