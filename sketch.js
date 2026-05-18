// 周期表の配列(パズル用)
let board = [];
let question;

// ランタノイドとか用の配列
let subBoard = [];
let subQuestion;
let isSubActive = false;

// 列数、行数などの設定
const COLS = 18;
const ROWS = 7;
const SUB_COLS = 15;
const SUB_ROWS = 2;
let emptyCol = 0;
let emptyRow = 0;
let subEmptyCol = 0;
let subEmptyRow = 0;
let tileSize = 65;

// 各元素を表すクラス
class Element{
    constructor(name, num, name_ja){
        this.name = name;
        this.num = num;
        this.name_ja = name_ja;
    }
}

// 周期表
const TABLE =[
    [new Element("H", 1, "水素"), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("He", 2, "ヘリウム")],
    [new Element("Li", 3, "リチウム"), new Element("Be", 4, "ベリリウム"), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("B", 5, "ホウ素"), new Element("C", 6, "炭素"), new Element("N", 7, "窒素"), new Element("O", 8, "酸素"), new Element("F", 9, "フッ素"), new Element("Ne", 10, "ネオン")],
    [new Element("Na", 11, "ナトリウム"), new Element("Mg", 12, "マグネシウム"), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("Al", 13, "アルミニウム"), new Element("Si", 14, "ケイ素"), new Element("P", 15, "リン"), new Element("S", 16, "硫黄"), new Element("Cl", 17, "塩素"), new Element("Ar", 18, "アルゴン")],
    [new Element("K", 19, "カリウム"), new Element("Ca", 20, "カルシウム"), new Element("Sc", 21, "スカンジウム"), new Element("Ti", 22, "チタン"), new Element("V", 23, "バナジウム"), new Element("Cr", 24, "クロム"), new Element("Mn", 25, "マンガン"), new Element("Fe", 26, "鉄"), new Element("Co", 27, "コバルト"), new Element("Ni", 28, "ニッケル"), new Element("Cu", 29, "銅"), new Element("Zn", 30, "亜鉛"), new Element("Ga", 31, "ガリウム"), new Element("Ge", 32, "ゲルマニウム"), new Element("As", 33, "ヒ素"), new Element("Se", 34, "セレン"), new Element("Br", 35, "臭素"), new Element("Kr", 36, "クリプトン")],
    [new Element("Rb", 37, "ルビジウム"), new Element("Sr", 38, "ストロンチウム"), new Element("Y", 39, "イットリウム"), new Element("Zr", 40, "ジルコニウム"), new Element("Nb", 41, "ニオブ"), new Element("Mo", 42, "モリブデン"), new Element("Tc", 43, "テクネチウム"), new Element("Ru", 44, "ルテニウム"), new Element("Rh", 45, "ロジウム"), new Element("Pd", 46, "パラジウム"), new Element("Ag", 47, "銀"), new Element("Cd", 48, "カドミウム"), new Element("In", 49, "インジウム"), new Element("Sn", 50, "スズ"), new Element("Sb", 51, "アンチモン"), new Element("Te", 52, "テルル"), new Element("I", 53, "ヨウ素"), new Element("Xe", 54, "キセノン")],
    [new Element("Cs", 55, "セシウム"), new Element("Ba", 56, "バリウム"), new Element("La", 57, "ランタン"), new Element("Hf", 72, "ハフニウム"), new Element("Ta", 73, "タンタル"), new Element("W", 74, "タングステン"), new Element("Re", 75, "レニウム"), new Element("Os", 76, "オスミウム"), new Element("Ir", 77, "イリジウム"), new Element("Pt", 78, "白金"), new Element("Au", 79, "金"), new Element("Hg", 80, "水銀"), new Element("Tl", 81, "タリウム"), new Element("Pb", 82, "鉛"), new Element("Bi", 83, "ビスマス"), new Element("Po", 84, "ポロニウム"), new Element("At", 85, "アスタチン"), new Element("Rn", 86, "ラドン")],
    [new Element("Fr", 87, "フランジウム"), new Element("Ra", 88, "ラジウム"), new Element("Ac", 89, "アクチニウム"), new Element("Rf", 104, "ラザホージウム"), new Element("Db", 105), new Element("Sg", 106, "シーボーギウム"), new Element("Bh", 107, "ボーリウム"), new Element("Hs", 108, "ハッシウム"), new Element("Mt", 109, "マイトネリウム"), new Element("Ds", 110, "ダームスタチウム"), new Element("Rg", 111, "レントゲニウム"), new Element("Cn", 112, "コペルニシウム"), new Element("Nh", 113, "ニホニウム"), new Element("Fl", 114, "フレロビウム"), new Element("Mc", 115, "モスコビウム"), new Element("Lv", 116, "リバボリウム"), new Element("Ts", 117, "テネシン"), new Element("Og", 118, "オガネソン")],
];

