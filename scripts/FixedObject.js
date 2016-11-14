function FixedObject() {
    var position;
    var cell;
    var board;
    function setPosition(currentPosition) {
        position = currentPosition;
    }
    function setCell(currentCell) {
        cell = currentCell;
    }
    function getPosition() {
        return position;
    }
    function setBoard(currentBoard) {
        board = currentBoard;
    }
    FixedObject.prototype.setPosition = setPosition;
    FixedObject.prototype.setCell = setCell;
    FixedObject.prototype.setBoard = setBoard;
    FixedObject.prototype.getPosition = getPosition;
}
