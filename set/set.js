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


    // 現在開いているHTMLの情報を取得
    const learn_buttons = document.querySelectorAll(".learn_button");
    const list_buttons = document.querySelectorAll(".list_button");

    // ボタンの共通処理
    function handleButtonClick(buttons, href) {
        buttons.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                // そのレベル番号
                const numberValue = parseInt(event.target.dataset.number, 10);
                // そのレベルの最初の問題番号
                const start_number = (numberValue - 1) * 20 + 1;
                console.log(start_number)
                localStorage.setItem("start_number", start_number);
                window.location.href = href;
            });
        });
    }

    // 各ボタンの処理
    handleButtonClick(learn_buttons, "../kuizu/kuizu.html");
    handleButtonClick(list_buttons, "../list/list.html");


});

