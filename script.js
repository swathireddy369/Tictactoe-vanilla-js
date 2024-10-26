let matrix = [2, 2, 2, 2, 2, 2, 2, 2, 2]
let scenarios = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let hasGameWon = false;
let players = [{
    name: "Swathi", score: 0

},
{
    name: "Anand", score: 0

}]
let isCircleNext = true
let count = 0;

//html
const instructionsInfoEl = document.getElementById("instructionsInfo")
const startBtnEl = document.querySelector(".startBtn")
const restartBtnEl = document.querySelector(".ResetBtn")
const modelEl = document.querySelector(".modal")
const player1El = document.querySelector(".player1")
const player2El = document.querySelector(".player2")
const submitBtnEl = document.querySelector(".submitBtn")
const player1Nameel = document.getElementById("player1Name")
const player2Nameel = document.getElementById("player2Name")
const player1ScoreEl = document.getElementById("player1Score")
const player2ScoreEl = document.getElementById("player2Score")
const formEl = document.querySelector(".modalform")
const gridEl = document.querySelectorAll(".square")

const resetGame = () => {
    gridEl.forEach((el, index) => {
        el.classList = "square";
    })
    if (isCircleNext) {
        instructionsInfoEl.innerHTML = `${players[0]["name"]}'s turn`;
    } else {
        instructionsInfoEl.innerHTML = `${players[1]["name"]}'s turn`;
    }
    matrix = [2, 2, 2, 2, 2, 2, 2, 2, 2];
    hasGameWon = false;
    count = 0;
}
const checkToWin = (el) => {
    scenarios.map((scenario, index) => {
        if (matrix[scenario[0]] != 2) {
            let first = matrix[scenario[0]];
            if (matrix[scenario[1]] === first && matrix[scenario[2]] === matrix[scenario[1]]) {
                hasGameWon = true;
                count++;
                if (isCircleNext) {
                    instructionsInfoEl.innerHTML = `${players[1]["name"]} won`;
                    players[1]["score"] += count;
                    player2ScoreEl.innerHTML = players[1]["score"]
                    isCircleNext = false
                } else {
                    instructionsInfoEl.innerHTML = `${players[0]["name"]} won`;
                    players[0]["score"] += count;
                    player1ScoreEl.innerHTML = players[0]["score"]
                    isCircleNext = true
                }
                  }
            if (!matrix.includes(2) && hasGameWon == false) {
                instructionsInfoEl.innerHTML = `its tie`;

            }

        }
    })
}

const addSquares = () => {
     gridEl.forEach((el, index) => {
        el.addEventListener("click", () => {
            if (hasGameWon || matrix[index] !== 2) return;
            if (isCircleNext) {
                el.classList.add("cross")
                instructionsInfoEl.innerHTML = `${players[1]["name"]}'s turn`;
                matrix[index] = 0;
            } else {
                el.classList.add("circle")
                instructionsInfoEl.innerHTML = `${players[0]["name"]}'s turn`;
                matrix[index] = 1;
            }
            isCircleNext = !isCircleNext;
            checkToWin(el)
        })
    })
}

const startGame = () => {
    startBtnEl.addEventListener("click", (e) => {
        e.preventDefault()
        modelEl.style.display = "flex";
         resetGame();
         players[0].score=0;
         players[1].score=0;
         isCircleNext=true
    })
    player1El.addEventListener("change", (e) => {
        e.preventDefault()
        players[0].name = player1El.value;
    })
    player2El.addEventListener("change", (e) => {
        e.preventDefault()
        players[1].name = player2El.value;
    })

    formEl.addEventListener("submit", (e) => {
        e.preventDefault()
        modelEl.style.display = "none"
        player1Nameel.innerHTML = players[0].name
        player1ScoreEl.innerHTML = players[0].score
        player2Nameel.innerHTML = players[1].name
        player2ScoreEl.innerHTML = players[1].score
        player1El.value = ""
        player2El.value = ""
        startBtnEl.innerHTML = "New Gamey"
        restartBtnEl.style.display="flex"
        instructionsInfoEl.innerHTML = `${players[0]["name"]}'s turn`;
        addSquares();
    })
    restartBtnEl.addEventListener("click",(e)=>{
        e.preventDefault();
        resetGame();
    })
}
startGame();
