import "./kuizu.scss";
import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { sectionState } from "../states/section";
import { QuizResultState } from "../states/QuizResult";
import { dataForQuiz_recoil } from "../states/kuizu";
import { useCorrectJudge } from "../Hooks/correctJudge";
import { useQuizGenerator } from "../Hooks/QuizGenerator";
import { useSaveQuestionsData } from "../Hooks/Save-questionsData";
import { useEnglish_read } from "../Hooks/English-read";
import type { dataForQuiz_type, TypeQuizState } from "../types/Quiz";
import type { TypeResult } from "../types/Quiz_Result";
import { useQuizResultSend } from "../Hooks/QuizResultSend";
import { userData_recoil } from "../states/userData";
import { settings_recoil } from "../states/settings";
import { useGenerateQuestionsData } from "../Hooks/generateQuestionsData";

type dataForQuestionGenerateType = {
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
  const { data, title, dataName } = useRecoilValue<dataForQuiz_type>(dataForQuiz_recoil);

  // 初期チェック
  if (!data) return <div>データを読み込めませんでした</div>;

  // 問題数など定数
  const SumOfQuestion = 5;
  const numOfChoice = unKnow_Buttn ? numOfNormalChoices + 1 : numOfNormalChoices;

  // RefやState
  const dataForQuestionGenerate = useRef<dataForQuestionGenerateType>({ //n問以内での重複を許さないため
    activeQuestion: [],
    inactiveQuestion: [],
    select: [],
  });
  const Quiz_log = useRef<TypeResult[]>([]);
  const sumOfCorrect = useRef<number>(0);
  const [screenState, setScreenState] = useState<string>("solved"); //クイズセクション内での画面状態を管理。
  const [quizState, setQuizState] = useState<TypeQuizState>({
    choices: [], //選択肢
    correctKey: "", //正解番号
    numOfQuestion: 0, //問題番号
  });
  const result_log = useRef<Record<string, { occurrenceRate: number; corrected: number }>>({});
  const Keys = Object.keys(data);
  
  // 初回のみ実行：クイズの準備（初期設定、初期デバッグ）
  useEffect(() => {
    console.log("data",data)
    console.log("useData",UserData)
    for(const key of Keys){
      result_log.current[key] = {...UserData[dataName]?.[key]}
    }
    useGenerateQuestionsData(Keys, result_log.current) //データベースに保存されていなくても、問題すべてに対して設定(出現率、正誤未）定義➡後でundefined判定いらない
    console.log("occurrence",result_log.current) //上関数のデバッグ
    dataForQuestionGenerate.current = {
      activeQuestion: [...Keys],
      inactiveQuestion: [],
      select: [...Keys],
    };
    if (Keys.length) {
      useQuizGenerator(data, dataForQuestionGenerate, numOfChoice, setQuizState, result_log.current);
    }
  }, []);
  
  // ローディング中
  if (!quizState.choices.length) return <div>読み込み中...</div>;
  
  const { choices, correctKey, numOfQuestion } = quizState;
  console.log("choices", choices)

  //正誤時の背景色を設定
  const backgroundColor = ((screenState === "ConfirmedTrue") && "rgba(0, 153, 248, 0.403)") || ((screenState === "ConfirmedFalse") && "rgba(255, 115, 103, 0.885)") || "transparent"
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
    Quiz_log.current.push({ choices: choices, correctKey, inputKey });
  };

  // 次の問題へ or 結果画面へ移行
  const handleBodyClick = () => {
    if (screenState !== "ConfirmedTrue" && screenState !== "ConfirmedFalse") return;

    if (numOfQuestion >= SumOfQuestion) { //問題終了の処理
      const CorrectPercentage = Math.floor((sumOfCorrect.current * 100) / numOfQuestion);
      useSaveQuestionsData(setUserData, dataName, result_log.current,);
      useQuizResultSend(title, CorrectPercentage);
      setQuizResult({data, result: Quiz_log.current, CorrectPercentage,});
      setSection("result");

    } else {
      useQuizGenerator(data, dataForQuestionGenerate, numOfChoice, setQuizState, result_log.current);
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
          {choices.slice(0, numOfChoice - (unKnow_Buttn ? 1 : 0)).map((key, i) => (
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
              onClick={() => handleButtonClick(choices[numOfChoice - 1])}
              style={buttonStyle(choices[numOfChoice - 1])}
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
