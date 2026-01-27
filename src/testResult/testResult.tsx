import "./testResult.scss";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { sectionState } from "../states/section";
import { testResult } from "../states/testResult";
import { TypeTestResult } from "../types/testResult";

export const TestResult = () => {
  const setSection = useSetRecoilState(sectionState);
  const testResultValue = useRecoilValue<TypeTestResult>(testResult);
  const { data, answerdKeys, presentedKeys } = testResultValue; //presentedKeys(出題されたキー)は答え一覧と同等である

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
        <h1>正答率 {totalCorrect}/{answerdKeys.length}</h1>
        <button className="btn-back" onClick={() => setSection("list")}>
          戻る
        </button>
      </header>

      <ul className="question-list">
        {answerdKeys.map((answerKey, idx) => {
          const presentedKey = presentedKeys[idx];
          const isCorrect = answerKey === presentedKey;

          return (
            <li
              key={`${presentedKey}-${idx}`}
              className={isCorrect ? "correct" : "incorrect"}
            >
              <p className="question-text">{data[presentedKey][0]}</p>
              <p className="answer-text">
                あなたの解答: {data[answerKey][1]}
              </p>
              {!isCorrect && (
                <p className="correct-text">正解: {data[presentedKey][1]}</p>
              )}
              {isCorrect && <p className="correct-mark">〇</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
