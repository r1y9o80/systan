<?php
require_once '../env.php';

try {
    $pdo = new PDO($dsn, $db_user, $db_pass, $db_option);
    if ($_POST) {
        $user_id = $_POST["id"] ?? '';
        $user_pw = $_POST["pw"] ?? '';
        $user_pw_con = $_POST["pw_confirm"] ?? '';
        if (preg_match('/^[a-zA-Z0-9]{4,10}$/', $user_id) &&
        preg_match('/^[a-zA-Z0-9]{4,15}$/', $user_pw) &&
        $user_pw == $user_pw_con){
            // パスワードをハッシュ化
            $hashed_pw = password_hash($user_pw, PASSWORD_DEFAULT);

            // SQL実行
            $sql = $pdo->prepare("INSERT INTO user_data (id, pw) VALUES (?, ?)");
            $sql->execute([$user_id, $hashed_pw]);

            // 登録完了後にリダイレクト
            header("Location: ../Home/Home.php");
            exit();
        }
    }
} catch (PDOException $e) {
    if ($e->getCode() === "23000") { // 一意制約違反
        $error_content = "そのIDは使用出来ません";
    } else {
        $error_content = "処理に失敗しました: " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>シスタンクイズ-ユーザー登録</title>
    <link rel="stylesheet" href="register_styles.css">
    <link rel="stylesheet" href="../reset.css">
</head>
<body>
    <header class="header">
        <img src="../imgs/systan.png" alt="シスタンクイズのロゴ" class="logo">
        <h1>シスタンクイズ</h1>
    </header>
    <div class="form_div">
        <form action="" method="POST" class="form">
            <h4 class="form_title">ユーザー登録</h4>
            <fieldset>
                <label class="form_text" for="id">ID(名前)を入力(最大10文字)</label>
                <input id="id" name="id" type="text" placeholder="ID">
                <div class="error_div">
                    <p for = "id" class="error" id="id_error"></p>
                </div>
            </fieldset>
            <fieldset>
                <label class="form_text" for="pw">パスワード(4文字以上15文字以内)</label>
                <input id="pw" name="pw" type="password" placeholder="パスワード">
                <div class="error_div">
                    <p class="error" id="pw_error"></p>
                </div>
            </fieldset>
            <fieldset>
                <label class="form_text" for="pw_confirm">パスワード確認</label>
                <input id="pw_confirm" name="pw_confirm" type="password" placeholder="パスワード確認">
            </fieldset>
            <button id="loginButton" type="submit" class="button">登録</button>
        </form>
    </div>
    <!-- <footer>
        <ul>
            <li>ユーザー情報はテキトーに管理しています</li>
            <li>情報漏洩しないことを期待しないでください</li>
        </ul>
    </footer> -->
</body>
<script>
    document.querySelector(".form").addEventListener('submit', (event) => {
        const input_id = document.querySelector("#id").value;
        const input_pw = document.querySelector("#pw").value;
        const input_pw_confirm = document.querySelector("#pw_confirm").value;
        const id_error = document.querySelector("#id_error");
        const pw_error = document.querySelector("#pw_error");

        let hasError = false;
        
        // IDのバリデーション
        if (!/^[a-zA-Z0-9]{4,10}$/.test(input_id)) {
            event.preventDefault();
            id_error.textContent = ""
            setTimeout(()=>{id_error.textContent = "id条件を満たしていません"},100);
            hasError = true;
        } else {
            id_error.textContent = "";
        }

        // パスワードのバリデーション
        if (!/^[a-zA-Z0-9]{4,15}$/.test(input_pw)) {
            event.preventDefault();
            pw_error.textContent = ""
            setTimeout(()=>{pw_error.textContent = "pw条件を満たしていません"},100);
            hasError = true;
        } else if (input_pw !== input_pw_confirm) {
            event.preventDefault();
            pw_error.textContent = ""
            setTimeout(()=>{pw_error.textContent = "パスワードが一致しません"},100);
            hasError = true;
        } else {
            pw_error.textContent = "";
        }

        // エラーがある場合はフォーム送信をブロック
        if (hasError) {
            event.preventDefault();
        }
    });
</script>
</html>
