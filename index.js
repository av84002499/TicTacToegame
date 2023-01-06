let turn = 0;
let players = [];
let gameOver = false;
let dimension = 3;
let board = [];

let game = document.getElementById("game-container");
let name = document.getElementById("name");

const restart = () => {
  turn = 0;
  players = [];
  gameOver = false;
  dimension = 3;
  board = [];

  game.innerHTML = "";
  name.classList.remove("hide");
  game.classList.add("hide");
  document.getElementById("turn").innerHTML = "";
};

const startGame = () => {
  dimension = document.getElementById("dimension").value;
  let input1 = document.getElementById("p1");
  let input2 = document.getElementById("p2");

  let player1 = input1.value || "vinod";
  let player2 = input2.value || "lucky";

  input1.value = "";
  input2.value = "";

  if (isEmpty(player1) || isEmpty(player2)) {
    alert("Player name is required");
    return;
  }

  name.classList.add("hide");
  game.classList.remove("hide");

  players.push(player1);
  players.push(player2);
  players.unshift();
  players.unshift();

  document.getElementById("turn").innerHTML = player1 + "'s turn";

  initGame(dimension);
};

const calculateWinner = () => {
  let len = board.length;
  if (turn < len) {
    return false;
  }

  if (dimension === 3) {
    const winnerCombinations = getWinnerCombination(dimension);

    for (let i = 0; i < winnerCombinations.length; i++) {
      let [val1, val2, val3] = winnerCombinations[i];

      if (
        board[val1[0]][val1[1]] !== "" &&
        board[val1[0]][val1[1]] === board[val2[0]][val2[1]] &&
        board[val1[0]][val1[1]] === board[val3[0]][val3[1]]
      ) {
        return true;
      }
    }
    return false;
  }

  if (dimension === 4) {
    const winnerCombinations = getWinnerCombination(dimension);

    for (let i = 0; i < winnerCombinations.length; i++) {
      let [val1, val2, val3, val4] = winnerCombinations[i];

      if (
        board[val1[0]][val1[1]] !== "" &&
        board[val1[0]][val1[1]] === board[val2[0]][val2[1]] &&
        board[val1[0]][val1[1]] === board[val3[0]][val3[1]] &&
        board[val1[0]][val1[1]] === board[val4[0]][val4[1]]
      ) {
        return true;
      }
    }
    return false;
  }

  if (dimension === 5) {
    const winnerCombinations = getWinnerCombination(dimension);

    for (let i = 0; i < winnerCombinations.length; i++) {
      let [val1, val2, val3, val4, val5] = winnerCombinations[i];

      if (
        board[val1[0]][val1[1]] !== "" &&
        board[val1[0]][val1[1]] === board[val2[0]][val2[1]] &&
        board[val1[0]][val1[1]] === board[val3[0]][val3[1]] &&
        board[val1[0]][val1[1]] === board[val4[0]][val4[1]] &&
        board[val1[0]][val1[1]] === board[val5[0]][val5[1]]
      ) {
        return true;
      }
    }
    return false;
  }

  if (dimension === 6) {
    const winnerCombinations = getWinnerCombination(dimension);

    for (let i = 0; i < winnerCombinations.length; i++) {
      let [val1, val2, val3, val4, val5, val6] = winnerCombinations[i];

      if (
        board[val1[0]][val1[1]] !== "" &&
        board[val1[0]][val1[1]] === board[val2[0]][val2[1]] &&
        board[val1[0]][val1[1]] === board[val3[0]][val3[1]] &&
        board[val1[0]][val1[1]] === board[val4[0]][val4[1]] &&
        board[val1[0]][val1[1]] === board[val5[0]][val5[1]] &&
        board[val1[0]][val1[1]] === board[val6[0]][val6[1]]
      ) {
        return true;
      }
    }
    return false;
  }
};

const handleClick = (event, i, j) => {
  const el = event.target;
  if (el.innerHTML !== "" || gameOver) {
    return;
  }

  board[i][j] = turn % 2 === 0 ? "X" : "O";
  el.innerHTML = board[i][j];
  el.classList.add(turn % 2 === 0 ? "orange" : "green");

  const winner = calculateWinner();
  // console.log(winner);
  console.log(board);

  if (winner) {
    alert(players[turn % 2] + " is won");
    gameOver = true;
    return;
  }
  turn++;

  if (turn === dimension * dimension) {
    alert("Game is drown");
    gameOver = true;
    return;
  }

  document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
};

const initGame = (dimension) => {
  let gameContainer = document.getElementById("game-container");

  for (let i = 0; i < dimension; i++) {
    let rows = [];

    //create row
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < dimension; j++) {
      //create cell
      let cell = document.createElement("div");
      cell.setAttribute("id", i.toString() + j.toString());
      cell.addEventListener("click", (event) => handleClick(event, i, j));
      cell.className = "cell";
      row.appendChild(cell);
      rows.push("");
    }
    board.push(rows);
    gameContainer.appendChild(row);
  }
};

const isEmpty = (value) => !value || !value.trim();

function getWinnerCombination(dimension) {
  let arr = [];

  for (let i = 0; i < dimension; i++) {
    let a = [];
    let b = [];
    for (let j = 0; j < dimension; j++) {
      a.push(`${i}${j}`);
      b.push(`${j}${i}`);
    }
    arr.push(a);
    arr.push(b);
  }

  let a = [];
  let b = [];
  for (let i = 0; i < dimension; i++) {
    a.push(`${i}${dimension - i - 1}`);
    b.push(`${i}${i}`);
  }
  arr.push(a);
  arr.push(b);
  return arr;
}
