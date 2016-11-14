var Orientation = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};
function MovableObject() {
    var cell;
    var board;
    function setBoard(currentBoard) {
        board = currentBoard;
    }
    function getBoard() {
        return board;
    }
    function setPosition(currentPosition) {
        if (this.position === undefined) {
            this.position = new Position(0, 0);
        }
        this.position.setX(currentPosition.getX());
        this.position.setY(currentPosition.getY());
    }
    function setCell(currentCell) {
        cell = currentCell;
    }
    function getPosition() {
        return this.position;
    }
    function move(direction) {
        if (canMove(direction, getPosition().getX(), getPosition().getY())) {
            board.moveObj(direction, this);
        }
    }
    function isEmptyTheCell(x, y, object, time) {
        return board.isEmpty(x, y, object, time);
    }
    function canMove(direction, x, y, object, time) {
        if (object.getTime() == time) {
            object.addWildCard(null);
            object.addTime(0);
            board.emptyWildCard(-2);
            return false;

        } else {
            switch (direction) {
                case Orientation.UP:
                    y = y - 1;
                    return isEmptyTheCell(x, y, object, time);
                case Orientation.DOWN:
                    y = y + 1;
                    return isEmptyTheCell(x, y, object, time);
                case Orientation.LEFT:
                    x = x - 1;
                    return isEmptyTheCell(x, y, object, time);
                case Orientation.RIGHT:
                    x = x + 1;
                    return isEmptyTheCell(x, y, object, time);
                default:
                    return false;
            }
        }
    }
    function isThereAnItem() {
        return cell.getListOfObjects().lenght == 2;
    }
    MovableObject.prototype.setPosition = setPosition;
    MovableObject.prototype.getPosition = getPosition;
    MovableObject.prototype.setCell = setCell;
    MovableObject.prototype.isThereAnItem = isThereAnItem;
    MovableObject.prototype.move = move;
    MovableObject.prototype.setBoard = setBoard;
    MovableObject.prototype.isEmptyTheCell = isEmptyTheCell;
    MovableObject.prototype.canMove = canMove;
    MovableObject.prototype.getBoard = getBoard;
}