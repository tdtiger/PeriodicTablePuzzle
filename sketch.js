// 周期表の配列(パズル用)
let board = [];
let question;

// 列数、行数などの設定
const COLS = 18;
const ROWS = 7;
let emptyCol = 0;
let emptyRow = 0;
let tileSize = 65;

class Element{
    constructor(name, num, name_ja){
        this.name = name;
        this.num = num;
        this.name_ja = name_ja;
    }
}

const TABLE =[
    [new Element("H", 1, "水素"), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("He", 2, "ヘリウム")],
    [new Element("Li", 3, "リチウム"), new Element("Be", 4, "ベリリウム"), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("B", 5, "ホウ素"), new Element("C", 6, "炭素"), new Element("N", 7, "窒素"), new Element("O", 8, "酸素"), new Element("F", 9, "フッ素"), new Element("Ne", 10, "ネオン")],
    [new Element("Na", 11, "ナトリウム"), new Element("Mg", 12, "マグネシウム"), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("", "", ""), new Element("Al", 13, "アルミニウム"), new Element("Si", 14, "ケイ素"), new Element("P", 15, "リン"), new Element("S", 16, "硫黄"), new Element("Cl", 17, "塩素"), new Element("Ar", 18, "アルゴン")],
    [new Element("K", 19, "カリウム"), new Element("Ca", 20, "カルシウム"), new Element("Sc", 21, "スカンジウム"), new Element("Ti", 22, "チタン"), new Element("V", 23, "バナジウム"), new Element("Cr", 24, "クロム"), new Element("Mn", 25, "マンガン"), new Element("Fe", 26, "鉄"), new Element("Co", 27, "コバルト"), new Element("Ni", 28, "ニッケル"), new Element("Cu", 29, "銅"), new Element("Zn", 30, "亜鉛"), new Element("Ga", 31, "ガリウム"), new Element("Ge", 32, "ゲルマニウム"), new Element("As", 33, "ヒ素"), new Element("Se", 34, "セレン"), new Element("Br", 35, "臭素"), new Element("Kr", 36, "クリプトン")],
    [new Element("Rb", 37, "ルビジウム"), new Element("Sr", 38, "ストロンチウム"), new Element("Y", 39, "イットリウム"), new Element("Zr", 40, "ジルコニウム"), new Element("Nb", 41, "ニオブ"), new Element("Mo", 42, "モリブデン"), new Element("Tc", 43, "テクネチウム"), new Element("Ru", 44, "ルテニウム"), new Element("Rh", 45, "ロジウム"), new Element("Pd", 46, "パラジウム"), new Element("Ag", 47, "銀"), new Element("Cd", 48, "カドミウム"), new Element("In", 49, "インジウム"), new Element("Sn", 50, "スズ"), new Element("Sb", 51, "アンチモン"), new Element("Te", 52, "テルル"), new Element("I", 53, "ヨウ素"), new Element("Xe", 54, "キセノン")],
    [new Element("Cs", 55, "セシウム"), new Element("Ba", 56, "バリウム"), new Element("La", 57, "ランタン"), new Element("Hf", 72, "ハフニウム"), new Element("Ta", 73, "タンタル"), new Element("W", 74, "タングステン"), new Element("Re", 75, "レニウム"), new Element("Os", 76, "オスミウム"), new Element("Ir", 77, "イリジウム"), new Element("Pt", 78, "白金"), new Element("Au", 79, "金"), new Element("Hg", 80, "水銀"), new Element("Tl", 81, "タリウム"), new Element("Pb", 82, "鉛"), new Element("Bi", 83, "ビスマス"), new Element("Po", 84, "ポロニウム"), new Element("At", 85, "アスタチン"), new Element("Rn", 86, "ラドン")],
    [new Element("Fr", 87, "フランジウム"), new Element("Ra", 88, "ラジウム"), new Element("Ac", 89, "アクチニウム"), new Element("Rf", 104, "ラザホージウム"), new Element("Db", 105), new Element("Sg", 106, "シーボーギウム"), new Element("Bh", 107, "ボーリウム"), new Element("Hs", 108, "ハッシウム"), new Element("Mt", 109, "マイトネリウム"), new Element("Ds", 110, "ダームスタチウム"), new Element("Rg", 111, "レントゲニウム"), new Element("Cn", 112, "コペルニシウム"), new Element("Nh", 113, "ニホニウム"), new Element("Fl", 114, "フレロビウム"), new Element("Mc", 115, "モスコビウム"), new Element("Lv", 116, "リバボリウム"), new Element("Ts", 117, "テネシン"), new Element("Og", 118, "オガネソン")],
];

function Shuffle2DArray(arr){
    let flatArray = arr.flat();
    let shuffledArray = flatArray.sort(() => Math.random() - 0.5);

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
            if(question[i][j] !== board[i][j])
                return false;
        }
    }
    return true;
}

function setup(){
    createCanvas(COLS * tileSize, ROWS * tileSize);

    let currentNum = 1;
    for(let i = 0; i < ROWS; i++){
        board[i] = [];
        for(let j = 0; j < COLS; j++){
            board[i][j] = TABLE[i][j];
            currentNum += 1;
        }
    }

    question = Shuffle2DArray(board);
    emptyCol = 17;
    emptyRow = 6;
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
            let y = i * tileSize;

            if(!(i == emptyRow && j == emptyCol)){
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
}

function mousePressed(){
    let clickedCol = floor(mouseX / tileSize);
    let clickedRow = floor(mouseY / tileSize);

    if(clickedCol < 0 || clickedCol >= COLS || clickedRow < 0 || clickedRow >= ROWS)
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
    }

    if(Check())
        window.alert("CLEAR!!");
}