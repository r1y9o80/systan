import React, { useRef, useEffect } from "react";
import { memo } from "react";
import "./header.scss";
import { init } from "../Home-data/data";
import { y_position } from "../../states/y-position";
import { useRecoilState } from "recoil";

export const Header: React.FC<{ selectedKey: string, setSelectedKey: React.Dispatch<React.SetStateAction<string>> }> = memo(({ selectedKey, setSelectedKey }) => {
  const itemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const isButtonClicked = useRef(false); // ボタンクリックの状態を保持
  const [y_pos, setY_pos] = useRecoilState(y_position)

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
    setY_pos(0)
    console.log(y_pos)
    setSelectedKey(stageKey);
    isButtonClicked.current = true; // ボタンがクリックされたことを記録
  };

  return (
    <header>
      <ul className="scrollable-list">
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
      </ul>
    </header>
  );
});