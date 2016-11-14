/// <reference path="board.js" />
function Game() {
    initDestination()
    initWall();
    initBox();
    initPlayer()
    var board = new Board(5, 5);
    function initWall() {
        board.add(new Wall(), new Position(0, 0));
        board.add(new Wall(), new Position(0, 1));
        board.add(new Wall(), new Position(0, 2));
        board.add(new Wall(), new Position(0, 3));
        board.add(new Wall(), new Position(0, 4));

        board.add(new Wall(), new Position(1, 0));
        board.add(new Wall(), new Position(2, 0));
        board.add(new Wall(), new Position(3, 0));
        board.add(new Wall(), new Position(4, 0));

        board.add(new Wall(), new Position(4, 1));
        board.add(new Wall(), new Position(4, 2));
        board.add(new Wall(), new Position(4, 3));
        board.add(new Wall(), new Position(4, 4));

        board.add(new Wall(), new Position(1, 4));
        board.add(new Wall(), new Position(2, 4));
        board.add(new Wall(), new Position(3, 4));
    }
    function initBox() {
        board.add(new Box(), new Position(2, 2));
    }
    function initDestination() {
        board.add(new Destination(), new Position(2, 1))
    }
    function initPlayer() {
        board.add(new Player("JOhx", 1));
    }
    function GameOver() {
        var list = new Array();
        for (var j = 0; j < rowSize; j++) {
            for (var k = 0; k < columnSize; k++) {
                board[j][k] = new Cell(new Position(j, k));
                if (board[j][k].getStatus() == Status.BUSY_BY_TWO_ITEM) {
                    if (board[j][k].getListOfObjects()[0] instanceof Destination
                        && board[j][k].getListOfObjects()[1] instanceof Box) {
                        list.push(board[j][k]);
                    }
                }
            }
        }
        return (list.length == board.getDestinations().length);
    }
    this.GameOver = GameOver;
}

