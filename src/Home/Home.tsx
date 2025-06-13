import "./Home.scss"
import { memo, useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { setting_header } from "../states/setting_header"
import { Header } from "./header/header"
import { Body } from "./body/body"
import { Menu } from "../Menu/menu.tsx"
import { Message } from "../Message/message.tsx"
import { message_shown } from "../states/message-shown.ts"
import { userData_recoil } from "../states/userData.ts"

export const Home = memo(() => {
  const [messageShown, setMessageShown] = useRecoilState(message_shown);
  const [selectedKey, setSelectedKey] = useRecoilState(setting_header);
  const userData = useRecoilValue<Record<string, any>>(userData_recoil);

  useEffect(() => {
    if(userData["messageShown"] === false) setMessageShown(false)
  }, [userData]);

  return (
    <div id="setting">
      {!messageShown && <Message />}
      <Header selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
      <Body selectedKey={selectedKey} />
      <Menu />
    </div>
  );
});

