export const useEnglish_read = (text:string) => {
    if ('speechSynthesis' in window) {
        const uttr = new SpeechSynthesisUtterance();
    
        uttr.text = text;
    
        // 言語を設定
        uttr.lang = 'en-US';
    
        // 声の取得は非同期で行う
        const setVoice = () => {
            const voices = speechSynthesis.getVoices();
            for (let i = 0; i < voices.length; i++) {
                if (voices[i].lang === 'en-US') {
                    console.log(i)
                    uttr.voice = voices[i];
                    break; // 見つかったらループを終了
                }
            }

            window.speechSynthesis.cancel();
    
            // 発言を再生
            window.speechSynthesis.speak(uttr);
        };

        // 音声リストをセット
        setVoice();
    }
};