const SUB_TABLE = [
    [new Element("La", 57, "ランタン"), new Element("Ce", 58, "セリウム"), new Element("Pr", 59, "プラセオジム"), new Element("Nd", 60, "ネオジム"), new Element("Pm", 61, "プロメチウム"), new Element("Sm", 62, "サマリウム"), new Element("Eu", 63, "ユウロピウム"), new Element("Gd", 64, "ガドリニウム"), new Element("Tb", 65, "テルビウム"), new Element("Dy", 66, "ジスプロシウム"), new Element("Ho", 67, "ホルミウム"), new Element("Er", 68, "エルビウム"), new Element("Tm", 69, "ツリウム"), new Element("Yb", 70, "イッテルビウム"), new Element("Lu", 71, "ルテチウム")],
    [new Element("Ac", 89, "アクチニウム"), new Element("Th", 90, "トリウム"), new Element("Pa", 91, "プロトアクチニウム"), new Element("U", 92, "ウラン"), new Element("Np", 93, "ネプツニウム"), new Element("Pu", 94, "プルトニウム"), new Element("Am", 95, "アメリシウム"), new Element("Cm", 96, "キュリーウム"), new Element("Bk", 97, "バークリウム"), new Element("Cf", 98, "カリホルニウム"), new Element("Es", 99, "アインスタイニウム"), new Element("Fm", 100, "フェルミウム"), new Element("Md", 101, "メンデレビウム"), new Element("No", 102, "ノーベリウム"), new Element("Lr", 103, "ローレンシウム")],
];

// 時間計測用
let startTime;

// クリア済みかを表すフラグ
let isCleared = false;

// 描画位置調整
let subYOffset = 520;

// 二次元配列の要素をシャッフルする関数
function Shuffle2DArray(arr){
    // 一旦一次元配列にする
    let flatArray = arr.flat();
    let shuffledArray = flatArray.sort(() => Math.random() - 0.5);

    // 二次元配列に戻す
    let result = [];
    let index = 0;
    for(let i = 0; i < arr.length; i++){
        result[i] = [];
        for(let j = 0; j < arr[i].length; j++){
            result[i][j] = shuffledArray[index];
            index += 1;
        }
    }
    return result;
}

function Check(){
    for(let i = 0; i < ROWS; i++){
        for(let j = 0; j < COLS; j++){
            if(i == emptyRow && j == emptyCol)
                continue;

            if(question[i][j].name !== board[i][j].name)
                return false;
        }
    }
    return true;
}

function CheckSub(){
    for(let i = 0; i < SUB_ROWS; i++){
        for(let j = 0; j < SUB_COLS; j++){
            if(i == subEmptyRow && j == subEmptyCol)
                continue;

            if(subQuestion[i][j].name !== subBoard[i][j].name)
                return false;
        }
    }
    return true;
}

function checkSubActive(){
    if(question[5][2].name === "La" && question[6][2].name === "Ac"){
        if(!isSubActive)
            isSubActive = true;
    }
    else
        isSubActive = false;
}

