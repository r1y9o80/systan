import "./setting.scss"
import { memo } from "react";
import { Setting_Body } from "./Setting_Body/setting_body.tsx";
import { Menu } from "../Menu/menu.tsx";

type Props = {
  logOut: () => void;
};

export const Setting = memo(({ logOut }: Props) => {
  return (
    <div className="Setting">
      <Setting_Body logOut={logOut} />
      <Menu />
    </div>
  );
});
