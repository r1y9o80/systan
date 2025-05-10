import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.ts";  //正直、auth = getAuth()のほうが柔軟

const buttton_div_style = {
  display:"flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100svh",
  width: "100svw"
}

const button_style = {
  backgroundColor: "rgb(75, 75, 248)",
  height: "50px",
  width: "200px",
  borderRadius: "5px",
  fontSize: "17px",
  color: "white",
}

export const SignIn = () => {
  function SignInWithGoogle() {
    const provider = new GoogleAuthProvider();
    
    //安全確認を行う
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    
    //「メールアドレスが違います」なんかの文字を特定の言語に(it=イタリア語)
    //auth.languageCode = 'it'

    //メールアドレスの自動入力
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });
    
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .catch((error) => {
        console.error("Googleサインインに失敗しました:", error);
      });
  }

  return (
    <div style={buttton_div_style}>
      <button style={button_style} onClick={SignInWithGoogle}>ログイン</button>
    </div>
  );
};
