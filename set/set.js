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
