import { events } from "./eventsControl.js";

const iaMove = (function () {
    events.on("iaMove",iaMove);

    function iaMove({ cells, playerSel, turn }) {
        let posMoves = [];

        if (turn < 9) {
            for (let i = 0; i < cells.length; i++) {
                if (cells[i] == "") {
                    posMoves.push(i);
                }
            }
            let move = (posMoves.length > 2) ? posMoves[Math.floor(Math.random() * posMoves.length)] : posMoves[0];
            events.emit("iaMoved", {move,playerSel});
        }
    }
})();

export { iaMove };