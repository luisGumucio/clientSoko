//1 = wall
//2 = empty
//3 = finish
//4 = empty
// 5= box
// 6 = player
// 7 = bonus
    function Level() {
        var value;
        
        function levelOne(){
            random();
            console.log(value);
            return oneLevel[value];
        };
        var random = function (params) {
              min = Math.ceil(0);
              max = Math.floor(2);
            value = Math.floor(Math.random() * (max - min)) + min;
        }

        var level1 = [[1, 1, 1, 1, 1, 1, 1, 1],
       [1, 1, 1, 2, 2, 2, 1, 1],
       [1, 6, 2, 5, 3, 2, 1, 1],
       [1, 1, 1, 2, 4, 3, 1, 1],
       [1, 1, 1, 1, 4, 2, 1, 1],
       [1, 2, 1, 2, 2, 2, 1, 1],
       [1, 4, 7, 5, 4, 4, 1, 1],
       [1, 2, 2, 2, 2, 2, 2, 1],
       [1, 1, 1, 1, 1, 1, 1, 1]];

      var level2 = [[1, 1, 1, 1, 1, 1, 1, 1],
       [1, 1, 1, 2, 2, 3, 3, 1],
       [1, 1, 1, 1, 2, 2, 1, 1],
       [1, 1, 1, 2, 4, 7, 1, 1],
       [1, 1, 1, 2, 4, 2, 1, 1],
       [1, 2, 2, 5, 2, 2, 1, 1],
       [1, 1, 5, 1, 4, 4, 1, 1],
       [1, 2, 2, 6, 2, 2, 2, 1],
       [1, 1, 1, 1, 1, 1, 1, 1]];

        var level3 = [[1, 1, 1, 1, 1, 1, 1, 1],
       [1, 1, 1, 2, 2, 3, 3, 1],
       [1, 1, 1, 1, 2, 2, 1, 1],
       [1, 1, 1, 2, 4, 7, 1, 1],
       [1, 1, 1, 2, 4, 2, 1, 1],
       [1, 2, 2, 5, 2, 2, 1, 1],
       [1, 1, 5, 1, 4, 4, 1, 1],
       [1, 2, 2, 6, 2, 2, 2, 1],
       [1, 1, 1, 1, 1, 1, 1, 1]];

        var levelTwo = [[1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1],
        [1, 3, 3, 2, 2, 1, 2, 1, 1, 6, 1],
        [1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1],
        [1, 3, 3, 2, 2, 2, 2, 2, 4, 4, 1],
        [1, 2, 2, 2, 2, 1, 2, 1, 2, 4, 1],
        [1, 2, 2, 1, 1, 1, 2, 1, 5, 4, 1],
        [1, 1, 1, 1, 2, 5, 2, 1, 2, 2, 1],
        [2, 2, 2, 1, 2, 2, 4, 1, 2, 4, 1],
        [2, 2, 2, 1, 2, 5, 2, 2, 5, 2, 1],
        [2, 2, 2, 1, 2, 2, 1, 7, 2, 2, 1],
        [2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1]];
        var oneLevel = new Array(level1, level2,level3);

        function getMap (itemLevel) {
            switch (itemLevel) {
                case 1:
                    return levelOne();
                case 2:
                    return levelTwo;
            }
        }
        function  getLegth(itemLevel) {
            switch (itemLevel) {
                case 1:
                    return oneLevel[value].length;
                case 2:
                    return levelTwo.length;
                default:
                    return 0;
            }
        }
        this.getMap = getMap;
        this.getLegth = getLegth;

    }