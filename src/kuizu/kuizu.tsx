import "./kuizu.scss";
import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { sectionState } from "../states/section";
import { QuizResultState } from "../states/QuizResult";
import { QuizInfo } from "../states/kuizu";
import { pre_Stage_percentageArray } from "../states/pre-Stage-percentagesArray";
import { useCorrectJudge } from "../Hooks/correctJudge";
import { useQuizGenerator } from "../Hooks/QuizGenerator";
import { useSavePercentage } from "../Hooks/Save-Percentage";
import { useEnglish_read } from "../Hooks/English-read";
import type { TypeQuizInfo, TypeQuizState } from "../types/Quiz";
import type { TypeResult } from "../types/Quiz_Result";
import { useQuizResultSend } from "../Hooks/QuizResultSend";
import { userData_recoil } from "../states/userData";
import { settings_recoil } from "../states/settings";
import { useSetOccurrencerate } from "../Hooks/generateOccurrenceRate";

type GenerateDataType = {
  activeQuestion: string[];
  inactiveQuestion: string[];
  select: string[];
};

export const Kuizu = () => {
  // Recoil値・状態
  const settingData = useRecoilValue(settings_recoil);
  const { noneInSelect_Active: unKnow_Buttn, selectSum: numOfNormalChoices } = settingData;
  const [UserData, setUserData] = useRecoilState<Record<string, any>>(userData_recoil);
  const setSection = useSetRecoilState(sectionState);
  const setQuizResult = useSetRecoilState(QuizResultState);
  const fieldData = useRecoilValue(pre_Stage_percentageArray);
  const { data, title, perItem, storeId, idx, dataName } = useRecoilValue<TypeQuizInfo>(QuizInfo);

  // 初期チェック
  if (!data) return <div>データを読み込めませんでした</div>;

  // 問題数など定数
  const SumOfQuestion = 20;
  const numOfChoice = unKnow_Buttn ? numOfNormalChoices + 1 : numOfNormalChoices;

  // RefやState
  const generateData = useRef<GenerateDataType>({
    activeQuestion: [],
    inactiveQuestion: [],
    select: [],
  });
  const Quiz_log = useRef<TypeResult[]>([]);
  const sumOfCorrect = useRef<number>(0);
  const [screenState, setScreenState] = useState<string>("solved");
  const [quizState, setQuizState] = useState<TypeQuizState>({
    filtered_Keys: [],
    correctKey: "",
    numOfQuestion: 0,
  });

  // Keysの作成
  const Keys = Object.keys(data);
  console.log("data",data)
  const filtered: Record<string, { occurrenceRate: number; corrected: number }> = {}
  for(const key of Keys){
    filtered[key] = UserData[dataName]?.[key]
  }

  const result_log = useRef<Record<string, { occurrenceRate: number; corrected: number }>>(filtered);


  // 初回のみ実行：クイズの準備
  useEffect(() => {
    useSetOccurrencerate(Keys, result_log.current)
    console.log("occurrence",result_log.current)
    generateData.current = {
      activeQuestion: [...Keys],
      inactiveQuestion: [],
      select: [...Keys],
    };
    if (Keys.length) {
      useQuizGenerator(data, generateData, numOfChoice, setQuizState, result_log.current);
    }
  }, []);

  // ローディング中
  if (!quizState.filtered_Keys.length) return <div>読み込み中...</div>;

  const { filtered_Keys, correctKey, numOfQuestion } = quizState;

  // 背景色・ボタンスタイル計算
  const getBackgroundColor = () => {
    if (screenState === "ConfirmedTrue") return "rgba(0, 153, 248, 0.403)";
    if (screenState === "ConfirmedFalse") return "rgba(255, 115, 103, 0.885)";
    return "transparent";
  };

  const backgroundColor = getBackgroundColor();

  const buttonStyle = (key: string) => {
    if (screenState === "ConfirmedTrue" && key === correctKey)
      return { backgroundColor: "rgba(0, 153, 248, 0.403)" };
    if (screenState === "ConfirmedFalse" && key === correctKey)
      return { backgroundColor: "rgba(255, 115, 103, 0.885)" };
    return {};
  };

  // 回答ボタンクリック時処理
  const handleButtonClick = (inputKey: string) => {
    if (screenState !== "solved") return;

    useCorrectJudge(correctKey, inputKey, setScreenState, sumOfCorrect, result_log.current);

    Quiz_log.current.push({ choices: filtered_Keys, correctKey, inputKey });
  };

  // 次の問題へ or 結果画面へ移行
  const handleBodyClick = () => {
    if (screenState !== "ConfirmedTrue" && screenState !== "ConfirmedFalse") return;

    if (numOfQuestion >= SumOfQuestion) {
      const CorrectPercentage = Math.floor((sumOfCorrect.current * 100) / numOfQuestion);

      useSavePercentage(
        perItem,
        storeId,
        idx,
        CorrectPercentage,
        fieldData,
        setUserData,
        dataName,
        result_log.current,
      );

      useQuizResultSend(title, CorrectPercentage);

      setQuizResult({
        data,
        result: Quiz_log.current,
        CorrectPercentage,
      });

      setSection("result");
    } else {
      useQuizGenerator(data, generateData, numOfChoice, setQuizState, result_log.current);
      setScreenState("solved");
    }
  };

  // 読み上げ処理
  if (screenState === "solved") useEnglish_read(data[correctKey][0]);

  return (
    <div id="kuizu">
      <header id="header">
        <h4 id="header_title">{title}</h4>
        <h4 id="header_numbers">{`${numOfQuestion}/${SumOfQuestion}`}</h4>
        <button id="header_button" onClick={() => setSection("home")}>
          終
        </button>
      </header>

      <div id="QuizBody" onClick={handleBodyClick}>
        <div id="questions_div" style={{ backgroundColor }}>
          <h4 id="question">{data[correctKey][0]}</h4>
        </div>

        <div id="buttons_div">
          {filtered_Keys.slice(0, numOfChoice - (unKnow_Buttn ? 1 : 0)).map((key, i) => (
            <button
              key={`idx${i}`}
              className="button"
              onClick={() => handleButtonClick(key)}
              style={buttonStyle(key)}
            >
              {data[key][1]}
            </button>
          ))}
          {unKnow_Buttn && (
            <button
              className="button"
              onClick={() => handleButtonClick(filtered_Keys[numOfChoice - 1])}
              style={buttonStyle(filtered_Keys[numOfChoice - 1])}
            >
              この中にはない
            </button>
          )}
        </div>

        {(screenState === "ConfirmedTrue" || screenState === "ConfirmedFalse") && (
          <div id="answer_display">
            <p>{data[correctKey][1]}</p>
          </div>
        )}
      </div>
    </div>
  );
};
