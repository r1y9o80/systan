import { shuffle } from "../Hooks/shuffle";
import type { TypeQuizState, TypeMixData } from "../types/Quiz";

//「次の問題」に行くために必要なデータ（情報）を更新・生成するHooks
export const useQuizGenerator = (mixData: TypeMixData ,startItem: number, perItem: number, NumOfChoice: number, setQuizState: React.Dispatch<React.SetStateAction<TypeQuizState>>) => {
  if(!mixData) return
  const selectedKeys = shuffle(Array.from({length: perItem}, (_,i) => startItem + i)).slice(0,NumOfChoice + 1)
  const questionData = selectedKeys.map((Key) => { return {Key, Value:mixData[Key]} });
  console.log(questionData)
  setQuizState((prev: TypeQuizState) => {return {
    questionData,
    correctIdx: Math.floor(Math.random() * (NumOfChoice+1)),
    numOfQuestion: prev.numOfQuestion + 1,
  }});
};
