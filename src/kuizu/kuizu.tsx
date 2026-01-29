import "./kuizu.scss";
import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { sectionState } from "../states/section";
import { QuizResultState } from "../states/QuizResult";
import { dataForQuiz_recoil } from "../states/kuizu";
import { useCorrectJudge } from "../Hooks/correctJudge";
import { useQuestionGenerate } from "../Hooks/generateQuestion";
import { useChoicesGenerator } from "../Hooks/generateChoice";
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
  const numOfQuestion = useRef(1)
  const [UserData, setUserData] = useRecoilState<Record<string, any>>(userData_recoil);
  const settingData = UserData["setting"] || useRecoilValue(settings_recoil);
  console.log("settingData",settingData)
  const { noneInSelect_Active: unKnow_Buttn, selectSum: numOfNormalChoices, questionSum, deduplicationRange, selectWeight } = settingData;
  const setSection = useSetRecoilState(sectionState);
  const setQuizResult = useSetRecoilState(QuizResultState);
  const { data, title, dataName } = useRecoilValue<dataForQuiz_type>(dataForQuiz_recoil);

  // 初期チェック
  if (!data) return <div>データを読み込めませんでした</div>;

  const numOfChoice = unKnow_Buttn ? numOfNormalChoices + 1 : numOfNormalChoices;

  // RefやState
  const dataForQuestionGenerate = useRef<dataForQuestionGenerateType>({
    activeQuestion: [],
    inactiveQuestion: [],
    select: [],
  });
  const Quiz_log = useRef<TypeResult[]>([]);
  const sumOfCorrect = useRef<number>(0);
  const [screenState, setScreenState] = useState<string>("solved");
  const [quizState, setQuizState] = useState<TypeQuizState>({
    choices: [],
    correctKey: [],
  });
  const questionsData = useRef<Record<string, { occurrenceRate: number; corrected: number }>>({});
  const Keys = Object.keys(data);

  // クイズ生成関数をまとめる
  const generateNextQuiz = () => {
    const correctKey = useQuestionGenerate(dataForQuestionGenerate, questionsData.current, deduplicationRange, selectWeight);
    const choices = useChoicesGenerator(data, Keys, correctKey, numOfChoice);
    console.log("correctKey", correctKey);
    console.log("choices", choices);
    setQuizState((prev) => ({
      correctKey: [...prev.correctKey, correctKey],
      choices: [...prev.choices, choices],
    }));
  };

  // 初回のみ実行：クイズの準備
  useEffect(() => {
    console.log("data", data);
    console.log("useData", UserData);
    for (const key of Keys) {
      questionsData.current[key] = { ...UserData[dataName]?.[key] };
    }
    useGenerateQuestionsData(Keys, questionsData.current);
    console.log("occurrence", questionsData.current);

    dataForQuestionGenerate.current = {
      activeQuestion: [...Keys],
      inactiveQuestion: [],
      select: [...Keys],
    };

    for(let i = 0; i<5; i++){
      generateNextQuiz()
    }
  }, []);

  // ローディング中
  if (!quizState.choices.length) return <div>読み込み中...</div>;
  
  console.log(quizState)
  const correctKey = quizState.correctKey[numOfQuestion.current - 1];
  const choices = quizState.choices[numOfQuestion.current - 1];

  // 正誤時の背景色設定
  const backgroundColor =
    (screenState === "ConfirmedTrue" && "rgba(0, 153, 248, 0.403)") ||
    (screenState === "ConfirmedFalse" && "rgba(255, 115, 103, 0.885)") ||
    "transparent";

  const buttonStyle = (key: string) => {
    if (screenState === "ConfirmedTrue" && key === correctKey)
      return { backgroundColor: "rgba(0, 153, 248, 0.403)" };
    if (screenState === "ConfirmedFalse" && key === correctKey)
      return { backgroundColor: "rgba(255, 115, 103, 0.885)" };
    return {};
  };

  // 回答ボタンクリック時処理(選択肢クリックで)
  const handleButtonClick = (inputKey: string) => {
    if (screenState !== "solved") return;
    useCorrectJudge(correctKey, inputKey, setScreenState, sumOfCorrect, questionsData.current, selectWeight);
    Quiz_log.current.push({ choices: choices, correctKey, inputKey });
  };


  // 次の問題へ or 結果画面へ移行(答え表示画面中、画面タップで)
  const handleBodyClick = () => {
    if (screenState !== "ConfirmedTrue" && screenState !== "ConfirmedFalse") return; //答え表示画面の時以外ブロック

    if (numOfQuestion.current >= questionSum) {
      const CorrectPercentage = Math.floor((sumOfCorrect.current * 100) / questionSum);
      useSaveQuestionsData(setUserData, dataName, questionsData.current);
      useQuizResultSend(title, CorrectPercentage,`${settingData}`);
      setQuizResult({ data, result: Quiz_log.current, CorrectPercentage });
      setSection("result");
    } else {
      numOfQuestion.current += 1
      if(quizState.correctKey.length < questionSum)generateNextQuiz();
      setScreenState("solved");
    }
  };

  // 読み上げ処理
  if (screenState === "solved") useEnglish_read(data[correctKey][0]);

  return (
    <div id="kuizu">
      <header id="header">
        <h4 id="header_title">{title}</h4>
        <h4 id="header_numbers">{`${numOfQuestion.current}/${questionSum}`}</h4>
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
