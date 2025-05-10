import { atom } from "recoil";
import { TypeQuizInfo } from "../types/Quiz";


//クイズの参照データ,最小の問題番号、問題数からクイズを生成するためのState（setting/bodyの学習ボタンからkuizu/kuizuのuseKuizuReload関数にデータが送られる）
export const QuizInfo = atom<TypeQuizInfo>({
    key: "kuizuInfo",
    default: {data: {"":[]},  numOfNormalChoices: 0, title: "", perItem: 0, storeId:"", idx:0}
})
