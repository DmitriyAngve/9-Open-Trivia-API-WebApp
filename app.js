const btn1 = document.querySelector(".btn");
const h1 = document.querySelector("h1");
const output = document.querySelector(".output");
const inputVal = document.querySelector(".val");
const baseURL = "https://opentdb.com/api.php?";
// https://opentdb.com/api.php?amount=9&category=14
const game = { que: [], question: 0 };

window.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM ready");
  btn1.textContent = "Start Game";
  inputVal.setAttribute("type", "number");
  inputVal.value = 10;
});

btn1.addEventListener("click", (e) => {
  btn1.style.display = "none";
  inputVal.style.display = "none";
  h1.textContent = inputVal.value + " question(s) selected";

  let temURL = baseURL + "amount=" + inputVal.value;
  console.log(temURL);
  popPage(temURL);
});

function popPage(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      game.que = data.results;

      outputPage();
    });
}

function outputPage() {
  output.innerHTML = "";
  let question = game.que[game.question];
  game.question++; // move to next question
  console.log(question);

  // Let's build an array with answers
  let answers = question.incorrect_answers;
  answers.push(question.correct_answers);
  console.log(answers);
  const mainDiv = genElement(output, "div", "test");

  //   game.que.forEach((el) => {
  //     console.log(el);
  //   });
}

function genElement(parent, eleType, html) {
  const temp = document.createElement(eleType);
  temp.innerHTML = html;
  parent.append(temp);
  return temp;
}
