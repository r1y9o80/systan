import React, { useRef, useEffect } from "react";
import { memo } from "react";
import "./header.css";
import { init } from "../setting_data/data";
import { auth } from "../../firebase";

export const Header: React.FC<{ selectedKey: string, setSelectedKey: React.Dispatch<React.SetStateAction<string>> }> = memo(({ selectedKey, setSelectedKey }) => {
  const itemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const isButtonClicked = useRef(false); // ボタンクリックの状態を保持

  useEffect(() => { //なくても動くっちゃ動く。あるほうが安全かな
    if (itemRefs.current[selectedKey]) {
      // ボタンがクリックされた場合のみスムーズにスクロール
      if (isButtonClicked.current) {
        itemRefs.current[selectedKey]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        isButtonClicked.current = false; // 一度スクロールしたらフラグをリセット
      } else {
        // 通常のスクロール（スムーズではない）
        itemRefs.current[selectedKey]?.scrollIntoView({ block: "nearest", inline: "center" });
      }
    }
  }, [selectedKey]);

  const handleClick = (stageKey: string) => {
    setSelectedKey(stageKey);
    isButtonClicked.current = true; // ボタンがクリックされたことを記録
  };

  return (
    <header>
      <ul className="scrollable-list">
        <li style={{color:"blue"}}onClick={() => auth.signOut() }>ログアウト</li>
        {Object.entries(init).map(([stageKey, _], index) => (
          <li
            key={index}
            ref={(el) => { itemRefs.current[stageKey] = el; }}
            onClick={() => handleClick(stageKey)}  // ボタンがクリックされたときにhandleClickを呼び出し
            style={stageKey === selectedKey ? { borderBottom: "2px solid blue" } : {}}
          >
            {stageKey}
          </li>
        ))}
        <li style={{color:"blue"}}onClick={() => test()}>タッチ</li>
      </ul>
    </header>
  );
});




import { getFirestore, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

async function test() {
  const db = getFirestore();
  const userId = auth.currentUser?.uid;

  if (!userId) {
    console.log("ユーザーがサインインしていません");
    return;
  }

  //データベースが存在するポインタ(URL的な参照場所のこと)を取得
  const userDocRef = doc(db, "users", userId);
  //実際にデータを取得
  const docSnap = await getDoc(userDocRef)

  const newArray = [10, 90, 0, 50, 20, 99, 100, 0, 10, 50, 30, 50, 10, 30, 40, 20, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0];

  try {
    if (!docSnap.exists()) {
      // ドキュメントがなければ作成
      await setDoc(userDocRef, { "1": newArray });
      console.log("新しいユーザーのドキュメントを作成しました");
      console.log("配列に要素が登録/更新されました");
    } else {
      await updateDoc(userDocRef, { "1": newArray });
      console.log("ドキュメントはすでに存在します");
      console.log("配列に要素が登録/更新されました");
    }
  } catch (error) {
    console.error("エラーが発生しました: ", error);
  }
}
