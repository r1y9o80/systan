import "./kuizu.css";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { sectionState } from "../states/section";
import { QuizInfo } from "../states/kuizu";
import { useGetJsonData } from "../Hooks/useGetJsonData";
import { useCorrectJudge } from "../Hooks/correctJudge";
import { useQuizGenerator } from "../Hooks/QuizGenerator";
import type { TypeQuizInfo, TypeMixData, TypeQuizState } from "../types/Quiz"

export const Kuizu = () => {
  const setSection = useSetRecoilState(sectionState)
  const { dataName, startItem, perItem, NumOfChoice } = useRecoilValue<TypeQuizInfo>(QuizInfo);
  const [mixData, setmixData] = useState<TypeMixData>(undefined);
  const [screenState, setScreenState] = useState<string>("solved");
  const [quizState, setQuizState] = useState<TypeQuizState> ({questionData: [{Key: "", Value: ["",""]}], correctIdx: 0, numOfQuestion: 0});

  // 非同期データの取得(MixData(State)の変更)
  useEffect(() => {useGetJsonData(dataName, startItem, perItem, setmixData)}, []);
  
  // クイズデータの生成(quizState(State)の変更)
  useEffect(() => {useQuizGenerator(mixData, startItem, perItem, NumOfChoice, setQuizState)}, [mixData]);
  if (!mixData) return <div>データが読み込めませんでした。</div>;
  if (!quizState) return <div>読み込み中...</div>;
  
  const { questionData, correctIdx, numOfQuestion } = quizState;

  const backgroundColor = screenState === "ConfirmedTrue" ? "rgba(0, 153, 248, 0.403)" : 
                        screenState === "ConfirmedFalse" ? "rgba(255, 115, 103, 0.885)" : "transparent";

  const buttonStyle = (index:number) => {
    if(screenState === "ConfirmedTrue" && index === correctIdx) return {backgroundColor: "rgba(0, 153, 248, 0.403)"}
    if(screenState === "ConfirmedFalse" && index === correctIdx) return {backgroundColor: "rgba(255, 115, 103, 0.885)"}
  }
  // ボタンクリック時に正誤を判断し、それに応じてscreen状態を変更
  const handleButtonClick = (inputIdx: number) => {
    if (screenState === "solved") {
      useCorrectJudge(correctIdx, inputIdx, setScreenState);
    }
  };

  // ボタン後の確認画面時に、次の問題へ進む+screen状態を変更
  const handleBodyClick = () => {
    if (screenState !== "ConfirmedTrue" && screenState !== "ConfirmedFalse") return;
    if (quizState.numOfQuestion >= 20) {
      setSection("setting");
    } else {
      useQuizGenerator(mixData, startItem, perItem, NumOfChoice, setQuizState);
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
          <h4 id="question">{questionData[correctIdx]?.Value[0]}</h4>
        </div>

        <div id="buttons_div">
          {Array.from({ length: NumOfChoice }).map((_, i) => (<button type="button" className="button" key={`idx${i}`} onClick={() => handleButtonClick(i)} style={buttonStyle(i)}>{questionData[i]?.Value[1]}</button>))}
          <button type="button" className="button" onClick={() => handleButtonClick(NumOfChoice)} style={buttonStyle(NumOfChoice)}>この中にはない</button>
        </div>

        <div id="answer_display" style={{ display: screenState === "ConfirmedTrue" || screenState === "ConfirmedFalse" ? "flex" : "none" }}>
          <p>{screenState === "ConfirmedTrue" || screenState === "ConfirmedFalse" ? `${questionData[correctIdx]?.Value[1]}` : ""}</p>
        </div>
        
      </div>
    </div>
  );
};
