import { TypeMixData } from "../types/Quiz";

export const useGetJsonData = async (dataName: string, startItem: number, perItem: number, sendMixData: (data: TypeMixData) => void) => {
  console.log("useGetJsonData is runnned");
  try {
    const response = await fetch(`/r1y9o80/systan/KuizuData/${dataName}.json`);
    const jsondata = await response.json();
    const mixData = Object.fromEntries(
      Array.from({ length: perItem }).map((_, i) => [startItem + i, jsondata[startItem + i]])
    );
    sendMixData(mixData); // ✅ 中身のあるデータを渡す
  } catch (error) {
    sendMixData(undefined)
    console.error("データ読み込みエラー:", error);
  }
};
