///////////////////////Main Section////////////////////////////////
//Initials variables
let btnElement: string = ' <button onclick="nextTurn()">click me</button>';
let isGameOver: boolean = false;
let isTieGame: boolean = false;
let tempStr: string = "<br/>";
let mat: Array<Array<Cell>> = [
    [new Cell(1), new Cell(2), new Cell(3)],
    [new Cell(4), new Cell(5), new Cell(6)],
    [new Cell(7), new Cell(8), new Cell(9)]
];
///////////display game first Time
for (let i: number = 0; i < mat.length; i++) {
    for (let j: number = 0; j < mat[i].length; j++) {
        tempStr += "&nbsp;" + setPlaceFn(mat[i][j]) + "&nbsp;|";
    }
    tempStr += "<br/>----------<br/>";
}
document.write(tempStr);
///////////////////////Function Section////////////////////////////////
function setPlaceFn(cell: Cell): string {
    if (cell.isTaken)
        return cell.shape;
    else return cell.displayNumber.toString();
}
function nextTurn(): void {
    //alert("hello");
    if (isGameOver || isTieGame)
        return;
    let tempStr: string = "<br/>";
    let positionnumber = Number(prompt("Enter your move:"));
    let currentCell: Cell = new Cell(positionnumber);
    let matCell: Cell = currentCell;
    if (currentCell.isValidNumber == true)
        matCell = mat[currentCell.cellRow][currentCell.cellColumn];
    //Check for valid number and open position
    while (currentCell.messageToPlayer != "" || matCell.isTaken == true) {
        let messagePartOne: string = currentCell.messageToPlayer != "" ? currentCell.messageToPlayer : `Position ${positionnumber} is already taken\n`;
        positionnumber = Number(prompt(`${messagePartOne}Enter your move:`));
        currentCell = new Cell(positionnumber);
    }
    mat[currentCell.cellRow][currentCell.cellColumn].isTaken = true;
    mat[currentCell.cellRow][currentCell.cellColumn].shape = "X";
    if (checkForTieGameFn()) {
        for (let i: number = 0; i < mat.length; i++) {
            for (let j: number = 0; j < mat[i].length; j++) {
                tempStr += "&nbsp;" + setPlaceFn(mat[i][j]) + "&nbsp;|";
            }
            tempStr += "<br/>----------<br/>";
        }
        document.write(tempStr + btnElement);
        isTieGame = true;
        alert("Tie Game Nobody Wins");
        return;
    }
    nextMoveForComputer();
    for (let i: number = 0; i < mat.length; i++) {
        for (let j: number = 0; j < mat[i].length; j++) {
            tempStr += "&nbsp;" + setPlaceFn(mat[i][j]) + "&nbsp;|";
        }
        tempStr += "<br/>----------<br/>";
    }
    document.write(tempStr + btnElement);
    CheckComplete("X");
    if (isGameOver == false && isTieGame == false)
        CheckComplete("O");
}
function nextMoveForComputer(): void {
    let shapeArray: Array<string> = new Array<string>("O", "X");
    for (let shape of shapeArray) { //First try to win with O shape
        //if not win, try to block in the next iteration
        for (let i: number = 0; i <= 2; i++) {
            //Row Test
            if (mat[i][0].shape == shape && mat[i][1].shape == shape && mat[i][2].isTaken == false) {
                mat[i][2].isTaken = true;
                mat[i][2].shape = "O";
                return;
            }
            else if (mat[i][1].shape == shape && mat[i][2].shape == shape && mat[i][0].isTaken == false) {
                mat[i][0].isTaken = true;
                mat[i][0].shape = "O";
                return;
            }
            else if (mat[i][0].shape == shape && mat[i][2].shape == shape && mat[i][1].isTaken == false) {
                mat[i][1].isTaken = true;
                mat[i][1].shape = "O";
                return;
            }
            //Column Test
            else if (mat[0][i].shape == shape && mat[1][i].shape == shape && mat[2][i].isTaken == false) {
                mat[2][i].isTaken = true;
                mat[2][i].shape = "O";
                return;
            }
            else if (mat[1][i].shape == shape && mat[2][i].shape == shape && mat[0][i].isTaken == false) {
                mat[0][i].isTaken = true;
                mat[0][i].shape = "O";
                return;
            }
            else if (mat[0][i].shape == shape && mat[2][i].shape == shape && mat[1][i].isTaken == false) {
                mat[1][i].isTaken = true;
                mat[1][i].shape = "O";
                return;
            }
        }
        ///בדיקת אלכסונים
        //אלכסון ראשי
        if (mat[0][0].shape == shape && mat[1][1].shape == shape && mat[2][2].isTaken == false) {
            mat[2][2].isTaken = true;
            mat[2][2].shape = "O";
            return;
        }
        else if (mat[0][0].shape == shape && mat[2][2].shape == shape && mat[1][1].isTaken == false) {
            mat[1][1].isTaken = true;
            mat[1][1].shape = "O";
            return;
        }
        else if (mat[2][2].shape == shape && mat[1][1].shape == shape && mat[0][0].isTaken == false) {
            mat[0][0].isTaken = true;
            mat[0][0].shape = "O";
            return;
        }
        //אלכסון משני
        if (mat[0][2].shape == shape && mat[1][1].shape == shape && mat[2][0].isTaken == false) {
            mat[2][0].isTaken = true;
            mat[2][0].shape = "O";
            return;
        }
        else if (mat[0][2].shape == shape && mat[2][0].shape == shape && mat[1][1].isTaken == false) {
            mat[1][1].isTaken = true;
            mat[1][1].shape = "O";
            return;
        }
        else if (mat[2][0].shape == shape && mat[1][1].shape == shape && mat[0][2].isTaken == false) {
            mat[0][2].isTaken = true;
            mat[0][2].shape = "O";
            return;
        }
    }
    setRandom();
}
function setRandom() {
    let randSuccess: boolean = false;
    let randNum: number = Math.round((Math.random() * 8) + 1);
    for (let i: number = 0; i < mat.length; i++) {
        for (let j: number = 0; j < mat[i].length; j++) {
            if (mat[i][j].displayNumber == randNum && mat[i][j].isTaken == false) {
                mat[i][j].isTaken = true;
                mat[i][j].shape = "O";
                randSuccess = true;
                return;
            }
        }
    }
    setRandom();
}
function CheckComplete(shape: string): void {
    for (let i: number = 0; i <= 2; i++) {
        //Row Test
        if (mat[i][0].shape == shape && mat[i][1].shape == shape && mat[i][2].shape == shape) {
            alert(`${Cell.displayWinner(shape)}`);
            isGameOver = true;
            return;
        }
        else if (mat[i][1].shape == shape && mat[i][2].shape == shape && mat[i][0].shape == shape) {
            alert(`${Cell.displayWinner(shape)}`);
            isGameOver = true;
            return;
        }
        else if (mat[i][0].shape == shape && mat[i][2].shape == shape && mat[i][1].shape == shape) {
            alert(`${Cell.displayWinner(shape)}`);
            isGameOver = true;
            return;
        }
        //Column Test
        else if (mat[0][i].shape == shape && mat[1][i].shape == shape && mat[2][i].shape == shape) {
            alert(`${Cell.displayWinner(shape)}`);
            isGameOver = true;
            return;
        }
        else if (mat[1][i].shape == shape && mat[2][i].shape == shape && mat[0][i].shape == shape) {
            alert(`${Cell.displayWinner(shape)}`);
            isGameOver = true;
            return;
        }
        else if (mat[0][i].shape == shape && mat[2][i].shape == shape && mat[1][i].shape == shape) {
            alert(`${Cell.displayWinner(shape)}`);
            isGameOver = true;
            return;
        }
    }
    //Slant Test
    if (mat[0][0].shape == shape && mat[1][1].shape == shape && mat[2][2].shape == shape) {
        alert(`${Cell.displayWinner(shape)}`);
        isGameOver = true;
        return;
    }
    else if (mat[0][2].shape == shape && mat[1][1].shape == shape && mat[2][0].shape == shape) {
        alert(`${Cell.displayWinner(shape)}`);
        isGameOver = true;
        return;
    }
}
function checkForTieGameFn(): boolean {
    console.log(mat);
    let isTie: boolean = true;
    for (let i: number = 0; i < mat.length; i++) {
        for (let j: number = 0; j < mat[i].length; j++) {
            if (mat[i][j].isTaken == false) {
                isTie = false;
            }
        }
    }
    return isTie
}
