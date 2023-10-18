const displayer=document.getElementsByClassName("display")[0]
let countDownStarted=false;
const correctWords=[];
let poemWords=[];
let typedWords=[];
async function getRandomPoem(){
    //get the poem from the api
    try{
        const response= await fetch("https://poetrydb.org/random");
        if(!response.ok){
            throw new Error("Ups ... Failed to Retrieve the poem");
        }
        const poems= await response.json();
        const randomIndex=Math.floor(Math.random()*poems.length);
        const randomPoem=poems[randomIndex];
        return [randomPoem.title,randomPoem.author,randomPoem.lines.join("\n")];
    }catch(error){
        return("there has been a problem with a fetch operation")
    }
}
async function displayPoem(){
    //display the poem information
    let [title,author,poem]= await getRandomPoem();
    poem = poem.replace(/\n/g, " ");
    let oldPoemWords=poem.split(" ").filter(word => word !== "");
    poemWords=[...poemWords, ...oldPoemWords];
    if (poemWords.length <60){
        await displayPoem();
    }else {
        updateWords()
    }
}

function updateWords(){
    document.getElementsByClassName("word1")[0].innerHTML = typedWords[typedWords.length -2] || '';
    document.getElementsByClassName("word2")[0].innerHTML = typedWords[typedWords.length -1] || '';
    document.getElementsByClassName("word3")[0].innerHTML = poemWords[0] || '';
    document.getElementsByClassName("word4")[0].innerHTML = poemWords[1] || '';
    document.getElementsByClassName("word5")[0].innerHTML = poemWords[2] || '';
}
getRandomPoem()
displayPoem()
document.getElementsByClassName("input")[0].addEventListener("input", (event)=>{
    const userInput=event.target.value;
    const poem= displayer.innerText;
    let coloredInput="";
    for(let i=0; i<userInput.length; i++){
        if(poem[i]=== userInput[i]){
            coloredInput += "<span style='background-color:green'>"+ userInput[i]+ "</span>";
        }else{
            coloredInput += "<span style='background-color: red'>"+ userInput[i]+ "</span>";
        }
    }
    document.getElementsByClassName("coloredText")[0].innerHTML=coloredInput

    if(!countDownStarted && userInput.length>0){
        countDownStarted=true;
        setTimeout(()=>{
            let totalWords= typedWords.length;
            let wpm=(totalWords/5);
            let accuracy=(correctWords.length/typedWords.length)*100;
            saveData(wpm,accuracy)
            let comparisonMessage= compareResults()
            alert(`You spelled ${correctWords.length} words correctely at a speed of ${wpm}WPM with an accuracy of ${accuracy.toFixed(2)}%.`);
            if (comparisonMessage !== '') {
                alertMessage += ` ${comparisonMessage}`;
            }
            location.reload()
            document.getElementsByClassName("input")[0].value= "";
            document.getElementsByClassName("coloredText")[0].innerHTML="";
            correctWords=[];
            countDownStarted= false;
        },60000)
    }
    if (userInput[userInput.length -1]=== " "){
        const lastWordTyped=userInput.trim();
        const correspondingPoemWords=poemWords.shift();
        if (lastWordTyped === correspondingPoemWords){
            correctWords.push(lastWordTyped)
        }
        typedWords.push(correspondingPoemWords)
        console.log(typedWords)
        document.getElementsByClassName("input")[0].value="";
        document.getElementsByClassName("coloredText")[0].innerHTML="";
        updateWords()
        }
})

const saveData= (wpm, accuracy)=>{
    let results =JSON.parse(localStorage.getItem("typingTestResults"))||[];
    results.push({wpm,accuracy});
    localStorage.setItem("typingTestResults",JSON.stringify(results));
}
const compareResults=()=>{
    let results= JSON.parse(localStorage.getItem("typingTestResults")) || [];
    if (results.length > 1){
        let lastResult = results[results.length -1];
        let secondLastResult=results[results.length -2];

        if(lastResult.wpm > secondLastResult.wpm && lastResult.accuracy> secondLastResult.accuracy){
            return `Great Job! Last time you only had a WPM score of ${secondLastResult.wpm} and an accuracy of ${secondLastResult.accuracy.toFixed(2)}%.`;
        }else if(lastResult.wpm < secondLastResult.wpm && lastResult.accuracy < secondLastResult.accuracy){
            return `Keep practicing! Last time you had a WPM score of ${secondLastResult.wpm} and an accuracy of ${secondLastResult.accuracy.toFixed(2)}%.`;
        }else{
            return `Getting better buddy! Last time you had a WPM score of ${secondLastResult.wpm} and an accuracy of ${secondLastResult.accuracy.toFixed(2)}%.`;
        }
    }
}

function displayResults() {
    let resultsDiv = document.getElementsByClassName('results')[0];
    results.forEach((result, index) => {
        resultsDiv.innerHTML += `<p>Game ${index + 1}: ${result.wpm} WPM, ${result.accuracy.toFixed(2)}% accuracy</p>`;
    });
}

export function displayCharts() {
    let resultsDiv = document.getElementsByClassName('results')[0];
    results.forEach((result, index) => {
        resultsDiv.innerHTML += `<p>Game ${index + 1}: ${result.wpm} WPM, ${result.accuracy.toFixed(2)}% accuracy</p>`;
    });
}
// Function to create the chart
export function createCharts() {
    let ctx = document.getElementsByClassName('chart')[0].getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: results.map((_, index) => `Game ${index + 1}`),
            datasets: [{
                label: 'WPM',
                data: results.map(result => result.wpm),
                borderColor: 'rgb(75, 192, 192)',
                fill: false
            }, {
                label: 'Accuracy',
                data: results.map(result => result.accuracy),
                borderColor: 'rgb(255, 99, 132)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { display: true },
                y: { display: true }
            }
        }
    });
}
