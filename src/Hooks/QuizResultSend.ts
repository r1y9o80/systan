import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

export const useQuizResultSend = async (title: string, CorrectPercentage: number) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const displayName = auth.currentUser?.displayName;
    const now = firebase.firestore.Timestamp.now().toDate()

    if (!userId || !displayName) return;

    const message = `───────────────
    [Quiz Result] 📅 ${now}
    👤 ${displayName} (${userId})
    📘 [${title}]
    ✅ 正答率: ${CorrectPercentage}%
    ───────────────`;

    try {
        // POSTリクエストの送信
        const response = await fetch("https://quiz-result-sender-v5i2.onrender.com/webhook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.text(); // レスポンスをJSONとして解析

        console.log("Success:", data); // 成功時の処理
    } catch (error) {
        console.error("Error:", error); // エラー時の処理
    }
};
