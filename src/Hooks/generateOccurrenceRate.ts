export const useSetOccurrencerate = (
    StageKeys: string[],
    occurrenceRate_recoil: Record<string, any>
) => {
    for(let i=0; i<StageKeys.length; i++){
        if(occurrenceRate_recoil[StageKeys[i]]) continue
        occurrenceRate_recoil[StageKeys[i]] = 1 
    }
    return 
}