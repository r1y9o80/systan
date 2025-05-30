import { auth } from "./firebase.ts";
import { useAuthState } from 'react-firebase-hooks/auth';
import { RecoilRoot } from "recoil";
import { useRecoilValue } from "recoil";
import { sectionState } from "./states/section.ts";
import { Setting } from "./Home/Home.tsx";
import { Kuizu } from "./kuizu/kuizu.tsx";
import { Result } from "./result/result.tsx";
import { List } from "./list/list.tsx";
import { SignIn } from "./signIn/SignIn.tsx";

function App() {
  const [user] = useAuthState(auth);
  const section: string = useRecoilValue(sectionState);

  return (
    <>
      {user ? (
        <>
          {section === "setting" && <Setting />}
          {section === "kuizu" && <Kuizu />}
          {section === "result" && <Result />}
          {section === "list" && <List />}
        </>
      ) : (
        <SignIn />
      )}
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
