// 周期表の配列(パズル用)
let board = [];
let question;

// 列数、行数などの設定
const COLS = 18;
const ROWS = 7;
let emptyCol = 0;
let emptyRow = 0;
let tileSize = 60;

class Element{
    constructor(name, num){
        this.name = name;
        this.num = num;
    }
}

const TABLE =[
    [new Element("H", 1), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("He", 2)],
    [new Element("Li", 3), new Element("Be", 4), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("B", 5), new Element("C", 6), new Element("N", 7), new Element("O", 8), new Element("F", 9), new Element("Ne", 10)],
    [new Element("Na", 11), new Element("Mg", 12), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("", ), new Element("Al", 13), new Element("Si", 14), new Element("P", 15), new Element("S", 16), new Element("Cl", 17), new Element("Ar", 18)],
    [new Element("K", 19), new Element("Ca", 20), new Element("Sc", 21), new Element("Ti", 22), new Element("V", 23), new Element("Cr", 24), new Element("Mn", 25), new Element("Fe", 26), new Element("Co", 27), new Element("Ni", 28), new Element("Cu", 29), new Element("Zn", 30), new Element("Ga", 31), new Element("Ge", 32), new Element("As", 33), new Element("Se", 34), new Element("Br", 35), new Element("Kr", 36)],
    [new Element("Rb", 37), new Element("Sr", 38), new Element("Y", 39), new Element("Zr", 40), new Element("Nb", 41), new Element("Mo", 42), new Element("Tc", 43), new Element("Ru", 44), new Element("Rh", 45), new Element("Pd", 46), new Element("Ag", 47), new Element("Cd", 48), new Element("In", 49), new Element("Sn", 50), new Element("Sb", 51), new Element("Te", 52), new Element("I", 53), new Element("Xe", 54)],
    [new Element("Cs", 55), new Element("Ba", 56), new Element("La", 57), new Element("Hf", 72), new Element("Ta", 73), new Element("W", 74), new Element("Re", 75), new Element("Os", 76), new Element("Ir", 77), new Element("Pt", 78), new Element("Au", 79), new Element("Hg", 80), new Element("Tl", 81), new Element("Pb", 82), new Element("Bi", 83), new Element("Po", 84), new Element("At", 85), new Element("Rn", 86)],
    [new Element("Fr", 87), new Element("Ra", 88), new Element("Ac", 89), new Element("Rf", 104), new Element("Db", 105), new Element("Sg", 106), new Element("Bh", 107), new Element("Hs", 108), new Element("Mt", 109), new Element("Ds", 110), new Element("Rg", 111), new Element("Cn", 112), new Element("Nh", 113), new Element("Fl", 114), new Element("Mc", 115), new Element("Lv", 116), new Element("Ts", 117), new Element("Og", 118)],
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

            let x = j * tileSize;
            let y = i * tileSize;

            if(!(i == emptyRow && j == emptyCol)){
                fill(255);
                stroke(0);
                rect(x, y, tileSize, tileSize);

                fill(0);
                textAlign(CENTER, CENTER);
                text(num, x + tileSize / 6, y + tileSize / 6);
                text(name, x + tileSize / 2, y + tileSize / 2);
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