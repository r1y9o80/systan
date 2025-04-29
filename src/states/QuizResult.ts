import { atom } from "recoil";
import { TypeResultData } from "../types/Quiz_Result";

export const QuizResultState = atom<TypeResultData >({
    key: "QuizResult",
    default: {
      data: undefined,
      result: [{ choices: [], correctKey: "", inputKey: "" }],
      CorrectPercentage: 0,
    }
})
  