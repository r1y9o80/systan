import { getAuth } from "firebase/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { useEffect, memo } from "react"
import { useSetRecoilState } from "recoil"
import { userData_recoil } from "./states/userData"

export const GetUserData = memo(() => {
    const setUserData = useSetRecoilState<Record<string, any>>(userData_recoil)
    useEffect(() => {
        getUserData(setUserData)
    },[])
    return(
        <></>
    )
})

async function getUserData(setUserData: any){
    const db = getFirestore();
    const userId = getAuth().currentUser?.uid;
    if(!userId) return
    const doc_address = doc(db, "users", userId);
    const doc_data = await getDoc(doc_address);
    if(!doc_data.exists()) return
    const userData = doc_data.data() 
    // if(userData["messageShown"] === undefined) {    
    //     await save_messageShown(false);
    //     userData["messageShown"] = false
    //     console.log("undefined")
    // }
    setUserData(userData);
    console.log(userData)
    return
}

// async function save_messageShown(flag: boolean) {
//   const db = getFirestore();
//   const userId = getAuth().currentUser?.uid;
//   if (!userId) return;
//   const Doc_address = doc(db, "users", userId);
//   await updateDoc(Doc_address, { messageShown: flag });
// }