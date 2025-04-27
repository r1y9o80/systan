import "./kuizu.scss";
import { useState, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { sectionState } from "../states/section";
import { QuizResult } from "../states/QuizResult";
import { QuizInfo } from "../states/kuizu";
import { useCorrectJudge } from "../Hooks/correctJudge";
import { useQuizGenerator } from "../Hooks/QuizGenerator";
import type { TypeQuizInfo, TypeQuizState } from "../types/Quiz"
import type { TypeResult, TypeResultData } from "../types/Quiz_Result";


export const Kuizu = () => {
  const unKnow_Buttn = true;
  const setSection = useSetRecoilState(sectionState)
  const setQuizResult = useSetRecoilState(QuizResult)
  const { data, numOfNormalChoices } = useRecoilValue<TypeQuizInfo>(QuizInfo);
  if(!data) return <div>データを読み込めませんでした</div>;
  const numOfChoice = unKnow_Buttn? numOfNormalChoices + 1: numOfNormalChoices
  const [screenState, setScreenState] = useState<string>("solved");
  const [quizState, setQuizState] = useState<TypeQuizState> ({filtered_Keys: [], correctKey:"", numOfQuestion: 0});
  const Quiz_log = useRef<TypeResult[]>([]);
  const Keys: string[] | undefined = Object.entries(data).map((ele) => ele[0])
  
  // クイズデータの生成(quizState(State)の変更)
  useEffect(() => {Keys && useQuizGenerator(Keys, numOfChoice, setQuizState)}, []);
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
      useCorrectJudge(correctKey, inputKey, setScreenState);
      const result: TypeResult = { choices: filtered_Keys, correctKey: correctKey, inputKey: inputKey }
      Quiz_log.current.push(result)
    }
  };

  // ボタン後の確認画面時に、次の問題へ進む+screen状態を変更
  const handleBodyClick = () => {
    if (screenState !== "ConfirmedTrue" && screenState !== "ConfirmedFalse") return;
    if (quizState.numOfQuestion >= 20) {
      setSection("setting");
      const resultData: TypeResultData = { data, result: Quiz_log.current }; // .currentを使用
      console.log(resultData)
      setQuizResult(resultData);
    } else {
      useQuizGenerator(Keys, numOfChoice, setQuizState);
      setScreenState("solved");
    }
  };
  

  return (
    <div id="kuizu">
      
      <header id="header">
        <h4 id="header_title">[英単語]ステージ1_1</h4>
        <h4 id="header_numbers">{`${numOfQuestion}`}/20</h4>
        <button id="header_button" onClick={() => setSection("setting")}>終</button>
      </header>

      <div id = "body" onClick={handleBodyClick}>
        <div id="questions_div" style={{ backgroundColor }}>
          <h4 id="question">{data[correctKey][0]}</h4>
        </div>

        <div id="buttons_div">
          {Array.from({ length: unKnow_Buttn? numOfChoice-1 : numOfChoice }).map((_, i) => (<button type="button" className="button" key={`idx${i}`} onClick={() => handleButtonClick(filtered_Keys[i])} style={buttonStyle(filtered_Keys[i])}>{data[filtered_Keys[i]][1]}</button>))}
          {unKnow_Buttn && <button type="button" className="button" onClick={() => handleButtonClick(filtered_Keys[numOfChoice])} style={buttonStyle(filtered_Keys[numOfChoice])}>この中にはない</button>}
        </div>

        <div id="answer_display" style={{ display: screenState === "ConfirmedTrue" || screenState === "ConfirmedFalse" ? "flex" : "none" }}>
          <p>{screenState === "ConfirmedTrue" || screenState === "ConfirmedFalse" ? `${data[correctKey][1]}` : ""}</p>
        </div>
        
      </div>
    </div>
  );
};
