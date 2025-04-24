import { Data } from "../../types/data"

export const init:  { [key: string]: Data } = {
    "[英単語]ステージ1" : {
        data: "systan-data", //参照データファイル
        title: "[英単語]", //タイトル
        subtitle: "[英単語]ステージ1", //サブタイトル
        startItem: 1, //開始問題番号
        perItem: 20, //一問当たりの問題数
        total: 20, //合計問題数
        NumOfChoice: 3
    },
    "[英単語]ステージ2" : {
        data: "systan-data",
        title: "[英単語]",
        subtitle: "[英単語]ステージ2",
        startItem: 401,
        perItem: 20,
        total: 20,
        NumOfChoice: 3
    },
    "[英単語]ステージ3" : {
        data: "systan-data",
        title: "[英単語]",
        subtitle: "[英単語]ステージ3",
        startItem: 801,
        perItem: 20,
        total: 20,
        NumOfChoice: 3
    },
    "[英単語]ステージ4" : {
        data: "systan-data",
        title: "[英単語]",
        subtitle: "[英単語]ステージ3",
        startItem: 1201,
        perItem: 20,
        total: 20,
        NumOfChoice: 3
    },
    "[英単語]ステージ5" : {
        data: "systan-data",
        title: "[英単語]",
        subtitle: "[英単語]ステージ5",
        startItem: 1601,
        perItem: 20,
        total: 20,
        NumOfChoice: 3
    }
}