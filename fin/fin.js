const result_id = document.querySelectorAll("#result");
const result=JSON.parse(localStorage.getItem('Result'));
console.log(result)

const c_l=(result.filter((num)=> {return num[1] == 0})).length

const inc_l=result.length-c_l

result_id[0].textContent=c_l
result_id[1].textContent=inc_l


const to_Home = (url) => window.location.href = url;

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 要素を入れ替える
    }
    return array;
};

miss_kuizu=(url)=>{
    b=result.filter((num)=> {return num[1] == 1})
    if(b.length!=0){
        let ques=b.map((i)=>{return i[0]})
        shuffleArray(ques)
        localStorage.setItem('save_nums', JSON.stringify(ques)); // 配列を保存
        window.location.href = url;  // ページ遷移
    }
    else{
        window.location.href = "../Home/Home.html";  // ページ遷移
    }
}