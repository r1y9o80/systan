import "./test.scss";
import { useState, useRef, useMemo } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { sectionState } from "../states/section";
import { toList } from "../states/list";
import { TypeToList } from "../types/toList";
import { shuffle } from "../Hooks/shuffle";
import { testResult } from "../states/testResult";
import { TypeTestResult } from "../types/testResult";
import { sendTestResult } from "../Hooks/sendTestResult";

const UNKNOWN_KEY = "__UNKNOWN__";
const DUMMY_KEY = "__DUMMY__";

export const Test = () => {
  const answeredKeys = useRef<string[]>([]);
  const setSection = useSetRecoilState(sectionState);
  const setTestResult = useSetRecoilState<TypeTestResult>(testResult);
  const toListValue = useRecoilValue<TypeToList>(toList);
  const { data, title } = toListValue;

  if (!data) {
    setSection("list");
    return null;
  }

  const keys = useMemo(() => shuffle(Object.keys(data)), [data]);
  const totalQuestions = keys.length;
  const [current, setCurrent] = useState(0);
  const [showChoices, setShowChoices] = useState(false);

  const pickRandomN = (array: string[], n: number, correctKey: string) => {
    const r = [correctKey];
    const s = new Set<number>();

    while (r.length < Math.min(n, array.length)) {
      const i = (Math.random() * array.length) | 0;
      if (!s.has(i) && array[i] !== correctKey) {
        s.add(i);
        r.push(array[i]);
      }
    }

    while (r.length < n) r.push(DUMMY_KEY);
    return shuffle(r);
  };

  const correctKey = keys[current];
  const questionKeys = pickRandomN(keys, 4, correctKey);

  const handleAnswer = (key: string) => {
    answeredKeys.current.push(key);
    setShowChoices(false);

    if (current + 1 >= totalQuestions) {
      setTestResult({
        data,
        answerdKeys: answeredKeys.current,
        presentedKeys: keys,
      });
      const totalCorrect = answeredKeys.current.reduce((count, val, i) => (val === keys[i] ? count + 1 : count),0);
      sendTestResult(title, `${totalCorrect}/${totalQuestions}`)
      setSection("testResult");
    } else {
      setCurrent((p) => p + 1);
    }
  };

  return (
    <div className="test-body">
      <header id="test-header">
        <h4 id="test-header_title">{title}</h4>
        <h4 id="test-header_numbers">
          {current + 1}/{totalQuestions}
        </h4>
        <button id="test-header_button" onClick={() => setSection("list")}>
          終
        </button>
      </header>

      <main>
        <h1 className="test-question">{data[correctKey][0]}</h1>

        <div className="test-choices-wrapper">
          {/* 選択肢＋overlay 専用コンテナ */}
          <div className="test-choices-container">
            {!showChoices && (
              <div
                className="test-choices-overlay"
                onClick={() => setShowChoices(true)}
              >
                問題がわかったらタップして
                <br />
                選択肢を表示
              </div>
            )}

            <div className={`test-choices ${showChoices ? "active" : ""}`}>
              {questionKeys.map((key) => (
                <button
                  key={key}
                  className="test-choice_btn"
                  onClick={() => handleAnswer(key)}
                  disabled={!showChoices}
                >
                  {key === DUMMY_KEY ? "―" : data[key]?.[1] ?? "―"}
                </button>
              ))}
            </div>
          </div>

          {/* わからない（常に表示・overlay非対象） */}
          <button
            className="test-choice_btn unknown"
            onClick={() => handleAnswer(UNKNOWN_KEY)}
          >
            わからない
          </button>
        </div>
      </main>
    </div>
  );
};