function DisplayTimer(){
    let passed = millis() - startTime;

    let totalSeconds = floor(passed / 1000);

    let hours = floor(totalSeconds / 3600);
    let minutes = floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    let timeString = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

    fill(0);
    noStroke();
    textSize(20);
    textAlign(LEFT, TOP);
    text(timeString, 10, 5);
}

function LoadGame(){
    // ローカルストレージにセーブデータがある場合はそれをロード、なかったら初期化
    let saveData = localStorage.getItem('periodicPuzzleSave');

    if(saveData){
        let data = JSON.parse(saveData);
        question = data.question;
        emptyRow = data.emptyRow;
        emptyCol = data.emptyCol;
        subQuestion = data.subQuestion;
        subEmptyRow = data.subEmptyRow;
        subEmptyCol = data.subEmptyCol;
        startTime = millis() - data.passed;
        isCleared = data.cleard || false;
    }
    else{
        question = Shuffle2DArray(board);
        subQuestion = Shuffle2DArray(subBoard);
        emptyRow = 6;
        emptyCol = 17;
        subEmptyRow = 1;
        subEmptyCol = 2;
        startTime = millis();
        isCleared = false;
        SaveGame();
    }
}

function SaveGame(){
    let currentPassed = millis() - startTime;

    let saveData = {question: question, emptyRow: emptyRow, emptyCol: emptyCol, subQuestion: subQuestion, subEmptyRow: subEmptyRow, subEmptyCol: subEmptyCol, passed: currentPassed, cleard: isCleared};

    localStorage.setItem('periodicPuzzleSave', JSON.stringify(saveData));
}

function ResetGame(){
    question = Shuffle2DArray(board);
    subQuestion = Shuffle2DArray(subBoard);
    emptyRow = 6;
    emptyCol = 17;
    isSubActive = false;
    subEmptyRow = 1;
    subEmptyCol = 2;
    startTime = millis();
    isCleared = false;
    SaveGame();
}

function setup(){
    createCanvas(COLS * tileSize, ROWS * tileSize + 30 + SUB_ROWS * tileSize + 50);

    let resetButton = createButton('盤面リセット');
    resetButton.position(180, 68);
    resetButton.mousePressed(ResetGame);
    resetButton.style('padding', '5px 10px');
    resetButton.style('background-color', '#FFFFFF');
    resetButton.style('border', '2px solid #333');
    resetButton.style('border-radius', '5px');
    resetButton.style('cursor', 'pointer');
    resetButton.mouseOver(() => {
        resetButton.style('background-color', '#f0f0f0');
    });
    resetButton.mouseOut(() => {
        resetButton.style('background-color', '#FFFFFF');
    })

    for(let i = 0; i < ROWS; i++){
        board[i] = [];
        for(let j = 0; j < COLS; j++)
            board[i][j] = TABLE[i][j];
    }

    for(let i = 0; i < SUB_ROWS; i++){
        subBoard[i] = [];
        for(let j = 0; j < SUB_COLS; j++)
            subBoard[i][j] = SUB_TABLE[i][j];
    }

    LoadGame();

    const modalOverlay = select('#modal-overlay');
    const closeModalButton = select('#modal-close');

    closeModalButton.mousePressed(() => {
        modalOverlay.style('display', 'none');
    })

    let visited = localStorage.getItem('periodicPuzzleVisited');
    if(!visited){
        modalOverlay.style('display', 'flex');
        localStorage.setItem('periodicPuzzleVisited', 'true');
    }
}

