import { shuffle } from "../Hooks/shuffle";
import type { TypeQuizState } from "../types/Quiz";

type GenerateDataType = {
  activeQuestion: string[];
  inactiveQuestion: string[];
  select: string[];
};


export const useQuizGenerator = (
  generateData: React.RefObject<GenerateDataType>,
  numOfChoice: number,
  setQuizState: React.Dispatch<React.SetStateAction<TypeQuizState>>
) => {
  const { activeQuestion, inactiveQuestion } = generateData.current;

  const filtered_Keys = shuffle(activeQuestion).slice(0, numOfChoice);
  const correctKeyIdx = Math.floor(Math.random() * numOfChoice);
  const correctKey = filtered_Keys[correctKeyIdx];

  // inactiveQuestionに正解キーを追加
  inactiveQuestion.push(correctKey);

  // activeQuestionから正解キーを削除する
  const indexInActive = activeQuestion.indexOf(correctKey);
  if (indexInActive !== -1) {
    activeQuestion.splice(indexInActive, 1);
  }

  // inactiveQuestionが5個以上なら一つactiveQuestionに戻す
  if (inactiveQuestion.length >= 6) {
    const movedBack = inactiveQuestion.shift(); // 先頭を取り出して
    if (movedBack) {
      activeQuestion.push(movedBack);
    }
  }

  console.log("inactiveQuestion", inactiveQuestion);
  console.log("activeQuestion", activeQuestion);

  setQuizState((prev: TypeQuizState) => ({
    filtered_Keys,
    correctKey,
    numOfQuestion: prev.numOfQuestion + 1,
  }));
};
