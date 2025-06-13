import "./Home.scss"
import { memo, useEffect } from "react"
import { useRecoilState } from "recoil"
import { setting_header } from "../states/setting_header"
import { Header } from "./header/header"
import { Body } from "./body/body"
import { Menu } from "../Menu/menu.tsx"
import { Message } from "../Message/message.tsx"
import { userData_recoil } from "../states/userData.ts"

export const Home = memo(() => {
  const [selectedKey, setSelectedKey] = useRecoilState(setting_header);
  const [userData, setUserData] = useRecoilState<Record<string,any>>(userData_recoil);

  useEffect(() => {
    console.log(userData["messageShown"])
    if(userData["messageShown"] === false) {
      setUserData(prev => ({
        ...prev,
        messageShown: false
      }))
      console.log("be false")
    }
  }, [userData["messageShown"]]);

  console.log(userData["messageShown"])
  return (
    <div id="setting">
      {userData["messageShown"] === false && <Message />}
      <Header selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
      <Body selectedKey={selectedKey} />
      <Menu />
    </div>
  );
});

