/// <reference path="../Level.js" />
/// <reference path="../Board.js" />
/// <reference path="Timer.js" />
    function GameView(itemLevel) {
        var c = document.getElementById("myCanvas");
        var value = 0;
        var ctx = c.getContext('2d');
        ctx.canvas.width = 550;
        ctx.canvas.height = 550;
        player_view = new Image();
        box_view = new Image();
        goal_view = new Image();
        wall_view = new Image();
        empty_view = new Image();
        wildcard_view = new Image();
        player_view = document.getElementById("player_view");
        box_view = document.getElementById("box_view");
        goal_view = document.getElementById("goal_view");
        wall_view = document.getElementById("wall_view");
        empty_view = document.getElementById("empty_view");
        wildcard_view = document.getElementById("wildcard_view");
        var level = new Level();
        var map = level.getMap(itemLevel);
        var board = new Board(map.length, map.length);
        var player = new Player("Pepe", 1);
        (function () {
            if (level.getLegth(itemLevel) == 0) {
                alert("Game Over Thank");
            } else {
                for (var i = 0; i < map.length; i++) {
                    for (var j = 0; j < map.length; j++) {
                        if (map[i][j] == 6) {
                            board.add(player, new Position(j, i));
                        } else if (map[i][j] == 1) {
                            board.add(new Wall(), new Position(j, i));
                        } else if (map[i][j] == 5) {
                            board.add(new Box(i), new Position(j, i));
                        } else if (map[i][j] == 3) {
                            board.add(new Destination, new Position(j, i));
                        } else if (map[i][j] == 7) {
                            board.add(new WildCard(), new Position(j, i));
                        }
                    }
                }
            }

        })();

        this.draw = (function () {
            for (var i = 0; i < map.length; i++) {
                for (var j = 0; j < map.length; j++) {
                    if (player.getPosition().getX() == j && player.getPosition().getY() == i) {
                        ctx.drawImage(player_view, j * 50, i * 50, 50, 50);
                    }
                    else if (board.getCell(j, i).isThereWall()) {
                        ctx.drawImage(wall_view, j * 50, i * 50, 50, 50);
                    } else if (board.getCell(j, i).getStatus() == Status.EMPTY) {
                        ctx.drawImage(empty_view, j * 50, i * 50, 50, 50);
                    } else if (board.getCell(j, i).isThereAnBox()) {
                        ctx.drawImage(box_view, j * 50, i * 50, 50, 50);
                    } else if (board.getCell(j, i).isThereDestination()) {
                        ctx.drawImage(goal_view, j * 50, i * 50, 50, 50);
                    } else if (board.getCell(j, i).isThereWildCard()) {
                        ctx.drawImage(wildcard_view, j * 50, i * 50, 50, 50);
                    }
                }
            }
        });
    
        this.move = function (direction, time) {
            player.move(direction, time);
        }
        this.NextLevel = function () {
            return player.gameOver(board);
        }
        this.getWild = function() {
            return board.isEmptyWildCard();
        }
    }