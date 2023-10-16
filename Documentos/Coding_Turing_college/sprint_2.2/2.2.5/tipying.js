//fetch the api for the tipying
//make it display
//make it so you can write it somewhere, lets start with a area text and go from there
//make the time start counting (display on the screen the remaining time)
async function getRandomPoem(){
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
    let [title,author,poem]= await getRandomPoem();
    const displayer=document.getElementsByClassName("display")[0]
    displayer.innerHTML= poem
}
getRandomPoem()
displayPoem()

/**: "IF I were to own this countryside\nAs far as a man in a day could ride,\nAnd the Tyes were mine for giving or letting,--\nWingle Tye and Margaretting\nTye,--and Skreens, Gooshays, and Cockerells,\nShellow, Rochetts, Bandish, and Pickerells,\nMarlins, Lambkins, and Lillyputs,\nTheir copses, ponds, roads, and ruts,\nFields where plough-horses steam and plovers\nFling and whimper, hedges that lovers\nLove, and orchards, shrubberies, walls\nWhere the sun untroubled by north wind falls,\nAnd single trees where the thrush sings well\nHis proverbs untranslatable,\nI would give them all to my son\nIf he would let me any one\nFor a song, a blackbird's song, at dawn.\nHe should have no more, till on my lawn\nNever a one was left, because I\nHad shot them to put them into a pie,--\nHis Essex blackbirds, every one,\nAnd I was left old and alone.\n\nThen unless I could pay, for rent, a song\nAs sweet as a blackbird's, and as long--\nNo more--he should have the house, not I:\nMargaretting or Wingle Tye,\nOr it might be Skreens, Gooshays, or Cockerells,\nShellow, Rochetts, Bandish, or Pickerells,\nMartins, Lambkins, or Lillyputs,\nShould be his till the cart tracks had no ruts." */