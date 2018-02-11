///////////////////////Main Section////////////////////////////////
//Initials variables
var btnElement = ' <button onclick="nextTurn()">click me</button>';
var isGameOver = false;
var isTieGame = false;
var tempStr = "<br/>";
var mat = [
    [new Cell(1), new Cell(2), new Cell(3)],
    [new Cell(4), new Cell(5), new Cell(6)],
    [new Cell(7), new Cell(8), new Cell(9)]
];
///////////display game first Time
for (var i = 0; i < mat.length; i++) {
    for (var j = 0; j < mat[i].length; j++) {
        tempStr += "&nbsp;" + setPlaceFn(mat[i][j]) + "&nbsp;|";
    }
    tempStr += "<br/>----------<br/>";
}
document.write(tempStr);
///////////////////////Function Section////////////////////////////////
function setPlaceFn(cell) {
    if (cell.isTaken)
        return cell.shape;
    else
        return cell.displayNumber.toString();
}
function nextTurn() {
    //alert("hello");
    if (isGameOver || isTieGame)
        return;
    var tempStr = "<br/>";
    var positionnumber = Number(prompt("Enter your move:"));
    var currentCell = new Cell(positionnumber);
    //Check for valid number and open position
    while (currentCell.isValidNumber == false || mat[currentCell.cellRow][currentCell.cellColumn].isTaken == true) {
        var messagePartOne = currentCell.isValidNumber == false ? "The number should be between 1 and 9\n" : "Position " + positionnumber + " is already taken\n";
        positionnumber = Number(prompt(messagePartOne + "Enter your move:"));
        currentCell = new Cell(positionnumber);
    }
    mat[currentCell.cellRow][currentCell.cellColumn].isTaken = true;
    mat[currentCell.cellRow][currentCell.cellColumn].shape = "X";
    if (checkForTieGameFn()) {
        for (var i = 0; i < mat.length; i++) {
            for (var j = 0; j < mat[i].length; j++) {
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
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[i].length; j++) {
            tempStr += "&nbsp;" + setPlaceFn(mat[i][j]) + "&nbsp;|";
        }
        tempStr += "<br/>----------<br/>";
    }
    document.write(tempStr + btnElement);
    CheckComplete("X");
    if (isGameOver == false && isTieGame == false)
        CheckComplete("O");
}
function nextMoveForComputer() {
    var shapeArray = new Array("O", "X");
    for (var _i = 0, shapeArray_1 = shapeArray; _i < shapeArray_1.length; _i++) {
        var shape = shapeArray_1[_i];
        //if not win, try to block in the next iteration
        for (var i = 0; i <= 2; i++) {
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
    var randSuccess = false;
    var randNum = Math.round((Math.random() * 8) + 1);
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[i].length; j++) {
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
function CheckComplete(shape) {
    for (var i = 0; i <= 2; i++) {
        //Row Test
        if (mat[i][0].shape == shape && mat[i][1].shape == shape && mat[i][2].shape == shape) {
            alert("" + Cell.displayWinner(shape));
            isGameOver = true;
            return;
        }
        else if (mat[i][1].shape == shape && mat[i][2].shape == shape && mat[i][0].shape == shape) {
            alert("" + Cell.displayWinner(shape));
            isGameOver = true;
            return;
        }
        else if (mat[i][0].shape == shape && mat[i][2].shape == shape && mat[i][1].shape == shape) {
            alert("" + Cell.displayWinner(shape));
            isGameOver = true;
            return;
        }
        else if (mat[0][i].shape == shape && mat[1][i].shape == shape && mat[2][i].shape == shape) {
            alert("" + Cell.displayWinner(shape));
            isGameOver = true;
            return;
        }
        else if (mat[1][i].shape == shape && mat[2][i].shape == shape && mat[0][i].shape == shape) {
            alert("" + Cell.displayWinner(shape));
            isGameOver = true;
            return;
        }
        else if (mat[0][i].shape == shape && mat[2][i].shape == shape && mat[1][i].shape == shape) {
            alert("" + Cell.displayWinner(shape));
            isGameOver = true;
            return;
        }
    }
    //Slant Test
    if (mat[0][0].shape == shape && mat[1][1].shape == shape && mat[2][2].shape == shape) {
        alert("" + Cell.displayWinner(shape));
        isGameOver = true;
        return;
    }
    else if (mat[0][2].shape == shape && mat[1][1].shape == shape && mat[2][0].shape == shape) {
        alert("" + Cell.displayWinner(shape));
        isGameOver = true;
        return;
    }
}
function checkForTieGameFn() {
    console.log(mat);
    var isTie = true;
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[i].length; j++) {
            if (mat[i][j].isTaken == false) {
                isTie = false;
            }
        }
    }
    return isTie;
}
//# sourceMappingURL=app.js.map