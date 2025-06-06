import "./Home.scss"
import { memo } from "react"
import {useRecoilState} from "recoil"
import { setting_header } from "../states/setting_header"
import { Header } from "./header/header"
import { Body } from "./body/body"
import { Footer } from "./footer/footer"

export const Setting =  memo(() => {
  const [selectedKey, setSelectedKey] = useRecoilState(setting_header)
    return (
        <div id="setting">
          <Header selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
          <Body selectedKey={selectedKey}/>
          <Footer/>
        </div>
    )
})

