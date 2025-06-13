export type TypeMixData = {[Key: string]: string[]} | undefined

export type TypeQuizInfo = { data: TypeMixData, title:string, perItem:number, storeId: string, idx:number }

export type TypeQuizState = {filtered_Keys: string[],correctKey: string, numOfQuestion: number}


