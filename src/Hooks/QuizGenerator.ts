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
  setQuizState: React.Dispatch<React.SetStateAction<TypeQuizState>>,
  result_log: Record<string, {"occurrenceRate": number, "corrected": number}>
) => {

  const { activeQuestion, inactiveQuestion } = generateData.current;
  
  const correctKey: string = setCorrectKey(activeQuestion, inactiveQuestion, result_log)

  // 正解を含む選択肢を取得
  const filtered_Keys = generateSelect(QuizData, activeQuestion, numOfChoice, correctKey);
  console.log("filtered_Keys:", filtered_Keys);


  console.log("inactiveQuestion:", inactiveQuestion);
  console.log("activeQuestion:", activeQuestion);

  // 状態更新
  setQuizState((prev: TypeQuizState) => ({
    filtered_Keys,
    correctKey,
    numOfQuestion: prev.numOfQuestion + 1,
  }));
};



//選択肢の中に同じ答え(日本語)が入らないようにする関数
function generateSelect(
  QuizData: Record<string, any>,
  Keys: string[],
  numOfChoice: number,
  correctKey: string
): string[] {
  const newKeys: string[] = [correctKey];
  const selectsSet = new Set<string>();
  selectsSet.add(QuizData[correctKey][1])
  const mixKeys = shuffle(Keys).filter((e) => e !== correctKey); //正解のキー以外の混ぜられたキー配列
  let i = 0;
  while (i < mixKeys.length && newKeys.length < numOfChoice) {
    const key = mixKeys[i++];
    const entry = QuizData[key];
    const select = entry[1];

    // Set で重複チェック（高速）
    if (selectsSet.has(select)) continue;

    newKeys.push(key);
    selectsSet.add(select);
  }

  return shuffle(newKeys);
}


//同じ問題が５問以内に出現しないように正解等を生成す関数・出現確立に対応させる予定
function setCorrectKey(
  activeQuestion: string[],
  inactiveQuestion: string[],
  result_log: Record<string, {"occurrenceRate": number, "corrected": number}>
){
  const Mixoccurrence = Object.fromEntries(Object.entries(result_log).filter(([key,_]) => activeQuestion.includes(key)));
  const CorrectKey = generateCorrectKey(Mixoccurrence)
  const CorrectIdx = activeQuestion.indexOf(CorrectKey)
  if(CorrectIdx === -1) return ""
  inactiveQuestion.push(CorrectKey)
  activeQuestion.splice(CorrectIdx,1)
  //長さ６以上で既出現済み配列から元に戻す
  if(inactiveQuestion.length >= 6){
    const restored = inactiveQuestion.shift()
    restored && activeQuestion.push(restored)
  }
  return CorrectKey
}


function generateCorrectKey(
  result_log: Record<string, {"occurrenceRate": number, "corrected": number}>
): string {
  const entries = Object.entries(result_log);
  const total = entries.reduce((acc, [_, v]) => acc + v["occurrenceRate"], 0);
  const r = Math.random() * total;

  let acc = 0;
  for (const [key, value] of entries) {
    acc += value["occurrenceRate"];
    if (r < acc) return key;
  }
  return entries[entries.length - 1][0]; // fallback
}

