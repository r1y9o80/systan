import "./footer.scss"
import { memo } from "react"

export const Footer =  memo(() => {
    return(
        <div className="Home-footer_div">
          <footer className="Home-footer">
            <div className="Home-home_button">
                <p className="Home-p">⌂</p>
            </div>
            <div className="Home-setting_button">
                <p className="Home-p">⚙</p>
            </div>
          </footer>
        </div>
    )

})