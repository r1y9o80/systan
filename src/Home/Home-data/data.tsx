import { BodyBlockType } from "../../types/data"
import { bodyBlock } from "./body-class";

export const headersList = [
  "[英単語]ステージ1",
  "[英単語]ステージ2",
  "[英単語]ステージ3",
  "[英単語]ステージ4",
  "[英単語]ステージ5",
  "[古文単語315]ステージ1",
  "[古文単語315]ステージ2",
];

export const init: { [key: string]: BodyBlockType[] } = {
  "[英単語]ステージ1": [
    ...bodyBlock.generateSequenceBlocks("systan-data", "[英単語]", "[英単語]ステージ1　(level-1)", "systan-Img", 1, 20, 20),
    new bodyBlock("systan-data", "[英単語]総復習", "[英単語]ステージ1　(level-1)", "systan-Img", 1, 400)
  ],
  "[英単語]ステージ2": [
    ...bodyBlock.generateSequenceBlocks("systan-data", "[英単語]", "[英単語]ステージ1　(level-1)", "systan-Img", 401, 20, 20),
    new bodyBlock("systan-data", "[英単語]総復習", "[英単語]ステージ1　(level-1)", "systan-Img", 401, 400)
  ],
  "[英単語]ステージ3": [
    ...bodyBlock.generateSequenceBlocks("systan-data", "[英単語]", "[英単語]ステージ1　(level-1)", "systan-Img", 801, 20, 20),
    new bodyBlock("systan-data", "[英単語]総復習", "[英単語]ステージ1　(level-1)", "systan-Img", 801, 400)
  ],
  "[英単語]ステージ4": [
    ...bodyBlock.generateSequenceBlocks("systan-data", "[英単語]", "[英単語]ステージ1　(level-1)", "systan-Img", 1201, 20, 20),
    new bodyBlock("systan-data", "[英単語]総復習", "[英単語]ステージ1　(level-1)", "systan-Img", 1201, 400)
  ],
  "[英単語]ステージ5": [
    ...bodyBlock.generateSequenceBlocks("systan-data", "[英単語]", "[英単語]ステージ1　(level-1)", "systan-Img", 1601, 20, 20),
    new bodyBlock("systan-data", "[英単語]総復習", "[英単語]ステージ1　(level-1)", "systan-Img", 1601, 400)
  ],
  "[古文単語315]ステージ1": [
    ...bodyBlock.generateSequenceBlocks("kobun315-data", "[古文単語315]", "[古文単語315]ステージ1　(level-1)", "kobun-tango-Img", 1, 20, 20),
    new bodyBlock("kobun315-data", "[古文単語315]総復習", "[古文単語315]ステージ1　(level-1)", "kobun-tango-Img", 1, 400)
  ],
  "[古文単語315]ステージ2": [
    ...bodyBlock.generateSequenceBlocks("kobun315-data", "[古文単語315]", "[古文単語315]ステージ2　(level-2)", "kobun-tango-Img", 401, 20, 6),
    new bodyBlock("kobun315-data", "[古文単語315] 521~536", "[古文単語315]ステージ2　(level-2)", "kobun-tango-Img", 521, 16),
    new bodyBlock("kobun315-data", "[古文単語315]総復習", "[古文単語315]ステージ2　(level-2)", "kobun-tango-Img", 401, 136)
  ],
};

console.log(init);
