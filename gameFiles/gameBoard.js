import { events } from "/Controller/eventsControl.js";

const gameBoard = (function () {
    //Cache DOM
    const boardTable = document.querySelector("#tableBoard");
    const playerStatus = document.querySelector("#status");

    //Binds
    events.on("gameOver", resetBoard);
    events.on("drawCell", drawMarker);

    //create Board
    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const tableCell = document.createElement("div");
            tableCell.classList = "tableCell";
            tableCell.dataset.position = i;
            tableCell.addEventListener("click", cellPressed);
            boardTable.appendChild(tableCell);
        };
    }
    createBoard();

    //Draw on DOM
    function cellPressed(){
        let index = this.dataset.position;
        events.emit("cellPressed",index);
    }

    function drawMarker({index,playerSel}){
        let boardCells = [...document.querySelectorAll(".tableCell")];
        boardCells[index].innerText = playerSel;
        boardCells[index].removeEventListener("click", cellPressed);
    }

    //Reset function
    function resetBoard(resultText) {
        let boardCells = [...document.querySelectorAll(".tableCell")];
        boardCells.forEach(x => x.removeEventListener("click", cellPressed));

        playerStatus.innerText = resultText;
        setTimeout(() => {
            playerStatus.innerText = "Tik Tak Toe";
            boardTable.innerHTML = "";
            createBoard();
        }, 1500);
    }
})();

export { gameBoard };