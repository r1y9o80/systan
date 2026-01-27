import "./testResult.scss";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { sectionState } from "../states/section";
import { testResult } from "../states/testResult";
import { TypeTestResult } from "../types/testResult";

const UNKNOWN_KEY = "__UNKNOWN__"; // Test.tsx と同じ

export const TestResult = () => {
  const setSection = useSetRecoilState(sectionState);
  const testResultValue = useRecoilValue<TypeTestResult>(testResult);
  const { data, answerdKeys, presentedKeys } = testResultValue;

  if (!data || answerdKeys.length !== presentedKeys.length) {
    setSection("list");
    return null;
  }

  const totalCorrect = answerdKeys.reduce(
    (count, val, i) => (val === presentedKeys[i] ? count + 1 : count),
    0
  );

  return (
    <div className="testResult-body">
      <header className="testResult-header">
        <h1 className="testResult-score">正答率 {totalCorrect}/{answerdKeys.length}</h1>
        <button className="testResult-btn-back" onClick={() => setSection("list")}>戻る</button>
      </header>

      <ul className="testResult-question-list">
        {answerdKeys.map((answerKey, idx) => {
          const presentedKey = presentedKeys[idx];
          const isCorrect = answerKey === presentedKey;

          return (
            <li key={`${presentedKey}-${idx}`} className={`testResult-question ${isCorrect ? "testResult-correct" : "testResult-incorrect"}`}>
              <p className="testResult-question-text">{data[presentedKey][0]}</p>
              <p className="testResult-answer-text">
                あなたの解答: {answerKey === UNKNOWN_KEY ? "わからない" : data[answerKey]?.[1] ?? "―"}
              </p>
              {!isCorrect && <p className="testResult-correct-text">正解: {data[presentedKey][1]}</p>}
              {isCorrect && <p className="testResult-correct-mark">〇</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
