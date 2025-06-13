import { getAuth } from "firebase/auth"
import { getFirestore, doc, updateDoc } from "firebase/firestore"

export const useSavePercentage = (perItem: number, storeId: string, idx: number, CorrectPercentage: number, fieldData: number[], setUserData: (updater: (prev: any) => any) => void) => {
    const newArray: number[] = generate_newArray(fieldData, perItem, idx, CorrectPercentage)
    SaveStore(storeId, newArray)
    setUserData(prev => ({
        ...prev,
        [storeId]: newArray,
    }))
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

async function SaveStore(storeId:string, newArray: number[]){
    const db = getFirestore();
    const userId = getAuth().currentUser?.uid;
    if (!userId) {
        console.log("ユーザーがサインインしていません");
        return {}; // ユーザーがサインインしていない場合、空のオブジェクトを返す
    }
    const The_Doc_Pointer = doc(db, "users", userId);
    await updateDoc(The_Doc_Pointer, {[storeId]: newArray})
}