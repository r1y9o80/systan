import "./setting.css"
import { useState, memo } from "react"
import { Header } from "./header/header"
import { Body } from "./body/body"
const initialStageKey = "[英単語]ステージ1"

export const Setting =  memo(() => {
  const [selectedKey, setSelectedKey] = useState(initialStageKey)
    return (
        <div id="setting">
          <Header selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
          <Body selectedKey={selectedKey}/>
        </div>
    )
})

