import { TypeMixData } from "./Quiz"

export type TypeResult = {choices: string[], correctKey: string, inputKey: string}

export type TypeResultData = {data: TypeMixData,  result: TypeResult[]}