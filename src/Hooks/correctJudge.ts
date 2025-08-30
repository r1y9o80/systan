import { RefObject } from "react"

const audio1 = new Audio("/mp/correct.mp3")
const audio2 = new Audio("/mp/incorrect.mp3")

//ボタンが押されたときに正誤を判断
export const useCorrectJudge = (
    correctIdx: string, 
    inputIdx: string, 
    setScreenState: React.Dispatch<React.SetStateAction<string>>, sumOfCorrect: RefObject<number>,
    result_log : Record<string, {"occurrenceRate": number, "corrected": number}>,
    selectWeight: number,
) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if(correctIdx === inputIdx){
        setScreenState("ConfirmedTrue")
        sumOfCorrect.current +=1
        audio1.play()
        result_log[inputIdx]["occurrenceRate"]/=selectWeight
        result_log[inputIdx]["corrected"] = 1
        console.log(result_log[inputIdx])
    }
    else{
        setScreenState("ConfirmedFalse")
        audio2.play()
        result_log[inputIdx]["corrected"] = 2
    }
}

export const audioStop = () => {
    [audio1,audio2].forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
    })
}