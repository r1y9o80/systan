import "./message.scss"
import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { message_shown } from "../states/message-shown"
import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"

export const Message = () => {
    const [closeShow, setCloseShow] = useState(false)
    const setMessageShown = useSetRecoilState(message_shown)
    new Promise(resolve => setTimeout(resolve,4000)).then(() => {
        setCloseShow(prev => !prev)
    })
    function closed(){
      setMessageShown(prev => prev = true);
      save_messageShown(true);
    }

  return (
    <div className="message-container">
      <div className="message-textBox">
        <div className="message-titleBox">
          <h1 id="message-title">アップデート情報</h1>
          {closeShow && <h1 id="message-closeButton" onClick={() => closed()}>✕</h1>}
        </div>
        <p>
          ・問題選択画面の初期位置がズレていた問題を解決しました<br /><br />
          ・アップデート情報が表示されるようになりました。<br /><br />
          ・同じ問題が５問以内に出現しなくなりました。<br /><br />
          ・パーセンテージ表示の際ラグが発生するのを修正しました。それに伴いデータベースの読み取り回数が改善されました。<br /><br />
          ・設定画面が新規実装されました。（ログアウト、問題数、「この中にはない」のON・OFF切替、ご意見箱の実装）<br /><br />
          今後とも当アプリをよろしくお願いします！！
        </p>
      </div>
    </div>
  )
}

async function save_messageShown(flag: boolean) {
  const db = getFirestore();
  const userId = getAuth().currentUser?.uid;
  if (!userId) return;
  const Doc_address = doc(db, "users", userId);
  await updateDoc(Doc_address, { messageShown: flag });
}