import { TypeMixData } from "../types/Quiz";

export const useGetJsonData = async (dataName: string, startItem: number, perItem: number) => {
  console.log("useGetJsonData is runnned");
  try {
    const response = await fetch(`/KuizuData/${dataName}.json`);
    const jsondata = await response.json(); // JSONとしてデータを解析
    console.log(jsondata); // データをコンソールに出力    
    const mixData: TypeMixData = Object.fromEntries(
      Array.from({ length: perItem }).map((_, i) => [startItem + i, jsondata[startItem + i]])
    );
    return mixData
  } catch (error) {
    return undefined
    console.error("データ読み込みエラー:", error);
  }
};
