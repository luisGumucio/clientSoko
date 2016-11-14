function Position(row, column) {
    var x = row;
    var y = column;
    this.getX = function () {
        return x;
    }
    this.setX =function (xPosition) {
        x = xPosition;
    }
    this.getY = function () {
        return y;
    }
    this.setY = function (yPosition) {
        y = yPosition;
    }
}