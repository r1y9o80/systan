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

const imgNames: Record<string, string> = {"kobun-tango-Img": kobun_tangoImg, "systan-Img": systanImg}
 
export const Body: React.FC<{selectedKey: string}> = memo(({ selectedKey }) => {

    const setKuizu = useSetRecoilState(QuizInfo);
    const setSection = useSetRecoilState(sectionState)

    const transKuizu = (dataName:string, startItem: number, perItem: number, NumOfChoice: number)=>{
        setSection("kuizu");
        setKuizu({dataName, startItem, perItem, NumOfChoice})
    }

    const stageData: Data = init[selectedKey]
    return (
        <div className="body">
            {Array.from({ length: stageData.total }).map((_, i) => {
                const { data, img, title, subtitle, startItem, perItem, NumOfChoice} = stageData
                const start = startItem + perItem * i;
                const end = startItem + perItem * (i + 1) - 1;
                return (
                    <div className="block" key={i}>
                        <div className="img_div"><img className="img" src={imgNames[img]} alt="" /></div>
                        <div className="title_div"><h4 className="title">{`${title} ${start}～${end}`}</h4></div>
                        <div className="meter_div"><h4 className="meter_h4"><meter className="meter" value="100" min="0" max="100"></meter>　100%</h4></div>
                        <div className="subtitle_div"><h5 className="subtitle">{subtitle}<span className="label_span"></span></h5></div>
                        <button className="button1" onClick = {() => transKuizu(data, start, perItem, NumOfChoice)}>学習</button>
                        <button className="button2" onClick={() => setSection("null")}>一覧</button>
                    </div>
                )
            })}
        </div>
    )
})

