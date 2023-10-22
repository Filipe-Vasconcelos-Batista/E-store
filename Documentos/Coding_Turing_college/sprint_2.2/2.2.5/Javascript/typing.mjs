import {
  displayCharts,
  createCharts,
  getRandomPoem,
  displayPoem,
  colorInput,
  startCountdown,
  handleSpace,
  resetTest,
  restartTest,
} from "./functions.mjs";
let state = {
  results: JSON.parse(localStorage.getItem("typingTestResults")) || [],
  displayer: document.getElementsByClassName("display")[0],
  countDownStarted: false,
  poemWords: [],
  correctWords: [],
  typedWords: [],
  resetPoem: [],
  countdownInterval: null
};

document.addEventListener("DOMContentLoaded", async function() {
  await displayPoem(state);
  
  document
    .getElementsByClassName("input")[0]
    .addEventListener("input", (event) => {
      const userInput = event.target.value;
      const poem = state.displayer.innerText;
  
      document.getElementsByClassName("coloredText")[0].innerHTML = colorInput(
        userInput,
        poem
      );
  
      if (!state.countDownStarted && userInput.length > 0) {
        state.countDownStarted = true;
        startCountdown(state);
      }
  
      handleSpace(userInput, state);
    });
    
  document.getElementsByClassName("input")[0].addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        // Call your reset function here
        resetTest(state);
      }else if(event.key === 'Enter'){
        restartTest(state)
      }
  });
  
  displayCharts(state);
  createCharts(state);
});