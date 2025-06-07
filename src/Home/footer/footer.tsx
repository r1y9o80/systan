import "./footer.scss"
import Home_img from "./imgs/Home.png";
import Setting_img from "./imgs/Setting.png";
import { memo } from "react"

export const Footer =  memo(() => {
    return(
        <div className="Home-footer_div">
          <footer className="Home-footer">
            <div className="Home-home_button">
                <img style={{backgroundColor: "rgb(119, 186, 240)"}} className="Home-footer_img" src={Home_img}></img>
            </div>
            <div className="Home-setting_button">
                <img className="Home-footer_img" src={Setting_img}></img>
            </div>
          </footer>
        </div>
    )

})