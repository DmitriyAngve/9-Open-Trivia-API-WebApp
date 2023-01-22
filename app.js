const btn1 = document.querySelector(".btn");
const h1 = document.querySelector("h1");
const output = document.querySelector(".output");
const inputVal = document.querySelector(".val");
const baseURL = "https://opentdb.com/api.php?";
// https://opentdb.com/api.php?amount=9&category=14
window.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM ready");
  btn1.textContent = "Start Game";
  inputVal.setAttribute("type", "number");
  inputVal.value = 10;
});

btn1.addEventListener("click", (e) => {
  console.log("ready");
});
