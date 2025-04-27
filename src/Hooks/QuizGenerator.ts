import { shuffle } from "../Hooks/shuffle";
import type { TypeQuizState } from "../types/Quiz";

//「次の問題」に行くために必要なデータ（情報）を更新・生成するHooks
export const useQuizGenerator = (Keys: string[], numOfChoice: number, setQuizState: React.Dispatch<React.SetStateAction<TypeQuizState>>) => {
  console.log(Keys)
  const filtered_Keys = shuffle(Keys).slice(0,numOfChoice)
  console.log(filtered_Keys)
  setQuizState((prev: TypeQuizState) => {return {
    filtered_Keys,
    correctKey: filtered_Keys[Math.floor(Math.random() * numOfChoice)],
    numOfQuestion: prev.numOfQuestion + 1,
  }});
};
