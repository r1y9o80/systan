import React, { memo, useEffect, useRef } from "react";

// 状態管理(Recoil関連)
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { QuizInfo } from "../../states/kuizu.ts";
import { sectionState } from "../../states/section.ts";
import { pre_Stage_percentageArray } from "../../states/pre-Stage-percentagesArray.ts";
import { y_position } from "../../states/y-position.ts";
import { userData_recoil } from "../../states/userData.ts";

//データ()
import { init } from "../Home-data/data.tsx";

// スタイル
import "./body.scss";

// 画像
import kobun_tangoImg from "./imgs/kobun-tango.png";
import systanImg from "./imgs/systan.png";

// タイプ
import type { TypeQuizInfo } from "../../types/Quiz.ts";
import type { DataType  } from "../../types/data.ts";

// カスタムフック
import { useGetJsonData } from "../../Hooks/GetJsonData.ts";

const imgNames: Record<string, string> = { "kobun-tango-Img": kobun_tangoImg, "systan-Img": systanImg }

export const Body: React.FC<{ selectedKey: string }> = memo(({ selectedKey }) => {
    const setKuizu = useSetRecoilState<TypeQuizInfo>(QuizInfo);
    const setSection = useSetRecoilState(sectionState);
    const setPre_Stage_percentageArray = useSetRecoilState(pre_Stage_percentageArray)
    const stageData: DataType = init[selectedKey];
    const scrollRef = useRef<HTMLDivElement>(null);
    const [y_pos, setY_pos] = useRecoilState(y_position)
    useEffect(() => {
        scrollRef.current?.scrollTo({ top: y_pos, behavior: 'auto' });
        console.log(y_pos)
    }, [y_pos]);
    const { storeId, body } = stageData;
    const userData = useRecoilValue<Record<string,any>>(userData_recoil)
    const CorrectPercentages_onThisStage: number[] = userData[storeId] || []; // データがない場合は空配列を返す
    console.log(CorrectPercentages_onThisStage)

    const transKuizu = async (dataName: string, startItem: number, perItem: number, title: string,idx:number) => {
        console.log("dataName",dataName)
        scrollRef.current?.scrollTop && setY_pos(scrollRef.current?.scrollTop)
        const data = await useGetJsonData(dataName, startItem, perItem);
        setSection("kuizu");
        setKuizu({ data, title, perItem, storeId, idx, dataName});
        setPre_Stage_percentageArray(CorrectPercentages_onThisStage)

    };

    return (
        //常にスクロール追うから重いかも
        <div id="SettingBody" ref={scrollRef} onScroll={() => scrollRef.current?.scrollTop && setY_pos(scrollRef.current?.scrollTop)}>
            {body.map((objectElement, i) => {
                const { dataName, title, subtitle, img, start, totalNum} = objectElement
                const percents = {correctKeys: 0, inCorrectKeys:0, not_appearedKeys:0}
                for(let idx = start; idx < start + totalNum; idx++){
                    if(userData[dataName]?.[idx]?.corrected === 1) percents["correctKeys"] += 1
                    if(userData[dataName]?.[idx]?.corrected === 0 || userData[dataName]?.[idx]?.corrected === undefined) percents["not_appearedKeys"] += 1
                }
                console.log("Deback",percents.not_appearedKeys,totalNum)
                //以下は以前の進捗が消えないように、最新パーセント記録法が実行されていない場合以前のものを適応。
                const correctPercentage = percents.not_appearedKeys !== totalNum? (Math.floor(percents.correctKeys * 100 / totalNum)): (CorrectPercentages_onThisStage[i]? CorrectPercentages_onThisStage[i]: 0);

                return (
                    <div className="block" key={i}>
                        <div className="img_div"><img className="img" src={imgNames[img]} alt="" /></div>
                        <div className="title_div"><h4 className="title">{title}</h4></div>
                        <div className="meter_div">
                            <h4 className="meter_h4">
                                <meter className="meter" value={correctPercentage} min="0" max="100"></meter><span style={{marginLeft: "15px"}}>{correctPercentage}%</span>
                            </h4>
                        </div>
                        <div className="subtitle_div"><h5 className="subtitle">{subtitle}<span className="label_span"></span></h5></div>
                        <button className="button1" onClick={() => transKuizu(dataName, start, totalNum, title,i)}>学習</button>
                        <button className="button2" onClick={() => setSection("list")}>一覧</button>
                    </div>
                );
            })}
        </div>
    );
});