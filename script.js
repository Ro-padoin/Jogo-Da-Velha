function createBoxes() {

  let parentDiv = document.querySelector(".grid");
  let boxes = [];

  for (let i = 0; i < 9; i += 1) {
    let newBox = document.createElement('div');
    parentDiv.appendChild(newBox);
    newBox.className = "celula";
    newBox.id = i;
    newBox.addEventListener('click', () => {
      if (newBox.textContent == "") {
        play(newBox);
      };      
    });
    boxes.push(newBox);
  }

  return boxes;
}

let boxes = createBoxes();
const player1 = "X";
const player2 = "O";
let round = true;
let gameOver = false;
let accumulator = 0;

function setTextPlayer(phrase) {
  let textPlayer = document.getElementById('player');
  textPlayer.textContent = phrase;
}

function play(celula) {
  if (gameOver) {
    return; // vazio para que nao execute mais nada;
  }

  let player = round ? player1 : player2;
  let nextPlayer = round ? player2 : player1;

  celula.textContent = player; // poderia usar o innerText tbem.
  round = !round;
  setTextPlayer("Vez do Jogador " + nextPlayer);
  accumulator ++;  
  checkWinner();  //vencedores;
  checkDraw(); // empates;
}

function checkWinner() {
  const combinacoes = [
    [0, 1, 2], // linha 1
    [3, 4, 5], // linha 2
    [6, 7, 8], // linha 3
    [0, 3, 6], // coluna 1
    [1, 4, 7], // coluna 2
    [2, 5, 8], // coluna 3
    [0, 4, 8], // diagonal esqueda direita
    [2, 4, 6] // diagonal direita esquerda
  ]

  for (let combinacao of combinacoes) {

    let value1 = boxes[combinacao[0]].textContent;
    let value2 = boxes[combinacao[1]].textContent;
    let value3 = boxes[combinacao[2]].textContent;

    if (value1 == value2 && value1 == value3 && value1 !== "") {
      setTextPlayer("O vencedor é: " + value1);
      gameOver = true;
      return;
    }    
  }
}

function checkDraw() {

  if(accumulator == 9 && gameOver === false) {
    setTextPlayer("Jogo empatado!")
    gameOver = true;
  }  
}


let buttonReset = document.getElementById('reset');

buttonReset.addEventListener('click', () => {
  for (let box of boxes) {
    box.textContent = "";
  }
  gameOver = false;
  round = true;
  accumulator = 0;
  setTextPlayer("Vez do Jogador X");
});