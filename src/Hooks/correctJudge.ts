import { RefObject } from "react"

//ボタンが押されたときに正誤を判断
export const useCorrectJudge = (correctIdx: string, inputIdx: string, setScreenState: React.Dispatch<React.SetStateAction<string>>, sumOfCorrect: RefObject<number>) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if(correctIdx === inputIdx){
        setScreenState("ConfirmedTrue")
        sumOfCorrect.current +=1
        const audio = new Audio("/mp/correct.mp3")
        audio.play()
    }
    else{
        setScreenState("ConfirmedFalse")
        const audio = new Audio("/mp/incorrect.mp3")
        audio.play()
    }
}