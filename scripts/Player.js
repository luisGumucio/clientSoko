function Player(name, identificator) {
    var name = name;
    var id = identificator;
    var item = null;
    var time = 0;
    this.getName = function () {
        return name;
    }
    this.getId = function () {
        return id;
    }
    this.addWildCard = function(wildCard) {
        item = wildCard;
    }
    this.addTime = function(itemTime) {
        time = itemTime;
    }
    this.getTime = function () {
        return time;
    }
    this.getWildCard = function () {
        return item;
    }
    this.gameOver = function (board) {
        var list = new Array();
        for (var j = 0; j < board.getBoard().length; j++) {
            for (var k = 0; k < board.getBoard().length; k++) {
                if (board.getBoard()[j][k].getStatus() == Status.BUSY_BY_TWO_ITEM) {
                    if (board.getBoard()[j][k].getListOfObjects()[0] instanceof Destination
                        && board.getBoard()[j][k].getListOfObjects()[1] instanceof Box) {
                        list.push(board.getBoard()[j][k]);
                    }
                }
            }
        }
        return (list.length == board.getDestinations().length);
    }
}
Player.prototype = new MovableObject();
Player.prototype.constructor = Player;
Player.prototype.move = function (direction, time) {
    var x = this.getPosition().getX();
    var y = this.getPosition().getY();
    var board = this.getBoard();

    if (this.canMove(direction, x, y, this, time)) {
        board.moveObj(direction, this, time);
    } else {
        switch (direction) {
            case Orientation.UP:
                y = y - 1;
                var cell = board.getCell(x, y)
                y = y - 1;
                break;
            case Orientation.DOWN:
                y = y + 1;
                var cell = board.getCell(x, y)
                y = y + 1;
                break;
            case Orientation.LEFT:
                x = x - 1;
                var cell = board.getCell(x, y)
                x = x - 1;
                break;
            case Orientation.RIGHT:
                x = x + 1;
                var cell = board.getCell(x, y)
                x = x + 1;
                break;
            default:
                return false;
        }
        if (cell.isThereAnBox() && this.canMove(direction, cell.getPosition().getX(), cell.getPosition().getY(),this, time)
            && !board.getCell(x, y).isThereWall() && !board.getCell(x, y).isThereWildCard()) {
            board.moveObj(direction, cell.getBox());
            board.moveObj(direction, this);
        }
    }


}

