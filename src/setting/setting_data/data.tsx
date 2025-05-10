import { Data } from "../../types/data"

export const init:  { [key: string]: Data } = {
    "[英単語]ステージ1" : {
        storeId: "0",
        dataName: "systan-data", //参照データファイル
        img: "systan-Img",
        title: "[英単語]", //タイトル
        subtitle: "[英単語]ステージ1　(level-1)", //サブタイトル
        startItem: 1, //開始問題番号
        perItem: 20, //一問当たりの問題数
        total: 20, //合計問題数
        NumOfChoice: 3
    },
    "[英単語]ステージ2" : {
        storeId: "1",
        dataName: "systan-data",
        img: "systan-Img",
        title: "[英単語]",
        subtitle: "[英単語]ステージ2　(level-2)",
        startItem: 401,
        perItem: 20,
        total: 20,
        NumOfChoice: 3
    },
    "[英単語]ステージ3" : {
        storeId: "2",
        dataName: "systan-data",
        img: "systan-Img",
        title: "[英単語]",
        subtitle: "[英単語]ステージ3　(level-3)",
        startItem: 801,
        perItem: 20,
        total: 20,
        NumOfChoice: 3
    },
    "[英単語]ステージ4" : {
        storeId: "3",
        dataName: "systan-data",
        img: "systan-Img",
        title: "[英単語]",
        subtitle: "[英単語]ステージ3　(level-4)",
        startItem: 1201,
        perItem: 20,
        total: 20,
        NumOfChoice: 3
    },
    "[英単語]ステージ5" : {
        storeId: "4",
        dataName: "systan-data",
        img: "systan-Img",
        title: "[英単語]",
        subtitle: "[英単語]ステージ5　(level-5)",
        startItem: 1601,
        perItem: 20,
        total: 20,
        NumOfChoice: 3
    },    
    "[古文単語]ステージ1" : {
        storeId: "5",
        dataName: "kobun-data",
        img: "kobun-tango-Img",
        title: "[古単]",
        subtitle: "[古単]ステージ1　(level-1)",
        startItem: 1,
        perItem: 20,
        total: 13,
        NumOfChoice: 3
    }
}