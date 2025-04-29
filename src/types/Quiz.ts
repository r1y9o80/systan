export type TypeMixData = {[Key: string]: string[]} | undefined

export type TypeQuizInfo = { data: TypeMixData, numOfNormalChoices: number, title:string }

export type TypeQuizState = {filtered_Keys: string[],correctKey: string, numOfQuestion: number}


