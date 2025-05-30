export interface BodyBlockType {
    dataName: string;
    title: string;
    subtitle: string;
    img: string;
    start: number;
    totalNum: number;
}


export type DataType = {
    storeId: string,
    body: BodyBlockType[]
}