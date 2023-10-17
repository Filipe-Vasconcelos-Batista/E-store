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
