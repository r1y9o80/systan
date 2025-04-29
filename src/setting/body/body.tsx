import React from "react"
import { memo } from "react"
import { useSetRecoilState } from "recoil"; 
import "./body.scss"
import { init } from "../setting_data/data.tsx"
import kobun_tangoImg from "./imgs/kobun-tango.png"
import systanImg from "./imgs/systan.png"
import { Data } from "../../types/data.ts"
import { QuizInfo } from "../../states/kuizu.ts"
import { sectionState } from "../../states/section.ts"
import { useGetJsonData } from "../../Hooks/GetJsonData.ts";
import type { TypeQuizInfo } from "../../types/Quiz.ts";

const imgNames: Record<string, string> = {"kobun-tango-Img": kobun_tangoImg, "systan-Img": systanImg}
 
export const Body: React.FC<{selectedKey: string}> = memo(({ selectedKey }) => {

    const setKuizu = useSetRecoilState<TypeQuizInfo>(QuizInfo);
    const setSection = useSetRecoilState(sectionState)
    const stageData: Data = init[selectedKey]
    const { dataName, img, title, subtitle, startItem, perItem, NumOfChoice} = stageData

    const transKuizu = async (dataName:string, startItem: number, perItem: number, numOfNormalChoices: number, title:string)=>{
        const data = await useGetJsonData(dataName, startItem, perItem)
        setSection("kuizu");
        setKuizu({data, numOfNormalChoices, title})
    }

    return (
        <div id="SettingBody">
            {Array.from({ length: stageData.total }).map((_, i) => {
                const start = startItem + perItem * i;
                const end = startItem + perItem * (i + 1) - 1;
                const this_title = `${title} ${start}～${end}`
                return (
                    <div className="block" key={i}>
                        <div className="img_div"><img className="img" src={imgNames[img]} alt="" /></div>
                        <div className="title_div"><h4 className="title">{this_title}</h4></div>
                        <div className="meter_div"><h4 className="meter_h4"><meter className="meter" value="100" min="0" max="100"></meter>　100%</h4></div>
                        <div className="subtitle_div"><h5 className="subtitle">{subtitle}<span className="label_span"></span></h5></div>
                        <button className="button1" onClick = {() => transKuizu(dataName, start, perItem, NumOfChoice, this_title)}>学習</button>
                        <button className="button2" onClick={() => setSection("list")}>一覧</button>
                    </div>
                )
            })}
        </div>
    )
})

