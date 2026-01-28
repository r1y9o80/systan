import "./testIntro.scss";
import { useSetRecoilState } from "recoil";
import { sectionState } from "../states/section";

export const TestIntro = () => {
  const setSection = useSetRecoilState(sectionState);

  return (
    <div className="test-intro">
      <div className="test-intro-card">
        <h2 className="test-intro-title">テストを始めます</h2>

        <div className="test-intro-text">
          <p>今から指定範囲の確認テストを始めます。</p>
          <p>
            初めは答えの選択肢が隠されています。<br />
            問題の答えが分かった場合のみ、タップして選択肢を表示してください。
          </p>
          <p>
            わからない場合は、無理せず<br />
            「わからない」ボタンを押してください。
          </p>
        </div>

        <button
          className="test-intro-start"
          onClick={() => setSection("test")}
        >
          テストを始める
        </button>
      </div>
    </div>
  );
};
