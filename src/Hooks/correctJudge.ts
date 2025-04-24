//ボタンが押されたときに正誤を判断
export const useCorrectJudge = (correctIdx: number, inputIdx: number, setScreenState: React.Dispatch<React.SetStateAction<string>>) => {
    if(correctIdx === inputIdx){
        setScreenState("ConfirmedTrue")
        const audio = new Audio("/KuizuData/correct.mp3")
        audio.play()
    }
    else{
        setScreenState("ConfirmedFalse")
        const audio = new Audio("/KuizuData/incorrect.mp3")
        audio.play()
    }
}