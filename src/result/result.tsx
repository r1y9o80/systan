import './result.scss';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { QuizResultState } from '../states/QuizResult';
import { sectionState } from '../states/section';
import type { TypeResultData, TypeResult } from '../types/Quiz_Result';
import { userData_recoil } from '../states/userData';
import { QuizInfo } from '../states/kuizu';
import { TypeQuizInfo } from '../types/Quiz';

export const Result = () => {
    const [showOnlyWrong, setShowOnlyWrong] = useState(false);
    const userData = useRecoilValue<Record<string, any>>(userData_recoil);
    const { dataName, data } = useRecoilValue<TypeQuizInfo>(QuizInfo);
    const QuizResult = useRecoilValue<TypeResultData>(QuizResultState);
    const setSection = useSetRecoilState(sectionState);

    if (!data) return <div>データが見つかりません</div>;

    const keys = Object.keys(data);
    const result_log: Record<string, any> = {}
    for (const key of keys){
        result_log[key] = userData[dataName]?.[key] //理論上はuserData.dataNameは必ず存在
    }
    console.log(result_log)

    const not_appearedKeys = keys.filter((key) => result_log[key]?.corrected === 0 || undefined);
    const correctKeys = keys.filter((key) => result_log[key]?.corrected === 1);
    const incorrectKeys = keys.filter((key) => result_log[key]?.corrected === 2);
    const total = keys.length;

    const CorrectPercentage = Math.floor((correctKeys.length * 100) / total);
    const InCorrectPercentage = Math.floor((incorrectKeys.length * 100) / total);

    console.log(not_appearedKeys, correctKeys, incorrectKeys)

    const { result } = QuizResult;

    const list_return = (
        QuestionNumber: number,
        choices: string[],
        inputKey: string,
        correctKey: string
    )=> {
        if (inputKey === correctKey) {
            if (showOnlyWrong) return;
            return (
                <ul key={QuestionNumber} className='resultUl'>
                    <li className='resultLi'>
                        <h2 className='QuestionNumber'>{QuestionNumber}　</h2>
                        <p className='resultP'>　{data[correctKey][0]}</p>
                    </li>
                    <li className='resultLi'>
                        <h2 className='QuestionNumber' style={{ color: 'blue' }}>✓　</h2>
                        <p className='resultP'>
                            　{data[inputKey][1]}
                            {choices[3] === inputKey && '  (この中にはない)'}
                        </p>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul key={QuestionNumber} className='resultUl'>
                    <li className='resultLi'>
                        <h2 className='QuestionNumber'>{QuestionNumber}　</h2>
                        <p className='resultP'>　{data[correctKey][0]}</p>
                    </li>
                    <li className='resultLi'>
                        <h2 className='QuestionNumber' style={{ color: 'red' }}>✕　</h2>
                        <p className='resultP'>
                            　{data[inputKey][1]}
                            {choices[3] === inputKey && '  (この中にはない)'}
                        </p>
                    </li>
                    <li className='resultLi'>
                        <h2 className='QuestionNumber' style={{ color: 'blue' }}>✓　</h2>
                        <p className='resultP'>
                            　{data[correctKey][1]}
                            {choices[3] === correctKey && '  (この中にはない)'}
                        </p>
                    </li>
                </ul>
            );
        }
    };

    return (
        <div id="result">
            <div id="ResultBody">
                <div
                key="resultgraf"
                className="pie-chart-1"
                style={{
                    backgroundImage: `conic-gradient(
                    rgb(37, 137, 208) 0% ${CorrectPercentage}%,
                    rgb(245, 100, 100) ${CorrectPercentage}% ${CorrectPercentage + InCorrectPercentage}%,
                    gray ${CorrectPercentage + InCorrectPercentage}% 100%
                    )`,
                }}
                >
                <span>{`${CorrectPercentage}%`}</span>
                </div>
                <div className='result_grafExplain-container'>
                    <div className='result_grafExplain'>
                        <div className='result_grafColor' style={{backgroundColor: "rgb(37,  137, 208)"}}></div><p> 正解</p>
                    </div>
                    <div className='result_grafExplain'>
                        <div className='result_grafColor' style={{backgroundColor: "rgb(245, 100, 100)"}}></div><p> 不正解</p>
                    </div>
                    <div className='result_grafExplain'>
                        <div className='result_grafColor' style={{backgroundColor: "rgb(175, 160, 160)"}}></div><p> 未出題</p>
                    </div>
                </div>
                <div className='toggle-div'>
                    <p className='toggle-p'>間違えた問題だけ表示</p>
                    <label className="toggle-button-1">
                        <input
                            type="checkbox"
                            checked={showOnlyWrong}
                            onChange={() => setShowOnlyWrong((prev) => !prev)}
                        />
                    </label>
                </div>
                {result.map((ele: TypeResult, i) =>
                    list_return(i + 1, ele.choices, ele.inputKey, ele.correctKey)
                )}
            </div>
            <div className="footer">
                <div className='result-buttondiv'>
                    <button type="button" className="result-button" onClick={() => setSection('kuizu')}>
                        続ける
                    </button>
                </div>
                <div className='result-buttondiv'>
                    <button type="button" className="result-button" onClick={() => setSection('home')}>
                        終了
                    </button>
                </div>
            </div>
        </div>
    );
};
