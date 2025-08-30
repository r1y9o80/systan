type dataForGenerate_RefType = {
  activeQuestion: string[];
  inactiveQuestion: string[];
  select: string[];
};


export const useQuestionGenerate = (
    dataForGenerate_Ref: React.RefObject<dataForGenerate_RefType>,
    questionData: Record<string, { occurrenceRate: number; corrected: number }>,
    deduplicationRange: number,
    selectWeight: number
) => {
    const dataForGenerate_active = dataForGenerate_Ref.current["activeQuestion"]
    const correctKey = (selectWeight != 1)? selectkey(dataForGenerate_active, questionData): dataForGenerate_active[Math.random() * (dataForGenerate_active.length-1)]
    console.log("active: ",dataForGenerate_Ref.current["activeQuestion"])
    setActiveKey(correctKey, dataForGenerate_Ref, deduplicationRange)
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
    dataForGenerate_Ref: React.RefObject<dataForGenerate_RefType>,
    deduplicationRange: number,
){
    if(!dataForGenerate_Ref.current) return //ありえない
    dataForGenerate_Ref.current["activeQuestion"] = dataForGenerate_Ref.current["activeQuestion"].filter(e => e != correctKey) //漸化的に減っていく
    dataForGenerate_Ref.current["inactiveQuestion"].push(correctKey) //後ろに追加
    if(dataForGenerate_Ref.current["inactiveQuestion"].length >= deduplicationRange){
        const restored = dataForGenerate_Ref.current["inactiveQuestion"].shift() //前から削除➡pushとshiftで漸化的に順番にactiveへ移動していく
        restored && dataForGenerate_Ref.current["activeQuestion"].push(restored)
    }
}
