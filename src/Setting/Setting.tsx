import "./Setting.scss"
import { memo } from "react";
import { Setting_Body } from "./Setting_Body/setting_Body.tsx";
import { Menu } from "../Menu/menu.tsx";


export const Setting = memo(() => {
    return(
        <div className="Setting">
          <Setting_Body/>
          <Menu/>
        </div>
    )
})