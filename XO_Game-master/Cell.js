var Cell = /** @class */ (function () {
    function Cell(position) {
        if (isNaN(position)) {
            this.messageToPlayer = "You should only enter numbers\n";
            this.isValidNumber = false;
        }
        else if (position < 1 || position > 9 || Math.round(position) != position) {
            this.messageToPlayer = "You should only enter round numbers between 1 and 9\n";
            this.isValidNumber = false;
        }
        else {
            this.messageToPlayer = "";
            this.isValidNumber = true;
        }
        if (this.isValidNumber) {
            this.setPosition(position);
            this.displayNumber = position;
            this.shape = "Empty";
            this.isTaken = false;
        }
    }
    Object.defineProperty(Cell.prototype, "cellRow", {
        get: function () {
            return this._cellRow;
        },
        set: function (cellrow) {
            if (cellrow >= 0 && cellrow <= 2)
                this._cellRow = cellrow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "cellColumn", {
        get: function () {
            return this._cellColumn;
        },
        set: function (cellcolumn) {
            if (cellcolumn >= 0 && cellcolumn <= 2)
                this._cellColumn = cellcolumn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "displayNumber", {
        get: function () {
            return this._displayNumber;
        },
        set: function (displayNumber) {
            if (displayNumber >= 1 && displayNumber <= 9)
                this._displayNumber = displayNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "messageToPlayer", {
        get: function () {
            return this._messageToPlayer;
        },
        set: function (message) {
            if (message == "You should only enter numbers\n"
                || message == "You should only enter round numbers between 1 and 9\n"
                || message == "")
                this._messageToPlayer = message;
        },
        enumerable: true,
        configurable: true
    });
    Cell.displayWinner = function (shape) {
        if (shape == "X")
            return "You Win";
        else
            return "Computer Win";
    };
    Object.defineProperty(Cell.prototype, "shape", {
        get: function () {
            return this._shape;
        },
        set: function (shape) {
            if (shape == "X" || shape == "O")
                this._shape = shape;
        },
        enumerable: true,
        configurable: true
    });
    Cell.prototype.setPosition = function (position) {
        switch (position) {
            case 1:
            case 2:
            case 3:
                this.cellRow = 0;
                break;
            case 4:
            case 5:
            case 6:
                this.cellRow = 1;
                break;
            case 7:
            case 8:
            case 9:
                this.cellRow = 2;
                break;
        }
        switch (position) {
            case 1:
            case 4:
            case 7:
                this.cellColumn = 0;
                break;
            case 2:
            case 5:
            case 8:
                this.cellColumn = 1;
                break;
            case 3:
            case 6:
            case 9:
                this.cellColumn = 2;
                break;
        }
    };
    return Cell;
}());
//# sourceMappingURL=Cell.js.map