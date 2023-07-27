let music = new Audio("bgm.mp3");
let enter = new Audio("enter.mp3");
let end = new Audio("gameover.mp3");
let turn = "X";
let gameover = false;

const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxText");
  const contain = document.querySelector(".container");
  let wins = [
    [0, 1, 2, 0, 10, 0],
    [3, 4, 5, 0, 30, 0],
    [6, 7, 8, 0, 50, 0],
    [0, 3, 6, -20, 30, 90],
    [1, 4, 7, 0, 30, 90],
    [2, 5, 8, 20, 30, 90],
    [0, 4, 8, 0, 30, 45],
    [2, 4, 6, 0, 30, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " Won";
      gameover = true;
      end.play();
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "35%";
      contain.classList.add("disabled");
      document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "60vw";
    }
  });
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxText");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeTurn();
      enter.play();
      checkWin();
      if (!gameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});

reset.addEventListener("click", () => {
  const contain = document.querySelector(".container");
  let boxtexts = document.querySelectorAll(".boxText");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  gameover = false;
  document.querySelector(".line").style.width = "0vw";
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0";
  contain.classList.remove("disabled");
});
