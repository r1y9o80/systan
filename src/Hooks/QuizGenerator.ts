import { shuffle } from "../Hooks/shuffle";
import type { TypeQuizState } from "../types/Quiz";

type GenerateDataType = {
  activeQuestion: string[];
  inactiveQuestion: string[];
  select: string[];
};


export const useQuizGenerator = (
  QuizData: Record<string, any>,
  generateData: React.RefObject<GenerateDataType>,
  numOfChoice: number,
  setQuizState: React.Dispatch<React.SetStateAction<TypeQuizState>>
) => {
  const { activeQuestion, inactiveQuestion } = generateData.current;

  const filtered_Keys = generateSelect(QuizData, activeQuestion, numOfChoice)
  console.log(filtered_Keys)
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

function generateSelect(QuizData: Record<string, any>, Keys: string[], numOfChoice: number): string[] {
  const newKeys: string[] = [];
  const selects: string[] = [];
  const mixKeys = shuffle(Keys);
  let i = 0;

  while (i < mixKeys.length && newKeys.length < numOfChoice) {
    const key = mixKeys[i++];
    const entry = QuizData[key];

    const select = entry[1];
    if (selects.includes(select)) continue;

    newKeys.push(key);
    selects.push(select);
  }

  return newKeys;
}
