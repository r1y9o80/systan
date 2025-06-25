export const useSetOccurrencerate = (
    StageKeys: string[],
    result_log: Record<string, {"occurrenceRate": number, "corrected": number}>
) => {
    for(let i=0; i<StageKeys.length; i++){
        if(result_log[StageKeys[i]]) continue
        result_log[StageKeys[i]] = {"occurrenceRate": 1, "corrected": 0}
    }
    return 
}