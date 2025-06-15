import "./kuizu.scss";
import { useState, useEffect, useRef} from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { sectionState } from "../states/section";
import { QuizResultState } from "../states/QuizResult";
import { QuizInfo } from "../states/kuizu";
import { pre_Stage_percentageArray } from "../states/pre-Stage-percentagesArray";
import { useCorrectJudge } from "../Hooks/correctJudge";
import { useQuizGenerator } from "../Hooks/QuizGenerator";
import { useSavePercentage } from "../Hooks/Save-Percentage";
import { useEnglish_read } from "../Hooks/English-read";
import type { TypeQuizInfo, TypeQuizState } from "../types/Quiz"
import type { TypeResult, TypeResultData } from "../types/Quiz_Result";
import { useQuizResultSend } from "../Hooks/QuizResultSend";
import { userData_recoil } from "../states/userData";
import { settings_recoil } from "../states/settings";

type GenerateDataType = {
  activeQuestion: string[];
  inactiveQuestion: string[];
  select: string[];
};


export const Kuizu = () => {
  const settingData = useRecoilValue(settings_recoil)
  const unKnow_Buttn = settingData["noneInSelect_Active"];
  const numOfNormalChoices = settingData["selectSum"]
  const generateData = useRef<GenerateDataType>({
  activeQuestion: [],
  inactiveQuestion: [],
  select: []
});
  const setSection = useSetRecoilState(sectionState)
  const setUserData = useSetRecoilState<Record<string,any>>(userData_recoil)
  const setQuizResult = useSetRecoilState(QuizResultState)
  const fieldData: number[] = useRecoilValue(pre_Stage_percentageArray)
  const { data, title, perItem, storeId, idx } = useRecoilValue<TypeQuizInfo>(QuizInfo);
  if(!data) return <div>データを読み込めませんでした</div>;
  const SumOfQuestion = 20;
  const numOfChoice = unKnow_Buttn? numOfNormalChoices + 1: numOfNormalChoices
  const [screenState, setScreenState] = useState<string>("solved");
  const [quizState, setQuizState] = useState<TypeQuizState> ({filtered_Keys: [], correctKey:"", numOfQuestion: 0});
  const Quiz_log = useRef<TypeResult[]>([]);
  const sumOfCorrect = useRef<number>(0)
  const Keys: string[] | undefined = Object.entries(data).map((ele) => ele[0])
  
  // クイズデータの生成(quizState(State)の変更)
  useEffect(() => {
    generateData.current = {
      activeQuestion: [...Keys],
      inactiveQuestion: [],
      select: [...Keys]
    }
    Keys && useQuizGenerator(data, generateData, numOfChoice, setQuizState)
  }, []);
  if (!quizState.filtered_Keys.length) return <div>読み込み中...</div>;
  
  const { filtered_Keys,correctKey, numOfQuestion } = quizState;

  
  const backgroundColor = screenState === "ConfirmedTrue" ? "rgba(0, 153, 248, 0.403)" : 
  screenState === "ConfirmedFalse" ? "rgba(255, 115, 103, 0.885)" : "transparent";
  
  const buttonStyle = (key:string) => {
    if(screenState === "ConfirmedTrue" && key === correctKey) return {backgroundColor: "rgba(0, 153, 248, 0.403)"}
    if(screenState === "ConfirmedFalse" && key === correctKey) return {backgroundColor: "rgba(255, 115, 103, 0.885)"}
  }
  
  // ボタンクリック時に正誤を判断し、それに応じてscreen状態を変更
  const handleButtonClick = (inputKey: string) => {
    if (screenState === "solved") {
      useCorrectJudge(correctKey, inputKey, setScreenState, sumOfCorrect);
      const result: TypeResult = { choices: filtered_Keys, correctKey: correctKey, inputKey: inputKey }
      Quiz_log.current.push(result)
      console.log(result)
    }
  };
  
  // ボタン後の確認画面時に、次の問題へ進む+screen状態を変更
  const handleBodyClick = () => {
    if (screenState !== "ConfirmedTrue" && screenState !== "ConfirmedFalse") return;
    if (quizState.numOfQuestion >= SumOfQuestion) {
      const CorrectPercentage = Math.floor(sumOfCorrect.current * 100 / numOfQuestion)
      useSavePercentage(perItem, storeId, idx, CorrectPercentage,fieldData,setUserData)
      useQuizResultSend(title, CorrectPercentage)
      console.log(CorrectPercentage)
      const resultData: TypeResultData = { data, result: Quiz_log.current, CorrectPercentage}; // .currentを使用
      console.log(resultData)
      setQuizResult(resultData);
      setSection("result");
    } else {
      useQuizGenerator(data, generateData, numOfChoice, setQuizState);
      setScreenState("solved");
    }
  };

  if(screenState==="solved") useEnglish_read(data[correctKey][0])

  return (
    <div id="kuizu">
      
      <header id="header">
        <h4 id="header_title">{title}</h4>
        <h4 id="header_numbers">{`${numOfQuestion}`}/{SumOfQuestion}</h4>
        <button id="header_button" onClick={() => setSection("home")}>終</button>
      </header>

      <div id = "QuizBody" onClick={handleBodyClick}>
        <div id="questions_div" style={{ backgroundColor }}>
          <h4 id="question">{data[correctKey][0]}</h4>
        </div>
        <div id="buttons_div">
          {Array.from({ length: unKnow_Buttn? numOfChoice-1 : numOfChoice }).map((_, i) => (<button type="button" className="button" key={`idx${i}`} onClick={() => handleButtonClick(filtered_Keys[i])} style={buttonStyle(filtered_Keys[i])}>{data[filtered_Keys[i]][1]}</button>))}
          {unKnow_Buttn && <button type="button" className="button" onClick={() => handleButtonClick(filtered_Keys[numOfChoice-1])} style={buttonStyle(filtered_Keys[numOfChoice-1])}>この中にはない</button>}
        </div>

        <div id="answer_display" style={{ display: screenState === "ConfirmedTrue" || screenState === "ConfirmedFalse" ? "flex" : "none" }}>
          <p>{screenState === "ConfirmedTrue" || screenState === "ConfirmedFalse" ? `${data[correctKey][1]}` : ""}</p>
        </div>
        
      </div>
    </div>
  );
};
