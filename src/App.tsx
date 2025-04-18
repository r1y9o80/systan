import { useRecoilValue } from "recoil";
import { sectionState } from "./states/section.ts"
import Setting from "./setting/setting"

function App() {
  const section: string = useRecoilValue(sectionState);

  return (
    <>
      {section === "setting" && <Setting/>}
    </>
  )
}

export default App
