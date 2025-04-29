import './result.scss';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { QuizResultState } from '../states/QuizResult';
import { sectionState } from '../states/section';
import type { TypeResultData, TypeResult } from '../types/Quiz_Result';

export const Result = () => {
    const [showOnlyWrong, setShowOnlyWrong] = useState(false)
    const QuizResult = useRecoilValue<TypeResultData>(QuizResultState)
    const setSection = useSetRecoilState(sectionState)
    const {data, result, CorrectPercentage} = QuizResult
    if (!data) return <div>データが見つかりません</div>

    const list_retrun = (QuestionNumber: number,inputKey:string, correctKey: string) =>{
        if(inputKey == correctKey){
            if(showOnlyWrong) return
            return(
                <>
                  <li className='resultLi'><h2 className='QuestionNumber' >{QuestionNumber}　</h2><p className='resultP'>　{data[correctKey][0]}</p></li>
                  <li className='resultLi'><h2 className='QuestionNumber' style={{color: "blue"}}>✓　</h2><p className='resultP'>　{data[inputKey][1]}</p></li>
                </>
            )
        }else{
            return(
                <>
                  <li className='resultLi'><h2 className='QuestionNumber'>{QuestionNumber}　</h2><p className='resultP'>　{data[correctKey][0]}</p></li>
                  <li className='resultLi'><h2 className='QuestionNumber' style={{color: "red"}}>✕　</h2><p className='resultP'>　{data[inputKey][1]}</p></li>
                  <li className='resultLi'><h2 className='QuestionNumber' style={{color: "blue"}}>✓　</h2><p className='resultP'>　{data[correctKey][1]}</p></li>
                </>
            )
        }
    }

    return(
        <div id="result">
            <div id="ResultBody">
                <div key={"resultgraf"} className="pie-chart-1" style={{backgroundImage: `conic-gradient(#2589d0 ${CorrectPercentage}%,rgb(245, 100, 100) ${CorrectPercentage}% 100%)`}}>
                    <span>{`${CorrectPercentage}%`}</span>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label className="toggle-button-1">
                        <input type="checkbox" checked={showOnlyWrong} onChange={() => setShowOnlyWrong(prev => !prev)}/>
                    </label>
                </div>
                {result.map((ele: TypeResult,i) => {
                    return(
                        <ul key={i} className='resultUl'>
                            {list_retrun(i+1, ele.inputKey, ele.correctKey)}
                        </ul>
                    )
                })}
            </div>
            <div className="footer">
                <div className='result-buttondiv'><button type="button" className="result-button" onClick={() => setSection("kuizu")}>続ける</button></div>
                <div className='result-buttondiv'><button type="button" className="result-button" onClick={() => setSection("setting")}>終了</button></div>
            </div>
        </div>
    );
}
