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

// 移動アニメーション用パラメータ
let slide = null;
const SLIDE_DURATION = 150;

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
let clearedTime = null;

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

// ランタノイド・アクチノイド盤面用のシャッフル関数
function ShuffleSubPuzzle(){
    subQuestion = subBoard.map(row => row.slice());

    subEmptyRow = Math.floor(Math.random() * SUB_ROWS);
    subEmptyCol = Math.floor(Math.random() * SUB_COLS);

    // 直前の空きマスの位置を保管する変数
    let previousRow = -1;
    let previousCol = -1;

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // 適当に配置するだけでは詰み盤面が生成されうるので、完成状態から1000回動かす
    for(let step = 0; step < 1000 || CheckSub(); step++){
        let candidates = [];

        // 移動可能な方向を抽出
        for(let [dr, dc] of directions){
            let row = subEmptyRow + dr;
            let col = subEmptyCol + dc;

            if(row < 0 || row >= SUB_ROWS || col < 0 || col >= SUB_COLS){
                continue;
            }

            candidates.push({row: row, col: col});
        }

        // 移動方向をランダムに決定し、空きマスと交換
        let next = candidates [Math.floor(Math.random() * candidates.length)];
        let tmp = subQuestion[next.row][next.col];
        subQuestion[next.row][next.col] = subQuestion[subEmptyRow][subEmptyCol];
        subQuestion[subEmptyRow][subEmptyCol] = tmp;

        previousRow = subEmptyRow;
        previousCol = subEmptyCol;

        subEmptyRow = next.row;
        subEmptyCol = next.col;
    }
}

// メイン盤面のチェック
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

// ランタノイド・アクチノイド盤面のチェック
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

// ランタノイド・アクチノイド盤面を表示するかのチェック
function checkSubActive(){
    if(isSubActive){
        return;
    }

    let missingName = question[emptyRow][emptyCol].name;
    let laReady = missingName === "La" || question[5][2].name === "La";
    let acReady = missingName === "Ac" || question[6][2].name === "Ac";
    if(laReady && acReady){
        isSubActive = true;
    }
}

function getPassedTime(){
    if(clearedTime !== null){
        return clearedTime;
    }

    return millis() - startTime;
}

function DisplayTimer(){
    let passed = getPassedTime();

    // 取得はミリ秒なので補正
    let totalSeconds = floor(passed / 1000);

    let hours = floor(totalSeconds / 3600);
    let minutes = floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    let timeString = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

    // HTML内の時間表示を直接書き換える
    select('#timer').html(timeString);
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
        isSubActive = data.isSubActive || false;
        checkSubActive();
        slide = null;
        startTime = millis() - data.passed;
        isCleared = data.cleard || false;
        clearedTime = isCleared ? data.passed : null;

    }
    else{
        ResetGame();
        return;
    }
}

function SaveGame(){
    let saveData = {
        question: question, emptyRow: emptyRow, emptyCol: emptyCol, subQuestion: subQuestion, subEmptyRow: subEmptyRow, subEmptyCol: subEmptyCol, 
        passed: getPassedTime(), cleard: isCleared, isSubActive: isSubActive
    };

    localStorage.setItem('periodicPuzzleSave', JSON.stringify(saveData));
}

function ResetGame(){
    slide  = null;
    question = Shuffle2DArray(board);
    ShuffleSubPuzzle();
    emptyRow = 6;
    emptyCol = 17;
    isSubActive = false;
    startTime = millis();
    isCleared = false;
    clearedTime = null;
    checkSubActive();
    SaveGame();
}

