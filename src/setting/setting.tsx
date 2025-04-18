import React from "react";
import { useState, memo } from "react"
import Header from "./header/header"
import Body from "./body/body"
const initialStageKey = "[英単語]ステージ1"

const Setting =  memo(() => {
  const [selectedKey, setSelectedKey] = useState(initialStageKey)
    return (
        <>
          <Header selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
          <Body selectedKey={selectedKey} />
        </>
    )
})

export default Setting
