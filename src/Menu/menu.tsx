import "./menu.scss"
import Home_img from "./imgs/Home.png";
import Setting_img from "./imgs/Setting.png";
import { memo } from "react"
import { useRecoilState } from "recoil"
import { sectionState } from "../states/section"

export const Menu =  memo(() => {
  const [Section, setSection] = useRecoilState(sectionState) 
  return(
        <div className="Menu-footer_div">
          <footer className="Menu-footer">
            <div className="Menu-home_button">
                <img style={ Section === "home"? {backgroundColor: "rgb(119, 186, 240)"}: {}} className="Menu-img" src={Home_img} onClick={() => setSection("home")}></img>
            </div>
            <div className="Menu-setting_button">
                <img style={ Section === "setting"? {backgroundColor: "rgb(119, 186, 240)"}: {}} className="Menu-img" src={Setting_img} onClick={() => setSection("setting")}></img>
            </div>
          </footer>
        </div>
    )
})