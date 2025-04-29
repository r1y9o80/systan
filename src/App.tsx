import { RecoilRoot } from "recoil";
import { useRecoilValue } from "recoil";
import { sectionState } from "./states/section.ts";
import { Setting } from "./setting/setting.tsx";
import { Kuizu } from "./kuizu/kuizu.tsx"
import { Result } from "./result/result.tsx";

function App() {
  const section: string = useRecoilValue(sectionState);

  return (
    <>
      {section === "setting" && <Setting />}
      {section === "kuizu" && <Kuizu />}
      {section === "result" && <Result />}
    </>
  );
}

// Wrap the App component with RecoilRoot
export default function AppWithRecoilRoot() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}
