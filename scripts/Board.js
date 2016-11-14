
function Board(rowSize, columnSize) {
    var board = new Array(rowSize);
    var emptyWilcard = 0;
    var listOfDestinations = new Array();
    for (var i = 0; i < columnSize; i++) {
        board[i] = new Array(columnSize);
    }
    initCells();
    function initCells() {
        for (var j = 0; j < rowSize; j++) {
            for (var k = 0; k < columnSize; k++) {
                board[j][k] = new Cell(new Position(j, k));
            }
        }
    }
    function getCell(x, y) {
        return board[x][y];
    }
    function isEmpty(x, y, object) {
        return (board[x][y].getStatus() == Status.EMPTY
            ||( (board[x][y].getListOfObjects()[0] instanceof Destination)
            || (board[x][y].getListOfObjects()[0] instanceof WildCard)
            || (object instanceof Player && object.getWildCard() instanceof WildCard))
            && !board[x][y].isThereAnBox());
    }
    function add(object, position) {
        object.setBoard(this);
        if (object instanceof Destination) {
            listOfDestinations.push(object);
        }else if(object instanceof WildCard){
            emptyWilcard = 0;
        }
        board[position.getX()][position.getY()].addObj(object);
    }
    function emptyWildCard(item) {
        emptyWilcard = item;
    }
    function isEmptyWildCard() {
        return emptyWilcard;
    }
    function moveObj(direction, object1, time) {

        var x = object1.getPosition().getX();
        var y = object1.getPosition().getY();
        board[x][y].removeObj(object1);
        switch (direction) {
            case Orientation.UP:
                y = y - 1;
                object1.getPosition().setX(x);
                board[x][y].addObj(object1, time);
                break;
            case Orientation.DOWN:
                y = y + 1;
                object1.getPosition().setX(x);
                board[x][y].addObj(object1, time);
                break;
            case Orientation.LEFT:
                x = x - 1;
                object1.getPosition().setY(y);
                board[x][y].addObj(object1, time);
                break;
            case Orientation.RIGHT:
                x = x + 1;
                object1.getPosition().setY(y);
                board[x][y].addObj(object1, time);
                break;
            default:
                break;
        }
    }

    this.getBoard = function () {
        return board;
    }
    this.getDestinations = function () {
        return listOfDestinations;
    }

    this.add = add,
    this.isEmpty = isEmpty,
    this.moveObj = moveObj,
    this.getCell = getCell,
    this.emptyWildCard = emptyWildCard,
    this.isEmptyWildCard = isEmptyWildCard
}

