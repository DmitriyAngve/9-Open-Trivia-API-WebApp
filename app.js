const btn1 = document.querySelector(".btn");
const h1 = document.querySelector("h1");
h1.textContent = "Trivia DataBase Game";
const output = document.querySelector(".output");
const output1 = genElement(
  document.body,
  "div",
  "Please Make Your Selection<br> № Questions"
);
output1.classList.add("box");
const inputVal = document.querySelector(".val");

output1.append(inputVal);

// Lets populate select list dynamically
const sel1 = genElement(output1, "select", "");
const sel2 = genElement(output1, "select", "");

output1.append(btn1);

const baseURL = "https://opentdb.com/api.php?";
// https://opentdb.com/api.php?amount=9&category=14
const game = { que: [], question: 0, eles: [], score: 0 };
const cats = [
  { title: "General", num: 9 },
  { title: "Geography", num: 22 },
  { title: "Mythology", num: 20 },
  { title: "Art", num: 25 },
  { title: "Animals", num: 27 },
];

const dif = ["easy", "medium", "hard"];

window.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM ready");
  getSelections();

  //   testinsert();

  btn1.textContent = "Start Game";
  inputVal.setAttribute("type", "number");
  inputVal.value = 10;
});

function getSelections() {
  cats.forEach((cat) => {
    console.log(cat);
    const optEle = genElement(sel1, "option", cat.title);
    optEle.value = cat.num;
  });

  dif.forEach((d) => {
    console.log(d);
    const optEle = genElement(sel2, "option", d);
    optEle.value = d;
  });
}

btn1.addEventListener("click", (e) => {
  output1.style.display = "none";
  h1.textContent = inputVal.value + " question(s) selected";
  let temURL = `${baseURL}amount=${inputVal.value}&difficulty=${sel2.value}&category=${sel1.value}`;
  console.log(temURL);
  popPage(temURL);
});

function testinsert() {
  for (let x = 0; x < 500; x++) {
    let tempArr = [0, 0, 0];
    let ranIndex = Math.floor(Math.random() * tempArr.length + 1);
    tempArr.splice(ranIndex, 0, 1);
    output.innerHTML += JSON.stringify(tempArr) + ": " + ranIndex + "<br>";
  }
}

function popPage(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      game.que = data.results;

      outputPage();
    });
}

function outputPage() {
  // condition check to see if the question value and what else we can do is we can look at the question value or the game question

  if (game.question >= game.que.length) {
    output.innerHTML = `<div>Your Score was ${game.score} out of ${game.que.length}</div>`;
    game.score = 0;
    output1.style.display = "block";
    game.question = 0;
  } else {
    output.innerHTML = "";

    let question = game.que[game.question];
    game.question++; // move to next question
    h1.textContent = `Question ${game.question} of ${game.que.length} - SCORE : ${game.score}`;
    console.log(question);

    // Let's build an array with answers
    let answers = question.incorrect_answers;

    // Random places answers (random spots)
    let ranIndex = Math.floor(Math.random() * (answers.length + 1)); // this give a random index of value that where we can insert on page
    console.log(ranIndex);
    answers.splice(ranIndex, 0, question.correct_answer);

    //   answers.push(question.correct_answer);
    console.log(answers);

    const mainDiv = genElement(output, "div", "");
    const que1 = genElement(mainDiv, "div", question.question);

    game.eles.length = 0;

    const optsDiv = genElement(output, "div", "");
    answers.forEach((opt) => {
      const opt1 = genElement(optsDiv, "button", opt);
      game.eles.push(opt1);
      if (opt == question.correct_answer) {
        opt1.bgC = "green";
      } else {
        opt1.bgC = "red";
      }
      opt1.addEventListener("click", (e) => {
        game.eles.forEach((btnv) => {
          btnv.disabled = true;
          btnv.style.backgroundColor = btnv.bgC;
        });
        const message = genElement(
          optsDiv,
          "div",
          `You got it Incorrect! <small>${question.correct_answer} was correct.</small><br>`
        );

        if (opt == question.correct_answer) {
          console.log("correct");
          message.innerHTML = `You got it Correct! <small>${opt} was correct.</small><br>`;
          game.score++;

          opt1.style.backgroundColor = "green";
        } else {
          console.log("wrong");
          opt1.style.backgroundColor = "red";
        }

        h1.textContent = `Question ${game.question} of ${game.que.length} - SCORE : ${game.score}`;
        nextQue(message); // when we generate a message or when we generate the next question, we can send in that as the parent
        console.log(game);
      });
    });

    //   game.que.forEach((el) => {
    //     console.log(el);
    //   });
  }
}

function nextQue(parent) {
  const btn2 = genElement(parent, "button", "Next Question");
  btn2.addEventListener("click", outputPage);
}

function genElement(parent, eleType, html) {
  const temp = document.createElement(eleType);
  temp.innerHTML = html;
  parent.append(temp);
  return temp;
}
