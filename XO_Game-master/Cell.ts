
class Cell {
    private _cellRow: number;
    private _cellColumn: number;
    private _displayNumber: number;
    private _shape: string;
    public isTaken: boolean;
    public isValidNumber: boolean;
    public get cellRow(): number {
        return this._cellRow
    }
    public set cellRow(cellrow: number) {
        if (cellrow >= 0 && cellrow <= 2)
            this._cellRow = cellrow;
    }
    public get cellColumn(): number {
        return this._cellColumn
    }
    public set cellColumn(cellcolumn: number) {
        if (cellcolumn >= 0 && cellcolumn <= 2)
            this._cellColumn = cellcolumn;
    }
    public get displayNumber(): number {
        return this._displayNumber
    }
    public set displayNumber(displayNumber: number) {
        if (displayNumber >= 1 && displayNumber <= 9)
            this._displayNumber = displayNumber;
    }
    public static displayWinner(shape: string): string {
        if (shape == "X")
            return "You Win";
        else return "Computer Win"
    }
    public get shape(): string {
        return this._shape;
    }
    public set shape(shape: string) {
        if (shape == "X" || shape == "O")
            this._shape = shape;
    }
    public constructor(position: number) {
        this.isValidNumber = this.checkValidNumber(position);
        if (this.isValidNumber) {
            this.setPosition(position);
            this.displayNumber = position;
            this.shape = "Empty";
            this.isTaken = false;

        }
    }
    private setPosition(position: number): void {
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
    }
    private checkValidNumber(position: number): boolean {
        if (position < 1 || position > 9 || isNaN(position)) {
            return false;
        }
        return true;
    }
}