function setup(){
    let canvas = createCanvas(COLS * tileSize, ROWS * tileSize + 30 + SUB_ROWS * tileSize + 50);
    // .parentで、指定した要素の中に入れることができる
    canvas.parent('board-container');

    let resetButton = createButton('盤面リセット');
    resetButton.parent('game-controls');
    resetButton.id('reset-button');
    resetButton.mousePressed(ResetGame);

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

// 空きマス描画用
function drawEmpty(x, y){
    push();

    fill(80, 90, 105);
    noStroke();
    rect(x, y, tileSize, tileSize);

    noFill();
    stroke(230, 235, 245);
    strokeWeight(2);
    rect(x + 3, y + 3, tileSize - 6, tileSize - 6);

    pop();
}

// 移動アニメーション描画
function drawSlide(){
    if(slide === null){
        return;
    }

    let s = slide;

    let puzzle = s.isSub ? subQuestion : question;
    let answer = s.isSub ? subBoard : board;
    let yOffset = s.isSub ? subYOffset : 30;

    let progress = constrain((millis() - s.startedAt) / SLIDE_DURATION, 0, 1);
    let eased = 1 - (1 - progress) * (1 - progress);

    // 移動中における座標計算
    let x = lerp(s.fromCol * tileSize, s.toCol * tileSize, eased);
    let y = lerp(s.fromRow * tileSize + yOffset, s.toRow * tileSize + yOffset, eased);

    let piece = puzzle[s.fromRow][s.fromCol];

    push();

    if(piece.name === answer[s.fromRow][s.fromCol].name){
        fill(180, 240 ,180);
    }
    else{
        fill(255);
    }
    stroke(0);
    strokeWeight(1);
    rect(x, y, tileSize, tileSize);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(10);
    text(piece.num, x + tileSize / 6, y + tileSize / 6);
    textSize(25);
    text(piece.name, x + tileSize / 2, y + tileSize / 2);
    textSize(8);
    text(piece.name_ja, x + tileSize / 2, y + tileSize - 10);

    pop();

    if(progress >= 1){
        s.finished = true;
    }
}

function draw(){
    updateSlide();

    // 背景の塗りつぶし
    background(220);

    for(let i = 0; i < ROWS; i++){
        for(let j = 0; j < COLS; j++){
            let name = question[i][j].name;
            let num = question[i][j].num;
            let name_ja = question[i][j].name_ja;

            let x = j * tileSize;
            let y = i * tileSize + 30;

            // 移動中のマスはこの関数では扱わない
            if(slide !== null && !slide.isSub && i === slide.fromRow && j == slide.fromCol){
                drawEmpty(x, y);
                continue;
            }

            if(i == emptyRow && j == emptyCol && !isCleared){
                drawEmpty(x, y);
            }

            if(!(i == emptyRow && j == emptyCol) || isCleared){
                if(name === board[i][j].name)
                    fill(180, 240 ,180);
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
                textSize(8)
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

                if(slide !== null && slide.isSub && i === slide.fromRow && j === slide.fromCol){
                    drawEmpty(x, y);
                    continue;
                }

                if(i == subEmptyRow && j == subEmptyCol && !CheckSub()){
                    drawEmpty(x, y);
                }

                if(!(i == subEmptyRow && j == subEmptyCol) || CheckSub()){
                    if(name === subBoard[i][j].name)
                        fill(180, 240 ,180);
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
                    textSize(8)
                    text(name_ja, x + tileSize / 2, y + tileSize - 10);
                }
            }
        }
    }
    drawSlide();
    DisplayTimer();
}

function updateSlide(){
    if(slide === null || !slide.finished){
        return;
    }

    let s = slide;
    let puzzle = s.isSub ? subQuestion : question;

    let tmp = puzzle[s.fromRow][s.fromCol];
    puzzle[s.fromRow][s.fromCol] = puzzle[s.toRow][s.toCol];
    puzzle[s.toRow][s.toCol] = tmp;

    slide = null;

    if(s.isSub){
        subEmptyRow = s.fromRow;
        subEmptyCol = s.fromCol;

        let subCleared = CheckSub();
        if(subCleared){
            subQuestion[subEmptyRow][subEmptyCol] = subBoard[subEmptyRow][subEmptyCol];
        }

        SaveGame();

        if(subCleared){
            Window.alert("サブパズルクリア！");
        }

        return;
    }

    emptyRow = s.fromRow;
    emptyCol = s.fromCol;

    if(Check()){
        question[emptyRow][emptyCol] = board[emptyRow][emptyCol];
        isCleared = true;
        clearedTime = millis() - startTime;
    }

    checkSubActive();
    SaveGame();
    
    if(isCleared){
        window.alert("CLEAR!!");
    }
}

function mousePressed(){
    // 移動アニメーション中は受付拒否
    if(slide !== null){
        return;
    }

    // ランタノイド、アクチノイド側の操作
    if(isSubActive && mouseY >= subYOffset){
        if(CheckSub()){
            return;
        }

        let clickedCol = floor(mouseX / tileSize);
        let clickedRow = floor((mouseY - subYOffset) / tileSize);
        
        if(clickedCol < 0 || clickedCol >= SUB_COLS || clickedRow < 0 || clickedRow >= SUB_ROWS)
            return;

        let movable = false;
        if((clickedCol == subEmptyCol && abs(clickedRow - subEmptyRow) === 1) || (clickedRow === subEmptyRow && abs(clickedCol - subEmptyCol) === 1))
            movable = true;

        if(movable){
            slide = {
                isSub: true, fromRow: clickedRow, fromCol: clickedCol, toRow: subEmptyRow, toCol: subEmptyCol,
                startedAt: millis(), finished: false
            };
        }
    }
    // メイン側の操作
    else{
        let clickedCol = floor(mouseX / tileSize);
        let clickedRow = floor((mouseY - 30) / tileSize);

        if(isCleared || clickedCol < 0 || clickedCol >= COLS || clickedRow < 0 || clickedRow >= ROWS)
            return;

        let movable = false;
        if((clickedCol == emptyCol && abs(clickedRow - emptyRow) === 1) || (clickedRow === emptyRow && abs(clickedCol - emptyCol) === 1))
            movable = true;

        // クリックしたマスの移動処理に必要な情報を保存
        if(movable){
            slide = {
                isSub: false, fromRow: clickedRow, fromCol: clickedCol, toRow: emptyRow, toCol: emptyCol,
                startedAt: millis(), finished: false
            };
        }
    }
}