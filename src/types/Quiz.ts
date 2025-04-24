export type TypeQuizInfo = { dataName: string, startItem: number, perItem: number, NumOfChoice: number }

export type TypeMixData = {[Key: number | string]: string[]} | undefined

export type TypeQuizState = {questionData: {Key: number | string, Value: string[]}[], correctIdx: number, numOfQuestion: number}


