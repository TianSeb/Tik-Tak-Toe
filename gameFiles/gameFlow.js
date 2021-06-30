import { events } from "../Controller/eventsControl.js";

const matchFlow = (function () {
    //Game Variables
    var cells = ["", "", "", "", "", "", "", "", ""];
    var turn = 0;
    var player1 = "X";
    var player2 = "O";
    var playerTurn = true;

    //binds
    events.on("cellPressed", playerMove);
    events.on("iaMoved", iaMoved);

    function playerMove(index) {
        cells[index] = player1;
        playerTurn = false;
        turn++;
        let result = checkResult.resCheck({ cells, playerSel: player1, turn });
        events.emit("drawCell", { index, playerSel: player1 });
        if (result == undefined) {
            events.emit("iaMove", { cells, playerSel: player2, turn });
        }
        else {
            gameOver(result);
        }
    }

    function iaMoved({ move, playerSel }) {
        cells[move] = playerSel;
        playerTurn = true;
        turn++;
        let result = checkResult.resCheck({ cells, playerSel, turn });
        events.emit("drawCell", { index: move, playerSel });
        if (result != undefined){
            gameOver(result);
        }
    }

    function gameOver(result) {
            let resultText;
            switch (result) {
                case "X": resultText = "Player 1 Wins";
                    break;
                case "O": resultText = "Player 2 Wins";
                    break;
                case "-": resultText = "It´s a Draw"
                    break;
            }
            events.emit("gameOver", resultText);
            cells = ["", "", "", "", "", "", "", "", "",];
            turn = 0;
            playerTurn = true;
        }
})();

const checkResult = (function () {
    const combinations = [
        [0, 1, 2],
        [0, 3, 6],
        [3, 4, 5],
        [6, 7, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [0, 4, 8]
    ];

    function resCheck({ cells, playerSel, turn }) {
 
        for (let i = 0; i < combinations.length; i++) {
            //Array functions
            let check = combinations[i].reduce((res, i) => res.concat(cells[i]), []);
            const allEqual = (arr, marker) => arr.every(val => val === marker);
            //Result of both
            let result = (allEqual(check, playerSel)) ? playerSel : undefined;
            if(result != undefined){
                return result;
            }
            else if(turn > 8 && result == undefined){
                return "-";
            } 
        }

    } 

    return {
        resCheck
    }
})();


export { matchFlow, checkResult };

