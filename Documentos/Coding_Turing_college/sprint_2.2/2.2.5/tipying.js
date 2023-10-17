//fetch the api for the tipying
//make it display
//make it so you can write it somewhere, lets start with a area text and go from there
//make the time start counting (display on the screen the remaining time)
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
    poemWords=poem.split(" ");
    updateWords()
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
            alert(`You spelled ${correctWords.length} words correctely`);
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

/**Sure, I can help with that. Here’s how you can calculate the typing speed (Words Per Minute) and word accuracy:

    Typing Speed (WPM): Words per minute (WPM) is a measure of typing speed, commonly used in recruitment. For the purposes of WPM measurement, a word is standardized to five characters or keystrokes. So, to calculate WPM:
        Count all typed entries (every 5 characters/keystrokes count as a word)
        Divide by 5 to get the number of words typed
        Divide the number of words by the total time taken in minutes

    Here’s how you can do it in JavaScript:
    let totalEntries = userInput.length; // total characters typed by the user
let timeTaken = totalTime / 60; // total time taken in minutes
let wpm = (totalEntries / 5) / timeTaken; // calculate words per minute



Word Accuracy (%): Word accuracy is the percentage of words that were typed correctly. To calculate word accuracy:

    Count the number of correct words
    Divide by the total number of words typed
    Multiply by 100 to get the percentage

Here’s how you can do it in JavaScript:

let correctWordsCount = correctWords.length; // number of correct words
let totalWordsCount = typedWords.length; // total number of words typed
let accuracy = (correctWordsCount / totalWordsCount) * 100; // calculate accuracy in percentage

Remember to handle cases where totalTime or totalWordsCount could be zero to avoid division by zero errors.

I hope this helps! Let me know if you have any other questions. 😊
*/