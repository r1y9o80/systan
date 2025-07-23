type dataForGenerateType = {
  activeQuestion: string[];
  inactiveQuestion: string[];
  select: string[];
};


export const useQuestionGenerate = (
    dataForGenerate: React.RefObject<dataForGenerateType>,
    questionData: Record<string, { occurrenceRate: number; corrected: number }>,
) => {
    const correctKey = selectkey(dataForGenerate.current["activeQuestion"], questionData)
    setActiveKey(correctKey, dataForGenerate)
    return correctKey

};

//確率の元、activeKeysからキーを選ぶ
function selectkey(
    activeKeys: string[],
    questionData :Record<string, { occurrenceRate: number; corrected: number }>,
){
    const r = Math.random() * activeKeys.reduce((acc, key) => acc + questionData[key]["occurrenceRate"], 0);
    let acc = 0
    for(const e of activeKeys){
        acc += questionData[e]["occurrenceRate"]
        if(r < acc) {
            console.log(e, questionData[e]["occurrenceRate"])
            return e
        }
    }
    console.log("?")
    return activeKeys[0]
}



//activeKeys(inActiveKeys)更新
function setActiveKey(
    correctKey: string,
    dataForGenerate: React.RefObject<dataForGenerateType>,
){
    if(!dataForGenerate.current) return //ありえない
    dataForGenerate.current["activeQuestion"] = dataForGenerate.current["activeQuestion"].filter(e => e != correctKey) //漸化的に減っていく
    dataForGenerate.current["inactiveQuestion"].push(correctKey) //後ろに追加
    if(dataForGenerate.current["inactiveQuestion"].length >= 5){
        const restored = dataForGenerate.current["inactiveQuestion"].shift() //前から削除➡pushとshiftで漸化的に順番にactiveへ移動していく
        restored && dataForGenerate.current["activeQuestion"].push(restored)
    }
}