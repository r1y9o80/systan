import React from "react"
import { memo } from "react"
import { useSetRecoilState } from "recoil"; 
import "./body.css"
import { init } from "../setting_data/data.tsx"
import systanImg from "./systan.png"
import { Data } from "../../types/data.ts"
import { QuizInfo } from "../../states/kuizu.ts"
import { sectionState } from "../../states/section.ts"
 
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
                const start = stageData.startItem + stageData.perItem * i;
                const end = stageData.startItem + stageData.perItem * (i + 1) - 1;
                return (
                    <div className="block" key={i}>
                        <img className="img" src={systanImg} alt="" />
                        <h4 className="title">[英単語] {`${start}～${end}`}</h4>
                        <h4 className="meter"><meter value="100" min="0" max="100" className="meter"></meter>100%</h4>
                        <h5 className="subtitle">[英単語]ステージ１<span className="label_span">　(Level-1)</span></h5>
                        <button className="button1" onClick = {() => transKuizu(stageData.data, start, stageData.perItem, stageData.NumOfChoice)}>学習</button>
                        <button className="button2" onClick={() => setSection("null")}>一覧</button>
                    </div>
                )
            })}
        </div>
    )
})

