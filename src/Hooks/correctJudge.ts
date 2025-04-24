//ボタンが押されたときに正誤を判断
export const useCorrectJudge = (correctIdx: number, inputIdx: number, setScreenState: React.Dispatch<React.SetStateAction<string>>) => {
    if(correctIdx === inputIdx){
        setScreenState("ConfirmedTrue")
        const audio = new Audio("/r1y9o80/systan/mp/correct.mp3")
        audio.play()
    }
    else{
        setScreenState("ConfirmedFalse")
        const audio = new Audio("/r1y9o80/systan/mp/incorrect.mp3")
        audio.play()
    }
}