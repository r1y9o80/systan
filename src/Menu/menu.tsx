import "./menu.scss"
import Home_img from "./imgs/Home.png";
import Setting_img from "./imgs/Setting.png";
import { memo } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { sectionState } from "../states/section"
import { y_position } from "../states/y-position";

export const Menu =  memo(() => {
  const set_yPos = useSetRecoilState(y_position)
  const [Section, setSection] = useRecoilState(sectionState)
  function leave_home(destination: string){
    set_yPos(0);
    setSection(destination)
  }
  
  return(
        <div className="Menu-footer_div">
          <footer className="Menu-footer">
            <div className="Menu-home_button">
                <img style={ Section === "home"? {backgroundColor: "rgb(119, 186, 240)"}: {}} className="Menu-img" src={Home_img} onClick={() => setSection("home")}></img>
            </div>
            <div className="Menu-setting_button">
                <img style={ Section === "setting"? {backgroundColor: "rgb(119, 186, 240)"}: {}} className="Menu-img" src={Setting_img} onClick={() => leave_home("setting")}></img>
            </div>
          </footer>
        </div>
    )
})