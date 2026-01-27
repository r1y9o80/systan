import React, { useRef, useEffect } from "react";
import { memo } from "react";
import "./header.scss";
import { headersList } from "../Home-data/data";
import { y_position } from "../../states/y-position";
import { useSetRecoilState } from "recoil";

export const Header: React.FC<{ activeStageKey: string, setActiveStageKey: React.Dispatch<React.SetStateAction<string>> }> = memo(({ activeStageKey, setActiveStageKey }) => {
  const itemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const setY_pos = useSetRecoilState(y_position)


  //マウンティング時、以前のステージへ移動
  useEffect(() => { 
    itemRefs.current[activeStageKey]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, []);

  //ヘッダーのステージ選択ボタンが押されたときの処理
  const handleClick = (newActiveStageKey: string) => {
    setY_pos(0)
    setActiveStageKey(newActiveStageKey);
    itemRefs.current[newActiveStageKey]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  };

  return (
    <header>
      <ul className="scrollable-list">
        <li>テスト</li>
        {Object.entries(headersList).map(([_, newActiveStageKey], index) => (
          <li
            key={index}
            ref={(el) => { itemRefs.current[newActiveStageKey] = el; }}
            onClick={() => handleClick(newActiveStageKey)}  // ボタンがクリックされたときにhandleClickを呼び出し
            style={newActiveStageKey === activeStageKey ? { borderBottom: "2px solid blue" } : {}}
          >
            {newActiveStageKey}
          </li>
        ))}
      </ul>
    </header>
  );
});