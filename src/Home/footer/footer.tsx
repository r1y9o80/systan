import "./footer.scss"
import { memo } from "react"

export const Footer =  memo(() => {
    return(
        <footer className="Home-footer">
            <div className="Home-home_Button">
                <p>メニュー</p>
            </div>
            <div className="Home-setting_Button">
                <p>設定</p>
            </div>
        </footer>
    )

})