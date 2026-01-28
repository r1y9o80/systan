import "./list.scss";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { sectionState } from "../states/section";
import { toList } from "../states/list";
import { TypeToList } from "../types/toList";

export const List = () => {
  const setSection = useSetRecoilState(sectionState);
  const toListValue = useRecoilValue<TypeToList>(toList);

  const { title, data } = toListValue;

  return (
    <div className="list-page">
      {/* タイトル */}
      <h2 className="list-title">{title}</h2>

      <div className="top-actions">
        <button className="btn secondary" onClick={() => setSection("home")}>
          戻る
        </button>
        <button className="btn primary" onClick={() => setSection("testIntro")}>テスト</button>
      </div>

      {data && (
        <div className="table-wrapper">
          <table className="word-table">
            <thead>
              <tr>
                <th>問題番号</th>
                <th>英単語</th>
                <th>意味</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data).map(([number, [word, meaning]]) => (
                <tr key={number}>
                  <td>{number}</td>
                  <td>{word}</td>
                  <td>{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
