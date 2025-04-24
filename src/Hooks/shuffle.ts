// 配列をシャッフルするユーティリティ関数
export const shuffle = <T>(array: T[]): T[] => {
    const result = [...array]; // 元の配列を壊さないようにコピー
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };
  