import { Data } from "../../types/data"

export const init:  { [key: string]: Data } = {
    "[英単語]ステージ1" : {
        data: "systan-data", //参照データファイル
        title: "[英単語]", //タイトル
        subtitle: "[英単語]ステージ1", //サブタイトル
        initial: 1, //開始問題番号
        perItem: 20, //一問当たりの問題数
        total: 20 //合計問題数
    },
    "[英単語]ステージ2" : {
        data: "systan-data",
        title: "[英単語]",
        subtitle: "[英単語]ステージ2",
        initial: 401,
        perItem: 20,
        total: 20
    },
    "[英単語]ステージ3" : {
        data: "systan-data",
        title: "[英単語]",
        subtitle: "[英単語]ステージ3",
        initial: 801,
        perItem: 20,
        total: 20
    },
    "[英単語]ステージ4" : {
        data: "systan-data",
        title: "[英単語]",
        subtitle: "[英単語]ステージ3",
        initial: 1201,
        perItem: 20,
        total: 20
    },
    "[英単語]ステージ5" : {
        data: "systan-data",
        title: "[英単語]",
        subtitle: "[英単語]ステージ5",
        initial: 1601,
        perItem: 20,
        total: 20
    }
}