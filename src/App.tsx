import { useState } from "react";
import { auth } from "./firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { RecoilRoot, useRecoilValue } from "recoil";
import { sectionState } from "./states/section.ts";
import { Home } from "./Home/Home.tsx";
import { Kuizu } from "./kuizu/kuizu.tsx";
import { Result } from "./result/result.tsx";
import { List } from "./list/list.tsx";
import { Test } from "./test/test.tsx";
import { SignIn } from "./signIn/SignIn.tsx";
import { Setting } from "./Setting/Setting.tsx";
import { GetUserData } from "./getUserData.tsx";
import { TestResult } from "./testResult/testResult.tsx";
import { TestIntro } from "./testIntro/testIntro.tsx";

function AppContent({ logOut }: { logOut: () => Promise<void> }) {
  const [user] = useAuthState(auth);
  const section: string = useRecoilValue(sectionState);
  if (!user) return <SignIn />;

  return (
    <>
      <GetUserData />
      {section === "home" && <Home />}
      {section === "setting" && <Setting logOut={logOut} />}
      {section === "kuizu" && <Kuizu />}
      {section === "result" && <Result />}
      {section === "list" && <List />}
      {section === "testIntro" && <TestIntro />}
      {section === "test" && <Test />}
      {section === "testResult" && <TestResult />}
    </>
  );
}

export default function App() {
  const [recoilKey, setRecoilKey] = useState(0);

  const logOut = async () => {
    await auth.signOut();
    setRecoilKey((prev) => prev + 1); // RecoilRootをkeyで再生成し状態をリセット
  };

  return (
    <RecoilRoot key={recoilKey}>
      <AppContent logOut={logOut} />
    </RecoilRoot>
  );
}
