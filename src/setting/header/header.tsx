import React from "react";
import { memo } from "react";
import "./header.css";
import { init } from "../setting_data/data";

const Header: React.FC<{ selectedKey: string, setSelectedKey: React.Dispatch<React.SetStateAction<string>> }> = memo(({ selectedKey, setSelectedKey }) => {

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, key: string) => {
    setSelectedKey(key);
    // クリックされた要素を画面中央にスクロール
    const target = e.target as HTMLElement; // target を HTMLElement にキャスト
    target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <header>
      <ul className="scrollable-list">
        {Object.entries(init).map(([stageKey, _], index) => (
          <li key={index} onClick={(e) => handleClick(e, stageKey)} style={stageKey === selectedKey ? { borderBottom: "2px solid blue" } : {}}>{stageKey}</li>
        ))}
      </ul>
    </header>
  );
});

export default Header;
