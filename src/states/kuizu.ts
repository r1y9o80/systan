import { atom } from "recoil";
import { dataForQuiz_type } from "../types/Quiz";


//クイズの参照データ,最小の問題番号、問題数からクイズを生成するためのState（setting/bodyの学習ボタンからkuizu/kuizuのuseKuizuReload関数にデータが送られる）
export const dataForQuiz_recoil = atom<dataForQuiz_type>({
    key: "kuizuInfo",
    default: {data: {"":[]}, title: "", perItem: 0, idx:0, dataName: ""}
})
