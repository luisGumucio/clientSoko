function Box(identificator) {
    var id = identificator;
    this.getId = function () {
        return id;
    }
}
Box.prototype = new MovableObject();
Box.prototype.constructor = Box;
