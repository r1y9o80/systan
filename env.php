<?php
$dsn = 'mysql:host=localhost;dbname=systandb;charset=utf8';
$db_user = 'root';
$db_pass = '';
$db_option = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // エラーモードを例外で処理
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // デフォルトで連想配列で結果を取得
];