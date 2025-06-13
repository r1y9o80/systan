export const useTextSned = async (message: string) => {
    try {
        // POSTリクエストの送信
        const response = await fetch("https://quiz-result-sender-v5i2.onrender.com/webhook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                header: "Message",
                body: message
            })
        });

        const data = await response.text(); // レスポンスをJSONとして解析

        console.log("Success:", data); // 成功時の処理
    } catch (error) {
        console.error("Error:", error); // エラー時の処理
    }
} 