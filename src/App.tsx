import { auth } from "./firebase.ts";
import { useAuthState } from 'react-firebase-hooks/auth';
import { RecoilRoot } from "recoil";
import { useRecoilValue } from "recoil";
import { sectionState } from "./states/section.ts";
import { Home } from "./Home/Home.tsx";
import { Kuizu } from "./kuizu/kuizu.tsx";
import { Result } from "./result/result.tsx";
import { List } from "./list/list.tsx";
import { SignIn } from "./signIn/SignIn.tsx";
import { Setting } from "./Setting/Setting.tsx";
import { Maint } from "./maintenance/maintenance.tsx";

function App() {
  const in_maintenance = true;
  const [user] = useAuthState(auth);
  const section: string = useRecoilValue(sectionState);
  
  if(in_maintenance) return <Maint />
  if(!user) return <SignIn />
  return (
    <>
        <>
          {section === "home" && <Home />}
          {section === "setting" && <Setting/>}
          {section === "kuizu" && <Kuizu />}
          {section === "result" && <Result />}
          {section === "list" && <List />}
        </>
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
