import "./setting_body.scss"
import { useState, useRef } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { settings_recoil } from "../../states/settings"
import { userData_recoil } from "../../states/userData"
import { useTextSned } from "../../Hooks/textSend"
import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"

type Props = {
  logOut: () => void
}

type SettingData = {
  selectSum: number
  noneInSelect_Active: boolean
  questionSum: number
  deduplicationRange: number
  selectWeight: number
}

type UserData = {
  setting?: SettingData
  [key: string]: any
}

export const Setting_Body = ({ logOut }: Props) => {
  const ObserveTextArea = useRef<HTMLTextAreaElement>(null)

  const defaultSetting = useRecoilValue(settings_recoil)
  const [userData, setUserData] = useRecoilState<UserData>(userData_recoil)

  const [settingData, setSettingData] = useState<SettingData>(
    (userData as any).setting ?? (defaultSetting as SettingData)
  )


  const [settingChanged, setSettingChanged] = useState(false)

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: keyof SettingData
  ) => {
    setSettingData(prev => ({ ...prev, [id]: Number(e.target.value) }))
    setSettingChanged(true)
  }

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof SettingData
  ) => {
    setSettingData(prev => ({ ...prev, [id]: e.target.checked }))
    setSettingChanged(true)
  }

  const saveSetting = () => {
    const newData = {
      ...userData,
      setting: settingData,
    }
    setUserData(newData)
    SaveStore(newData)
    setSettingChanged(false)
  }

  const sendText = () => {
    if (!ObserveTextArea.current) return
    const message = ObserveTextArea.current.value.trim()
    if (!message) return
    useTextSned(message)
    ObserveTextArea.current.value = ""
    ObserveTextArea.current.placeholder = "送信しました！"
  }

  return (
    <div className="setting-container">
      <div className="setting-logoutButton_container">
        <button className="setting-logout_button" onClick={logOut}>
          ログアウト
        </button>
      </div>

      <div className="setting-selects_container">
        <label>選択肢数（この中にはないを含まない）</label>
        <select
          value={settingData.selectSum}
          onChange={e => handleSelectChange(e, "selectSum")}
        >
          {[2, 3, 4, 5].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      <div className="setting-toggle_container">
        <p className="setting-toggle_label">この中にはない</p>
        <label className="setting-toggle">
          <input
            type="checkbox"
            checked={settingData.noneInSelect_Active}
            onChange={e => handleCheckboxChange(e, "noneInSelect_Active")}
          />
        </label>
      </div>

      <div className="setting-selects_container">
        <label>問題数</label>
        <select
          value={settingData.questionSum}
          onChange={e => handleSelectChange(e, "questionSum")}
        >
          {[10, 20, 30, 40].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      <div className="setting-selects_container">
        <label>n問以内の重複を防ぐ</label>
        <select
          value={settingData.deduplicationRange}
          onChange={e => handleSelectChange(e, "deduplicationRange")}
        >
          {[0, 5, 10].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      <div className="setting-selects_container">
        <label>正解問題の出現確率変動値</label>
        <select
          value={settingData.selectWeight}
          onChange={e => handleSelectChange(e, "selectWeight")}
        >
          {[1, 2, 5, 10].map(v => (
            <option key={v} value={v}>
              {v === 1 ? "変化なし" : `${v}倍`}
            </option>
          ))}
        </select>
      </div>

      <button
        className="setting-save_button"
        disabled={!settingChanged}
        onClick={saveSetting}
      >
        保存
      </button>

      <div className="setting-messageForm">
        <p>質問・要望などあれば送ってください</p>
        <textarea ref={ObserveTextArea} className="setting-textbox" />
        <div className="setting-textSend_buttonContainer">
          <button className="setting-textSend_button" onClick={sendText}>
            送信
          </button>
        </div>
      </div>
    </div>
  )
}

async function SaveStore(UserData: object) {
  const db = getFirestore()
  const userId = getAuth().currentUser?.uid
  if (!userId) return
  const ref = doc(db, "users", userId)
  await updateDoc(ref, UserData)
}
