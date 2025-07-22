import { getAuth } from "firebase/auth"
import { getFirestore, doc, updateDoc } from "firebase/firestore"

export const useSaveQuestionsData = (
    setUserData: (updater: (prev: any) => any) => void,
    dataName: string,
    result_log: Record<string, {"occurrenceRate": number, "corrected": number}>,
) => {

    setUserData(prev => {
        const newData = {
            ...prev,
            [dataName]: prev[dataName] ? { ...prev[dataName], ...result_log } : result_log
        };
        SaveStore(newData);  // 副作用はここで呼び出す
        return newData; //これがないとresultでuserDataが読み込めない非同期エラー
    });

}


async function SaveStore(UserData: object){
    const db = getFirestore();
    const userId = getAuth().currentUser?.uid;
    if (!userId) {
        console.log("ユーザーがサインインしていません");
        return {}; // ユーザーがサインインしていない場合、空のオブジェクトを返す
    }
    const The_Doc_Pointer = doc(db, "users", userId);
    await updateDoc(The_Doc_Pointer, UserData)
}