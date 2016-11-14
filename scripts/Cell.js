function Cell(position) {
    var position = position;
    var status = Status.EMPTY;
    var listOfObjects = new Array();

    function getStatus() {
        switch (listOfObjects.length) {
            case 0:
                return Status.EMPTY;
            case 1:
                return Status.BUSY_BY_AN_ITEM;
            case 2:
                return Status.BUSY_BY_TWO_ITEM;
            default:
                return Status.EMPTY;
        }
    }
    function getPosition() {
        return position;
    }
    function setPosition(currentPosition) {
        position = currentPosition;
    }
    function getListOfObjects() {
        return listOfObjects;
    }
    function addObj(object, time) {

        if (getStatus() === Status.EMPTY) {
            object.setPosition(getPosition());
            listOfObjects.push(object);
            object.setCell(this);
            return true;
        } else if (getStatus() === Status.BUSY_BY_AN_ITEM) {
            var item = listOfObjects[0];
            if (item instanceof Destination && (object instanceof Player || object instanceof Box)) {
                object.setPosition(getPosition());
                listOfObjects.push(object);
                return true;
            } else if (item instanceof WildCard && (object instanceof Player || object instanceof Box)) {
                object.setPosition(getPosition());
                listOfObjects.push(object);
                removeObj(item);
                object.addWildCard(item);
                object.addTime((time + 3));
                return true;
            } else if (item instanceof Wall && (object instanceof Player || object instanceof Box) && object.getWildCard() instanceof WildCard) {
                object.setPosition(getPosition());
                listOfObjects.push(object);
                removeObj(item);
                return true;
            }
            return false;
        }
    }
    Array.prototype.clean = function (deleteValue) {
        for (var i = 0, j = this.length ; i < j; i++) {
            if (this[i] == deleteValue) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };
    function removeObj(object1) {
        return listOfObjects.clean(object1);
    }
    function isThereAnBox() {
        return (listOfObjects[0] instanceof Box || listOfObjects[1] instanceof Box);
    }
    function isThereWall() {
        return listOfObjects[0] instanceof Wall;
    }
    function isThereDestination() {
        return listOfObjects[0] instanceof Destination;
    }
    function isThereWildCard() {
        return listOfObjects[0] instanceof WildCard;
    }
    function isTherePlayer() {
        return listOfObjects[0] instanceof Player;
    }
    function getBox() {
        if (isThereAnBox()) {
            if (listOfObjects[0] instanceof Box) {
                return listOfObjects[0];
            } else if (listOfObjects[1] instanceof Box) {
                return listOfObjects[1];
            }
        }
        return null;
    }
    this.getStatus = getStatus,
    this.getPosition = getPosition,
    this.setPosition = setPosition,
    this.getListOfObjects = getListOfObjects,
    this.addObj = addObj,
    this.removeObj = removeObj,
    this.isThereAnBox = isThereAnBox,
    this.getBox = getBox,
    this.isThereWall = isThereWall;
    this.isThereDestination = isThereDestination;
    this.isThereWildCard = isThereWildCard;
    this.isTherePlayer = isTherePlayer;
}
var Status = {
    EMPTY: 0,
    BUSY_BY_AN_ITEM: 1,
    BUSY_BY_TWO_ITEM: 2
};