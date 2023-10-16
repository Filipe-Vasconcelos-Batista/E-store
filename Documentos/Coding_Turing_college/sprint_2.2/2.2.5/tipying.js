//fetch the api for the tipying
//make it display
//make it so you can write it somewhere, lets start with a area text and go from there
//make the time start counting (display on the screen the remaining time)
const displayer=document.getElementsByClassName("display")[0]
async function getRandomPoem(){
    //get the poem from the api
    try{
        const response= await fetch("https://poetrydb.org/random");
        if(!response.ok){
            throw new Error("Ups ... Failed to Retieve the poem");
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
    displayer.innerHTML= poem
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
})
