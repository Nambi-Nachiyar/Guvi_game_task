const board = document.querySelector(".board")
const keyboard = document.querySelector(".keyboard")
let Height = 6;
let Width = 5;

let row = 0;
let col = 0;


let wordList = [
        "apple", "grape","plant","chair","light","stone","water",
        "brick","cloud","smile"
]
let guessList = [
    "crisp","bluff","knack","scoff","glint","waltz","nymph","fjord",
    "apple", "grape","plant","chair","light","stone","water",
    "brick","cloud","smile","banal","crimp","envoy","guile","maxim",
    "proxy","thump"
]   

const keys = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Enter","Z","X","C","V","B","N","M","Back"]
]
console.log(keys.length)
let guess = wordList.concat(guessList)
let word = guess[Math.floor(Math.random()*guess.length)].toUpperCase()
console.log(word)

// Create the Boxes
window.onload = function(){
    initialize();
}

function initialize(){
    for(let i = 0; i<Height; i++){
        for(let j = 0; j<Width; j++){
            let box = document.createElement("span");
            box.textContent = '';
            box.id = i.toString()+"-"+j.toString();
            box.classList.add("keys");
            board.append(box)
           
        }
    }

    // Mobile clicks
   function gameStarts(){
        e = {"code":this.id}
        // console.log(e.code)
        if(gameOver) return; 
        if("KeyA"<=e.code && e.code<="KeyZ"){
            let currentB = document.getElementById(row.toString()+"-"+col.toString())
            if(col<Width){
                currentB.textContent = e.code[3];
                col+=1;
            }
            // console.log(col)//col->5 so that the condition is break out
        }
        else if("Backspace"==e.code){
            console.log(col)
            if(col>0 && col<=Width){
                col-=1;
            }
            let currentB = document.getElementById(row.toString()+"-"+col.toString())
            currentB.textContent=' ';
        }
        else if("Enter"==e.code){
            update();
        }  
        if(!gameOver && row==Height){
            gameOver = true;
            document.getElementById("answer").textContent = `${word}{keep try🙂}`;
        }      
    
   }

    //  Mobile keyboards
     for(let i = 0; i<keys.length; i++){
        
        let rowKey = document.createElement("div");
        rowKey.classList.add("rowKey")        
        for(let j=0; j<keys[i].length; j++){
            let key_row = document.createElement("button");
            key_row.textContent = keys[i][j];
            key_row.classList.add("key_row");
            if(key_row.textContent =="Back"){
               key_row.id = "Backspace"
            }
            else if(key_row.textContent == "Enter"){
                key_row.id = `Enter`
            }
            else{
                 key_row.id = `Key${keys[i][j]}`;
            }
            rowKey.append(key_row)
            key_row.addEventListener("click",gameStarts)
        }
       keyboard.appendChild(rowKey);
     } 


        document.addEventListener("keyup",(e)=>gameStart(e))
}
let gameOver = false;

// Desktop and laptop
function gameStart(e){
    // console.log(e.code)
    if(gameOver) return; 
    if("KeyA"<=e.code && e.code<="KeyZ"){
        let currentB = document.getElementById(row.toString()+"-"+col.toString())
        if(col<Width){
            currentB.textContent = e.code[3];
            col+=1;
        }
        // console.log(col)//col->5 so that the condition is break out
    }
    else if("Backspace"==e.code){
        console.log(col)
        if(col>0 && col<=Width){
            col-=1;
        }
        let currentB = document.getElementById(row.toString()+"-"+col.toString())
        currentB.textContent=' ';
    }
    else if("Enter"==e.code){
        update();
    }  
    if(!gameOver && row==Height){
        gameOver = true;
        document.getElementById("answer").textContent = `${word}{keep try🙂}`;
    }      
    
}

function update(){
    let w = '';

    let count={};//APPLE -> {A: 1, P: 2, L: 1, E: 1}
    for(let i = 0; i<word.length; i++){
        let letter=word[i];
        if(count[letter]){//count[letter]==1? Means true? that means all unique words contains only 0
            count[letter]+=1;//if the word already present k=1+1
        }else{
            count[letter]=1; //all unique words
        }
    }


    for(let c=0; c<Width; c++){
        let currentB = document.getElementById(row.toString()+'-'+c.toString());
        let letter = currentB.textContent;
        w += letter;
        if(letter && word[c]==letter){
            currentB.classList.add("correct");
            count[letter]-=1;
        }
        else if(!currentB.classList.contains("correct") && word.includes(letter) && letter && count[letter]>0){
            currentB.classList.add("present");
            count[letter]-=1;
        }
        else{
            currentB.classList.add("absent")
        }
       
    }
     if(w==word){
        gameIs=true;
        document.getElementById("answer").textContent = "🎉🥳 Congratulation You WON 🎉🥳"
     }
     console.log(count)
   
    row+=1;
    col =0;
}


