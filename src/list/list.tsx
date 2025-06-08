import { useSetRecoilState } from "recoil"
import { sectionState } from "../states/section"

export const List = () => {
    const setSection = useSetRecoilState(sectionState)
    return(
        <>
          <h1>まだ実装されていません</h1>
          <button onClick={() => setSection("home")}>戻る</button>
        </>
    )
}