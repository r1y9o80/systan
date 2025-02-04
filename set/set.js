document.addEventListener("DOMContentLoaded", () => {
    const listItems = document.querySelectorAll("header ul li");
    const selected_Index = localStorage.getItem("Index") || 0;

    listItems[selected_Index].style.borderBottom = "2px solid rgb(0, 121, 242)";
    listItems[selected_Index].scrollIntoView({ behavior: "auto", block: "center", inline: "center" });

    // リストアイテムにクリックイベントを追加
    listItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            localStorage.setItem("Index", index);
            window.location.href = `stage${index + 1}.html`;
        });
    });
});


//現在開いているHTMLの情報を取得
const learn_nuttons = document.querySelectorAll("#learn_button")?? "";
const list_button = document.querySelectorAll("#list_button")?? "";
const list = document.querySelector("../list/list.html/#tbody")?? "";

const data = require('../data.json')
list_button.addEventListener('click', (event) => {
    // data-number属性から値を取得する（文字列なので数値に変換）
    const numberValue = parseInt(event.target.dataset.number, 10);
    // 1を引いた値を計算
    const label_number = numberValue - 1;
    // ローカルストレージに保存
    localStorage.setItem("label_number", label_number);
    // 別ページにリダイレクト
    window.location.href = "../list/list.html";
});

