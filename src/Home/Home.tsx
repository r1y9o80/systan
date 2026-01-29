import "./Home.scss"
import { memo } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { setting_header } from "../states/setting_header"
import { Header } from "./header/header"
import { Body } from "./body/body"
import { Menu } from "../Menu/menu.tsx"
import { userData_recoil } from "../states/userData.ts"

export const Home = memo(() => {
  const [activeStageKey, setActiveStageKey] = useRecoilState(setting_header);
  const userData = useRecoilValue<Record<string,any>>(userData_recoil);
  console.log("userData",userData)
  return (
    <div id="setting">
      <Header activeStageKey={activeStageKey} setActiveStageKey={setActiveStageKey} />
      <Body activeStageKey={activeStageKey} />
      <Menu />
    </div>
  );
});

