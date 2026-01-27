import "./test.scss"
import { useState, useRef, useMemo } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { sectionState } from "../states/section";
import { toList } from "../states/list";
import { TypeToList } from "../types/toList";
import { shuffle } from "../Hooks/shuffle";
import { testResult } from "../states/testResult";
import { TypeTestResult } from "../types/testResult";

const UNKNOWN_KEY = "__UNKNOWN__"; // わからない用
const DUMMY_KEY = "__DUMMY__";     // ダミー選択肢用

export const Test = () => {
  const answeredKeys = useRef<string[]>([])
  const setSection = useSetRecoilState(sectionState);
  const setTestResult = useSetRecoilState<TypeTestResult>(testResult)
  const toListValue = useRecoilValue<TypeToList>(toList);
  const { data, title } = toListValue;

  if (!data) {
    setSection("list");
    return null;
  }

  const keys = useMemo(() => shuffle(Object.keys(data)), [data]);
  const totalQuestions = keys.length;
  const [current, setCurrent] = useState(0);

  const pickRandomN = (
    array: string[],
    n: number,
    correctKey: string
  ): string[] => {
    const r = [correctKey];
    const s = new Set<number>();

    while (r.length < Math.min(n, array.length)) {
      const i = (Math.random() * array.length) | 0;
      if (!s.has(i) && array[i] !== correctKey) {
        s.add(i);
        r.push(array[i]);
      }
    }

    // 足りない場合はダミー選択肢を埋める
    while (r.length < n) r.push(DUMMY_KEY);
    return shuffle(r);
  };

  const correctKey = keys[current];
  const questionKeys = pickRandomN(keys, 4, correctKey);

  const handleAnswer = (inputedKey: string) => {
    answeredKeys.current.push(inputedKey)
    if (current + 1 >= totalQuestions) {
      setTestResult({
        data,
        answerdKeys: answeredKeys.current,
        presentedKeys: keys
      });
      setSection("testResult"); // テスト終了
    } else {
      setCurrent(prev => prev + 1);
    }
  };

  return (
    <div className="test-body">
      <header id="header">
        <h4 id="header_title">{title}</h4>
        <h4 id="header_numbers">{current + 1}/{totalQuestions}</h4>
        <button id="header_button" onClick={() => setSection("list")}>終</button>
      </header>

      <main>
        <h1 className="question">{data[correctKey][0]}</h1>

        <div className="choices">
          {questionKeys.map((key) => (
            <button
              key={key}
              className="choice-btn"
              data-key={key}
              onClick={() => handleAnswer(key)}
            >
              {key === DUMMY_KEY ? "―" : data[key]?.[1] ?? "―"}
            </button>
          ))}
        <button
        key={UNKNOWN_KEY}
        className="choice-btn unknown"
        onClick={() => handleAnswer(UNKNOWN_KEY)}
        >
        わからない
        </button>

        </div>
      </main>
    </div>
  );
};
