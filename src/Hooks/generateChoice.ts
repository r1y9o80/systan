import { shuffle } from "../Hooks/shuffle";

export const useChoicesGenerator = (
  QuizData: Record<string, any>,
  keys: string[],
  newCorrectKey: string,
  numOfChoice: number,
) => {

  // 正解を含む選択肢を取得
  const choices = generateSelect(QuizData, keys, numOfChoice, newCorrectKey);
  return choices
};



//選択肢の中に同じ答え(日本語)が入らないようにする関数
function generateSelect(
  QuizData: Record<string, any>,
  Keys: string[],
  numOfChoice: number,
  correctKey: string
): string[] {
  const valueSet = new Set([QuizData[correctKey][1]]);  //選択肢リスト(set)。あらかじめ正解キーを入れておく
  const choices = [correctKey];
  console.log("QuizData:",QuizData)

  for (const key of shuffle(Keys)) {
    if (key === correctKey) continue;
    const value = QuizData[key][1];
    if (valueSet.has(value)) continue;
    choices.push(key);
    valueSet.add(value)

    if (choices.length === numOfChoice) break;
  }
  return shuffle(choices);
}
