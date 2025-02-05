document.addEventListener("DOMContentLoaded", async () => {
    const start_number = parseInt(localStorage.getItem("start_number")); // 押されたリストボタンが何個目を取得しスタート番号を計算した値
    const tbody = document.querySelector("tbody");

    try {
        // JSONデータをフェッチして待つ
        const response = await fetch("../data.json");
        const data = await response.json();  // 正しくjsonメソッドを使う

        console.log(start_number);  // 確認用
        console.log(data);

        // 要素を追加
        let element = "";
        for (let i = 0; i < 20; i++) {
            element += `
                <tr>
                    <td>${start_number + i}</td><td>${data[start_number + i][0]}</td><td>${data[start_number + i][1]}</td>
                </tr>
            `;
        }

        tbody.innerHTML = element;
    } catch (error) {
        console.error("データの読み込みに失敗しました:", error);
    }
});
