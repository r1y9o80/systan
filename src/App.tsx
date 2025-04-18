import { RecoilRoot } from "recoil";
import { useRecoilValue } from "recoil";
import { sectionState } from "./states/section.ts";
import Setting from "./setting/setting";

function App() {
  const section: string = useRecoilValue(sectionState);

  return (
    <>
      {section === "setting" && <Setting />}
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
