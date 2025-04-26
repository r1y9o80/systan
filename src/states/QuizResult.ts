import { atom } from "recoil";
import { TypeQuestionData } from "../types/QuestionData";

export const QuizResult = atom<{questionData: TypeQuestionData, choices: string[], correctKey: number, selectedKey: number}[]>({
    key: "QuizResult",
    default: [{questionData: {"":{Key: 0, Value:["",""]}}, choices: [], correctKey: 0, selectedKey: 0}]

})