function draw(){
    // 背景の塗りつぶし
    background(220);

    for(let i = 0; i < ROWS; i++){
        for(let j = 0; j < COLS; j++){
            let name = question[i][j].name;
            let num = question[i][j].num;
            let name_ja = question[i][j].name_ja;

            let x = j * tileSize;
            let y = i * tileSize + 30;

            if(!(i == emptyRow && j == emptyCol) || isCleared){
                if(name === board[i][j].name)
                    fill(150, 255, 150);
                else
                    fill(255);

                stroke(0);
                rect(x, y, tileSize, tileSize);

                fill(0);
                textAlign(CENTER, CENTER);
                textSize(10)
                text(num, x + tileSize / 6, y + tileSize / 6);
                textSize(25)
                text(name, x + tileSize / 2, y + tileSize / 2);
                textSize(9)
                text(name_ja, x + tileSize / 2, y + tileSize - 10);
            }
        }
    }

    if(isSubActive){
        for(let i = 0; i < SUB_ROWS; i++){
            for(let j = 0; j < SUB_COLS; j++){
                let name = subQuestion[i][j].name;
                let num = subQuestion[i][j].num;
                let name_ja = subQuestion[i][j].name_ja;

                let x = j * tileSize;
                let y = i * tileSize + subYOffset;

                if(!(i == subEmptyRow && j == subEmptyCol) || CheckSub()){
                    if(name === subBoard[i][j].name)
                        fill(150, 255, 150);
                    else
                        fill(255);

                    stroke(0);
                    rect(x, y, tileSize, tileSize);

                    fill(0);
                    textAlign(CENTER, CENTER);
                    textSize(10)
                    text(num, x + tileSize / 6, y + tileSize / 6);
                    textSize(25)
                    text(name, x + tileSize / 2, y + tileSize / 2);
                    textSize(9)
                    text(name_ja, x + tileSize / 2, y + tileSize - 10);
                }
            }
        }
    }

    DisplayTimer();
}

function mousePressed(){
    if(isSubActive && mouseY >= subYOffset){
        let clickedCol = floor(mouseX / tileSize);
        let clickedRow = floor((mouseY - subYOffset) / tileSize);
        
        if(clickedCol < 0 || clickedCol >= SUB_COLS || clickedRow < 0 || clickedRow >= SUB_ROWS)
            return;

        let movable = false;
        if((clickedCol == subEmptyCol && abs(clickedRow - subEmptyRow) === 1) || (clickedRow === subEmptyRow && abs(clickedCol - subEmptyCol) === 1))
            movable = true;

        if(movable){
            let tmp = subQuestion[clickedRow][clickedCol];
            subQuestion[clickedRow][clickedCol] = subQuestion[subEmptyRow][subEmptyCol];
            subQuestion[subEmptyRow][subEmptyCol] = tmp;

            subEmptyCol = clickedCol;
            subEmptyRow = clickedRow;

            SaveGame();
        }

        if(CheckSub()){
            subQuestion[subEmptyRow][subEmptyCol] = subBoard[subEmptyRow][subEmptyCol];
            SaveGame();
            window.alert("サブパズルもクリア!!");
        }
    }
    else{
        let clickedCol = floor(mouseX / tileSize);
        let clickedRow = floor((mouseY - 30) / tileSize);

        if(isCleared || clickedCol < 0 || clickedCol >= COLS || clickedRow < 0 || clickedRow >= ROWS)
            return;

        let movable = false;
        if((clickedCol == emptyCol && abs(clickedRow - emptyRow) === 1) || (clickedRow === emptyRow && abs(clickedCol - emptyCol) === 1))
            movable = true;

        if(movable){
            let tmp = question[clickedRow][clickedCol];
            question[clickedRow][clickedCol] = question[emptyRow][emptyCol];
            question[emptyRow][emptyCol] = tmp;

            emptyCol = clickedCol;
            emptyRow = clickedRow;

            checkSubActive();
            SaveGame();
        }
    }

    if(Check()){
        // 空きマスに欠落していた元素を当てはめる
        question[emptyRow][emptyCol] = board[emptyRow][emptyCol];
        isCleared = true;
        SaveGame();
        window.alert("CLEAR!!\n\mもう一度遊びたい場合は、「盤面リセット」ボタンを押してください。");
    }
}