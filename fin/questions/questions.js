let result = JSON.parse(localStorage.getItem('Result'));
const table = document.getElementById("questions");


result.sort((x, y) => x[0] - y[0]); // 最初の要素で比較してソート

console.log(result)

fetch('../../data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        for (let i = 0; i < result.length; i++) { 
            const tr = document.createElement("tr");
            for (let g = 0; g < 4; g++) {
                const td = document.createElement("td");
                if (g === 0) {
                    td.textContent = result[i][0]; // resultの要素を表示
                } 
                if (g === 1) {
                    td.textContent = data[result[i][0]] && data[result[i][0]][0] ? String(data[result[i][0]][0]) : "データなし"; // データ存在確認
                } 
                if (g === 2) {
                    td.textContent = data[result[i][0]] && data[result[i][0]][1] ? String(data[result[i][0]][1]) : "データなし"; // データ存在確認
                } 
                if (g === 3) {
                    // "0"の場合は "〇"、"1" の場合は "ｘ"
                    td.textContent = result[i][1] === 0 ? "〇" : "ｘ";
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    })
    .catch(error => {
        console.log("データの取得に失敗しました:", error);  // エラーメッセージを表示
    });
