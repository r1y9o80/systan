export type TypeMixData = {[Key: string]: string[]} | undefined

export type dataForQuiz_type = { data: TypeMixData, title:string, perItem:number, idx:number, dataName: string }

export type TypeQuizState = {choices: string[][],correctKey: string[]}


