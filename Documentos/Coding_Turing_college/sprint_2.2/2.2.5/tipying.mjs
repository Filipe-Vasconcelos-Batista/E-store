import { displayCharts, createCharts, getRandomPoem, displayPoem, colorInput, startCountdown, handleSpace, saveData, compareResults } from './functions.mjs';
let results = JSON.parse(localStorage.getItem('typingTestResults')) || [];
let displayer=document.getElementsByClassName("display")[0]
let countDownStarted=false;
let poemWords=[];
let correctWords=[];
let typedWords=[];

getRandomPoem();
displayPoem(poemWords);

document.getElementsByClassName("input")[0].addEventListener("input", (event) => {
    const userInput = event.target.value;
    const poem = displayer.innerText;

    document.getElementsByClassName("coloredText")[0].innerHTML = colorInput(userInput, poem);

    if (!countDownStarted && userInput.length > 0) {
        countDownStarted = true;
        startCountdown(typedWords, correctWords, countDownStarted);
    }

    handleSpace(userInput, poemWords,correctWords,typedWords);
});

displayCharts(results);
createCharts(results);