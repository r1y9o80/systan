export class bodyBlock {
    dataName: string;
    title: string;
    subtitle: string;
    img: string;
    start: number;
    totalNum: number;

    constructor(dataName: string, title: string, subtitle: string, img: string, start: number, totalNum: number) {
        this.dataName = dataName;
        this.title = title;
        this.subtitle = subtitle;
        this.img = img;
        this.start = start;
        this.totalNum = totalNum;
    }

    static generateSequenceBlocks(dataName: string, title: string, subtitle: string, img: string, start: number, totalNum: number, blocks_Sum: number): bodyBlock[] {
        return Array.from({ length: blocks_Sum }, (_, i) => {
            const this_start = start + totalNum * i;
            const this_last = this_start + (totalNum - 1)
            const this_title = `${title} ${this_start}~${this_last}`
            return new bodyBlock(dataName, this_title, subtitle, img, this_start, totalNum);
        });
    }
}
