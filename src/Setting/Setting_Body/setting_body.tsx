import "./setting_body.scss"
import { useRecoilState } from "recoil";
import { settings_recoil } from "../../states/settings";
import { useRef } from "react";
import { useTextSned } from "../../Hooks/textSend";

type Props = {
  logOut: () => void;
};

export const Setting_Body = ({ logOut }: Props) => {
  const ObserveTextArea = useRef<HTMLTextAreaElement>(null);
  const [settingData, setSettings] = useRecoilState(settings_recoil);

  // カスタムフックならトップレベルで呼ぶ（例）
  // const sendTextSned = useTextSned();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({
      ...prev,
      selectSum: Number(e.target.value),
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({
      ...prev,
      noneInSelect_Active: e.target.checked,
    }));
  };

  // 送信処理関数（イベントハンドラ）
  const sendText = () => {
    const message = ObserveTextArea.current?.value;
    if (!message) return;
    useTextSned(message); // もしくは sendTextSned(message) など、適切に呼ぶ
  };

  return (
    <div className="setting-container">
      <button className="logout_button" onClick={logOut}>ログアウト</button>

      <label htmlFor="selectSum" className="setting-selectSum_label">問題数(この中にはないを含まない)</label>
      <select id="selectSum" value={settingData.selectSum} onChange={handleSelectChange}>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>

      <div className="toggle-div">
        <p className="toggle-p">この中にはないON/OFF</p>
        <label className="toggle-button-1">
          <input
            type="checkbox"
            checked={settingData.noneInSelect_Active}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>

      <div className="messageForm">
        <p className="textFormTitle">質問・要望・メッセージ等コメントください！</p>
        <textarea
          ref={ObserveTextArea}
          value={ObserveTextArea.current?.value}
          className="textbox"
          placeholder="ここに入力してください"
        ></textarea>
        <div className="textSend_buttonContainer">
          <button className="textSend_button" onClick={sendText}>送信</button>
        </div>
      </div>
    </div>
  );
};
