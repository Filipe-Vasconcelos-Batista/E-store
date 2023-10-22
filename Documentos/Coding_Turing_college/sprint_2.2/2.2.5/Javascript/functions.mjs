export async function getRandomPoem() {
  //get the poem from the api
  try {
    const response = await fetch("https://poetrydb.org/random");
    if (!response.ok) {
      throw new Error("Ups ... Failed to Retrieve the poem");
    }
    const poems = await response.json();
    const randomIndex = Math.floor(Math.random() * poems.length);
    const randomPoem = poems[randomIndex];
    return [randomPoem.title, randomPoem.author, randomPoem.lines.join("\n")];
  } catch (error) {
    return "there has been a problem with a fetch operation";
  }
}

export async function displayPoem(state) {
  //display the poem information
  let [title, author, poem] = await getRandomPoem();
  poem = poem.replace(/\n/g, " ");
  let oldPoemWords = poem.split(" ").filter((word) => word !== "");
  state.poemWords.push(...oldPoemWords);
  state.resetPoem = [...state.poemWords];
  if (state.poemWords.length < 60) {
    await displayPoem(state);
  } else {
    updateWords(state);
  }
}

export function updateWords(state) {
  document.getElementsByClassName("word1")[0].innerHTML =
    state.typedWords[state.typedWords.length - 2] || "";
  document.getElementsByClassName("word2")[0].innerHTML =
    state.typedWords[state.typedWords.length - 1] || "";
  document.getElementsByClassName("word3")[0].innerHTML =
    state.poemWords[0] || "";
  document.getElementsByClassName("word4")[0].innerHTML =
    state.poemWords[1] || "";
  document.getElementsByClassName("word5")[0].innerHTML =
    state.poemWords[2] || "";
}

export function colorInput(userInput, poem) {
  //to create a red or green background
  let coloredInput = "";
  for (let i = 0; i < userInput.length; i++) {
    if (poem[i] === userInput[i]) {
      coloredInput +=
        "<span style='background-color:green'>" + userInput[i] + "</span>";
    } else {
      coloredInput +=
        "<span style='background-color: red'>" + userInput[i] + "</span>";
    }
  }
  return coloredInput;
}

export function startCountdown(state) {
  // Update the countdown every second
  let countdownElement = document.getElementsByClassName("countdown")[0]; // Get the countdown element
  let timeLeft = 60;
  state.countdownInterval = setInterval(() => {
    timeLeft--;
    countdownElement.innerText = timeLeft;

    let totalCharacters = state.correctWords.join(" ").length;
    let wpm = totalCharacters / 5;
    let accuracy = (state.correctWords.length / state.typedWords.length) * 100;
    let wpmElement = document.getElementsByClassName("wpm")[0];
    let accuracyElement = document.getElementsByClassName("accuracy")[0];
    wpmElement.innerText = `WPM: ${wpm}`;
    accuracyElement.innerText = `Accuracy: ${accuracy.toFixed(2)}%`;

    if (timeLeft <= 0) {
      clearInterval(state.countdownInterval);
      saveData(wpm, accuracy);
      let comparisonMessage = compareResults(
        state.correctWords,
        state.typedWords
      );
      let alertMessage = `You spelled ${
        state.correctWords.length
      } words correctly at a speed of ${wpm}WPM with an accuracy of ${accuracy.toFixed(
        2
      )}%.`;
      if (comparisonMessage !== "") {
        alertMessage += ` ${comparisonMessage}`;
      }
      alert(alertMessage);
      resetTest(state);
    }
  }, 1000);
}

export function handleSpace(userInput, state) {
  /**erase the white spaces */
  if (userInput[userInput.length - 1] === " ") {
    const lastWordTyped = userInput.trim();
    const correspondingPoemWords = state.poemWords.shift();
    if (lastWordTyped === correspondingPoemWords) {
      state.correctWords.push(lastWordTyped);
    }
    state.typedWords.push(correspondingPoemWords);
    document.getElementsByClassName("input")[0].value = "";
    document.getElementsByClassName("coloredText")[0].innerHTML = "";
    updateWords(state);
  }
}

export function saveData(wpm, accuracy) {
  /**save the data in the user machine */
  let results = JSON.parse(localStorage.getItem("typingTestResults")) || [];
  if (accuracy === null) {
    accuracy = 0;
  }
  results.push({ wpm: wpm, accuracy: accuracy });
  localStorage.setItem("typingTestResults", JSON.stringify(results));
}

export function compareResults(state) {
  /** compare the results of the various games */
  let results = JSON.parse(localStorage.getItem("typingTestResults")) || [];
  if (results.length > 1) {
    let lastResult = results[results.length - 1];
    let secondLastResult = results[results.length - 2];

    if (
      lastResult.wpm > secondLastResult.wpm &&
      lastResult.accuracy > secondLastResult.accuracy
    ) {
      return `Great Job! Last time you only had a WPM score of ${
        secondLastResult.wpm
      } and an accuracy of ${secondLastResult.accuracy.toFixed(2)}%.`;
    } else if (
      lastResult.wpm < secondLastResult.wpm &&
      lastResult.accuracy < secondLastResult.accuracy
    ) {
      return `Keep practicing! Last time you had a WPM score of ${
        secondLastResult.wpm
      } and an accuracy of ${secondLastResult.accuracy.toFixed(2)}%.`;
    } else {
      return `Getting better buddy! Last time you had a WPM score of ${
        secondLastResult.wpm
      } and an accuracy of ${secondLastResult.accuracy.toFixed(2)}%.`;
    }
  }
}

export function displayCharts(state) {
  /**display the chart */
  let resultsDiv = document.getElementsByClassName("results-table")[0];
  state.results.forEach((result, index) => {
    let accuracy =
      result.accuracy !== null ? result.accuracy.toFixed(2) : "N/A";
    resultsDiv.innerHTML += `<p>Game ${index + 1}: ${
      result.wpm
    } WPM, ${accuracy}% accuracy</p>`;
  });
}

export function createCharts(state) {
  /**create the chart */
  let ctx = document.getElementsByClassName("chart")[0].getContext("2d");
  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: state.results.map((_, index) => `Game ${index + 1}`),
      datasets: [
        {
          label: "WPM",
          data: state.results.map((result) => result.wpm),
          borderColor: "rgb(75, 192, 192)",
          fill: false,
        },
        {
          label: "Accuracy",
          data: state.results.map((result) => result.accuracy),
          borderColor: "rgb(255, 99, 132)",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: { display: true },
        y: { display: true },
      },
    },
  });
}

export async function resetTest(state) {
  //reset the game
  document.getElementsByClassName("input")[0].value = "";
  document.getElementsByClassName("coloredText")[0].innerHTML = "";
  clearInterval(state.countdownInterval);
  document.getElementsByClassName("countdown")[0].innerText = 60;
  state.countDownStarted = false;
  state.poemWords.length = 0;
  state.correctWords.length = 0;
  state.typedWords.length = 0;
  state.resetPoem.length = 0;
  displayPoem(state)
}

export async function restartTest(state) {
  // restart
  document.getElementsByClassName("input")[0].value = "";
  document.getElementsByClassName("coloredText")[0].innerHTML = "";
  clearInterval(state.countdownInterval);
  document.getElementsByClassName("countdown")[0].innerText = 60;
  state.countDownStarted = false;
  state.poemWords = [...state.resetPoem];
  state.correctWords.length = 0;
  state.typedWords.length = 0;
  updateWords(state);
  state.countDownStarted = true;
  startCountdown(state);
}
