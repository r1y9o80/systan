import { getAuth } from "firebase/auth"
import { getFirestore, doc, updateDoc } from "firebase/firestore"

export const useSavePercentage = (perItem: number, 
    storeId: string, 
    idx: number, 
    CorrectPercentage: number, 
    fieldData: number[], 
    setUserData: (updater: (prev: any) => any) => void,
    dataName: string,
    occurrenceRate: Record<string, number>,
) => {
    
    const newArray: number[] = generate_newArray(fieldData, perItem, idx, CorrectPercentage)
    setUserData(prev => {
        const newData = {
            ...prev,
            [storeId]: newArray,
            [dataName]: prev[dataName] ? { ...prev[dataName], ...occurrenceRate } : occurrenceRate
        };
        SaveStore(newData);  // 副作用はここで呼び出す
        return newData;
    });

}

function generate_newArray(fieldData: number[], perItem: number, idx:number, CorrectPercentage: number){
    let array = []
    for(let i = 0; i<perItem; i++){
        if(i===idx){
            array.push(CorrectPercentage)
        }else{
            const value = fieldData[i] || 0
            array.push(value)
        }
    }
    return array
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