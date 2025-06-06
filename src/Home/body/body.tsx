import React, { memo, useEffect, useState, useRef } from "react";

// 状態管理(Recoil関連)
import { useSetRecoilState, useRecoilState } from "recoil";
import { QuizInfo } from "../../states/kuizu.ts";
import { sectionState } from "../../states/section.ts";
import { pre_Stage_percentageArray } from "../../states/pre-Stage-percentagesArray.ts";
import { y_position } from "../../states/y-position.ts";

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

//firebase and firestore
import { getAuth } from "firebase/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore";

// 型定義
type CorrectPercentagesData = Record<string, number[]>;

const imgNames: Record<string, string> = { "kobun-tango-Img": kobun_tangoImg, "systan-Img": systanImg }

export const Body: React.FC<{ selectedKey: string }> = memo(({ selectedKey }) => {

    const setKuizu = useSetRecoilState<TypeQuizInfo>(QuizInfo);
    const setSection = useSetRecoilState(sectionState);
    const setPre_Stage_percentageArray = useSetRecoilState(pre_Stage_percentageArray)
    const [correctPercentagesData, setCorrectPercentagesData] = useState<CorrectPercentagesData>({});
    const stageData: DataType = init[selectedKey];
    const scrollRef = useRef<HTMLDivElement>(null);
    const [y_pos, setY_pos] = useRecoilState(y_position)

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: y_pos, behavior: 'auto' });
        console.log(y_pos)
        const fetchCorrectPercentages = async () => {
            const data = await getCorrectPercentages_Array();
            setCorrectPercentagesData(data);  // ステートにデータをセット
            console.log("データを受け取りました",data)
        };
        fetchCorrectPercentages();
    }, []);
    
    const { storeId, body } = stageData;
    const CorrectPercentages_onThisStage: number[] = correctPercentagesData[storeId] || []; // データがない場合は空配列を返す
    console.log(CorrectPercentages_onThisStage)

    const transKuizu = async (dataName: string, startItem: number, perItem: number, numOfNormalChoices: number, title: string,idx:number) => {
        scrollRef.current?.scrollTop && setY_pos(scrollRef.current?.scrollTop)
        const data = await useGetJsonData(dataName, startItem, perItem);
        setSection("kuizu");
        setKuizu({ data, numOfNormalChoices, title, perItem, storeId, idx });
        setPre_Stage_percentageArray(CorrectPercentages_onThisStage)

    };

    return (
        <div id="SettingBody" ref={scrollRef}>
            {body.map((objectElement, i) => {
                const { dataName, title, subtitle, img, start, totalNum} = objectElement
                const correctPercentage = CorrectPercentages_onThisStage[i]
                const NumOfChoice = 3;

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
                        <button className="button1" onClick={() => transKuizu(dataName, start, totalNum, NumOfChoice, title,i)}>学習</button>
                        <button className="button2" onClick={() => setSection("list")}>一覧</button>
                    </div>
                );
            })}
        </div>
    );
});

async function getCorrectPercentages_Array(): Promise<CorrectPercentagesData> {
    const db = getFirestore();
    const userId = getAuth().currentUser?.uid;
    
    if (!userId) {
        console.log("ユーザーがサインインしていません");
        return {}; // ユーザーがサインインしていない場合、空のオブジェクトを返す
    }

    const The_Doc_Poiner = doc(db, "users", userId);
    const The_Doc = await getDoc(The_Doc_Poiner);
    
    if (!The_Doc.exists()) {
        console.log("ドキュメントが存在しません");
        return {}; // ドキュメントが存在しない場合、空のオブジェクトを返す
    } else {
        console.log("ドキュメントを取得しました");
        return The_Doc.data() as CorrectPercentagesData; // データをそのまま返す
    }
}
