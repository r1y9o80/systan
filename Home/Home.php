<?php
require_once '../env.php';
$error_content = "";

try {
    $pdo = new PDO($dsn, $db_user, $db_pass, $db_option);
    
    //もし、POSTで返されたら、ID,PWの一致を確認
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $user_id = $_POST["id"] ?? '';
        $user_pw = $_POST["pw"] ?? '';
        // SQLから、入力したIDの人のパスワードを取得(SELECTでヒット項目がなければ"")
        $sql = $pdo->prepare("SELECT pw FROM user_data WHERE BINARY id = ?");
        $sql->execute([$user_id]);
        $get_pw = $sql->fetch(PDO::FETCH_ASSOC);

        // 入力IDに対するパスワードが、入力PWと一致するか検知(SELECTでヒット項目がなければ"")
        if ($get_pw && password_verify($user_pw, $get_pw['pw'])) {
            $error_content = "";
            header("Location: ../set/stage1.html");
            exit();
        //パスワードかIDが違ったとき
        } else {
            $error_content = "パスワードまたはIDが違います";
        }
    }

} catch (PDOException $e) {
    $error_content = "処理に失敗しました: " . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8');
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>シスタンクイズ - ユーザー登録</title>
    <link rel="stylesheet" href="Home_styles.css">
    <link rel="stylesheet" href="../reset.css">
</head>
<body>
    <header class="header">
        <img src="../imgs/systan.png" alt="シスタンクイズのロゴ" class="logo">
        <h1>シスタンクイズ</h1>
    </header>
    
    <div class="form_div">
        <h4 class="form_title">ログイン</h4>
        <form action="" method="POST" class="form">
            <?php if ($error_content): ?>
                <div id="error_message" class="error_message" style = display:none><?php echo htmlspecialchars($error_content); ?></div>
                <script>
                    setTimeout(() => {
                        document.getElementById('error_message').style.display = 'block';
                    }, 100);
                </script>
            <?php endif; ?>
            <fieldset>
                <label class="form_text" for="id">ID(4文字以上10文字以内)</label>
                <input class = "input" id="id" name="id" type="text" placeholder="ID">
                <div class="error_div">
                    <p for = "id" class="error" id="id_error"></p>
                </div>
            </fieldset>
            <fieldset>
                <label class="form_text" for="pw">パスワード(4文字以上15文字以内)</label>
                <input class = "input" id="pw" name="pw" type="password" placeholder="パスワード">
                <div class="error_div">
                    <p class="error" id="pw_error"></p>
                </div>
            </fieldset>
            <button id="loginButton" type="submit" class="button">登録</button>
            <a href="../register/register.php" class="register_href">新規登録</a>
        </form>
    </div>

    <footer>
        <ul>
            <li>これは、システム英単語に対応した、英単語クイズアプリです。インプットに使うもよし、アウトプットに使うもよし、これを使って効率よく単語を覚えましょう!!</li>
            <li>情報漏洩しないことを期待しないでください</li>
        </ul>
    </footer>

    <script>
        document.querySelector(".form").addEventListener('submit', (event) => {
            const input_id = document.querySelector("#id").value;
            const input_pw = document.querySelector("#pw").value;
            const id_error = document.querySelector("#id_error");
            const pw_error = document.querySelector("#pw_error");

            let hasError = false;

            // IDのバリデーション
            if (!/^[a-zA-Z0-9]{4,10}$/.test(input_id)) {
                event.preventDefault();
                id_error.textContent = "";
                setTimeout(() => { id_error.textContent = "id条件を満たしていません"; }, 100);
                hasError = true;
            } else {
                id_error.textContent = "";
            }

            // パスワードのバリデーション
            if (!/^[a-zA-Z0-9]{4,15}$/.test(input_pw)) {
                event.preventDefault();
                pw_error.textContent = "";
                setTimeout(() => { pw_error.textContent = "pw条件を満たしていません"; }, 100);
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
</body>
</html>
