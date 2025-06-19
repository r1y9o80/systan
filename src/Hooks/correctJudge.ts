import { RefObject } from "react"

const audio1 = new Audio("/mp/correct.mp3")
const audio2 = new Audio("/mp/incorrect.mp3")

//ボタンが押されたときに正誤を判断
export const useCorrectJudge = (
    correctIdx: string, 
    inputIdx: string, 
    setScreenState: React.Dispatch<React.SetStateAction<string>>, sumOfCorrect: RefObject<number>,
    occurrenceRate: Record<string,any>
) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if(correctIdx === inputIdx){
        setScreenState("ConfirmedTrue")
        sumOfCorrect.current +=1
        audio1.play()
        occurrenceRate[inputIdx]/=1.8
        console.log(occurrenceRate[inputIdx])
    }
    else{
        setScreenState("ConfirmedFalse")
        audio2.play()
    }
}

export const audioStop = () => {
    [audio1,audio2].forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
    })
}