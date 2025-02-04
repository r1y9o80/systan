const word = document.querySelectorAll("#word");
const True_False = document.getElementById("True_False");
const kuizu = document.getElementById("kuizu");
const mode_ch = document.getElementById("mode_ch");
let list = [];
let nums = [];
let num = -1;
const word_B = document.querySelectorAll(".word_B");
const Load_nums = JSON.parse(localStorage.getItem('save_nums')); // ローカルストレージから取得
let random_B=0
const button_num=6
let T=0
let result=[]
let mode_data=false
let mode=0

//リストを混ぜる関数
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 要素を入れ替える
    }
    return array;
};

const make_choices=()=>{
    const randomNumbers = Array.from({ length: button_num }, () => Math.floor(Math.random() * 2026) + 1);
    if(randomNumbers.includes([Load_nums[num]])){
        make_choices()
    }
    return randomNumbers
}

//data.jsonからシスタンのデータを取得、クイズ問題を表示(word_show())
fetch('../data.json')
    .then(response => response.json())
    .then(data => {
        list = data;
        word_show(); // 画面が立ち上がった時に実行
    })
    .catch(error => {
        console.log("データの取得に失敗しました:", error);  // エラーメッセージを表示
    });

// word_show関数
const word_show = () => {
    word_B[random_B].style="color:black; border: 1px solid black;"
    True_False.textContent=""
    T=0
    num += 1;//(1,2,3,4..回目で0,1,2,3と増える)
    if (num < Load_nums.length) {//問題がまだあるか判定
        word[0].textContent = list[Load_nums[num]][0]; //　英語を表示
        word[1].textContent =(num+1)+"/"+Load_nums.length;
        randomNumbers=make_choices()
        for(let i = 0;i<button_num;i++){
            word_B[i].textContent=list[randomNumbers[i]][1]
        }//それぞれのボタンにランダムな答え
        random_B=Math.floor(Math.random() * button_num)//答えのボタンindex作成。worldで別関数にも使う
        word_B[random_B].textContent=list[Load_nums[num]][1]//ランダムな１個に正しい答えを
    } 
    else {
        localStorage.setItem('Result', JSON.stringify(result));
        window.location.href = "../fin/fin.html";//問題が終わったらページ移動
    }
}


//ボタンを押すと、正誤を判断=>新しい問題ロード
word_B.forEach((button, index) => {
    button.addEventListener("click", () => {
        if(mode==0){
            if(T==0){
                if(index==random_B){
                    T=99999
                    True_False.scr="img/True"
                    True_False.textContent="〇"
                    True_False.style="color:red"
                    word_B[random_B].style="color:red; border: 2px solid blue;"
                    result.push([Load_nums[num],0])
                    const audio = new Audio("mp/correct.mp3");
                    audio.play();
                    window.setTimeout(()=>T=1,200)
                }
                else{
                    T=99999
                    True_False.textContent="✕"
                    True_False.style="color:blue"
                    word_B[random_B].style="color:red; border: 2px solid blue;"
                    result.push([Load_nums[num],1])
                    const audio = new Audio("mp/incorrect.mp3");
                    audio.play();
                    window.setTimeout(()=>T=1,200)
                }
            }
        }
    })
})

kuizu.addEventListener("click", () => {
    if(T==1) word_show()
})

document.addEventListener('change', function() {
    mode_data=mode_ch.checked
    if (mode_data==true){

    }
    else{
        
    }
});
