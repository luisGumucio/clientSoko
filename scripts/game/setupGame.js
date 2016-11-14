/// <reference path="GameView.js" />
/// <reference path="ModuleService.js" />
function setupGame() {
    var data;
    var user;
    var value = 0;
    var timer;
    var self = this;
    var contador_s = 0;
    var contador_m = 0;
    startGame();
    timer.stop();
    var game = undefined;
    var steps = 0;
    var status = 0;
    var service;
    this.loadGame = function (current, item) {
        user = current;
        game = new GameView(current.level);
        game.draw();
        service = item;
    }
    this.movePlayer = function () {
        document.addEventListener("keydown", function (event) {
            if (status == 1) {
                switch (event.keyCode) {
                    case 38:
                        game.move(Orientation.UP, value);
                        steps++;
                        break;
                    case 37:
                        game.move(Orientation.LEFT, value);
                        steps++;
                        break;
                    case 40:
                        game.move(Orientation.DOWN, value);
                        steps++;
                        break;
                    case 39:
                        game.move(Orientation.RIGHT, value);
                        steps++;
                        break;
                }
            }
            if (game != undefined) {
                $('#steps').text(steps);
                game.draw();
                if (game.NextLevel()) {
                    if (user != null) {
                        saveHistory();
                        self.reset();
                        game.draw();
                    }
                }
            }
        });
    }
    this.playGame = function () {
        timer.start();
        status = 1;
    }
    function saveHistory() {
        var point = $("#minute").text() + $("#seconds").text() * steps - game.getWild();
        var times = "00:" + $("#minute").text() + ":" + $("#seconds").text();
        var history = {
            step: steps,
            time: times,
            idProfile: user.idProfile,
            point: point,
            level: user.level
        };
        service.saveHistory(history);
    }
    this.updateGame = function (item) {
        if (item >= user.maxExercise) {
            user.level++;
            service.setCookie(user);
        }
        game = new GameView(user.level);
    }
    function startGame() {
        timer = new Timer(function () {
            if (contador_s == 60) {
                contador_s = 0;
                contador_m++;
                $('#minute').text(contador_m);
                value++;
                if (contador_m == 60) {
                    contador_m = 0;
                }
            }
            value++;
            $('#seconds').text(contador_s);
            contador_s++;
        }, 1000);
    }
    this.reset = function () {
        status = 0;
        contador_s = 0;
        contador_m = 0;
        value = 0;
        steps = 0;
        $('#seconds').text(contador_s);
        $('#minute').text(contador_m);
        timer.stop();
        $('#steps').text(steps);
    }
    self.movePlayer();
}