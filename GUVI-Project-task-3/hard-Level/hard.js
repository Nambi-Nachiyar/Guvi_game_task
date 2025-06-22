const question = document.getElementById("question");
const answer = document.getElementById("answer");
const keyboard = document.querySelector(".keyboard");
const ans = document.getElementById("ans")

const keys = [
        ["A","N","G","E","R","T","L","C","D","M"],
        ["↵","⌫"]
      ]

const wordList = [
    "garment","tranced","magneto","clanger","cartled","archaic",
    "tangled","granted","cangled","mangled"," gnarled"
]
 
const words = wordList.map(word => word.toUpperCase());
console.log(words);
let Width = 7;
 
window.onload = function(){    
   initialize();
   document.addEventListener('keydown', (e)=>process(e));
}
 let col =0;
 let gameIs = false;

function update(){
    let w ='';
    
    for(let i=0; i<Width; i++){
       let letter = document.getElementById(`key${i}`);
       w += letter.textContent;
      
    }
   console.log(words.length)
    for(let j=0; j<words.length; j++){
        // console.log(w==words[j])
       if(w == words[j]){
            ans.textContent = "🎉🥳🎊🎁 you win 🎉🥳🎊🎁";
            // gameIs = true
            break;
           
        }   
        else {
            ans.textContent = `Not in the List`;
            gameIs = true
        }
    }
}
   


function gameOn(){
     e = {'code':this.id}
    process(e);
}
function process(e){
    // console.log(e.code) 
    if(gameIs){
        // console.log("finised")
        return;
    }
    
    if(e.code == "keyA" || e.code == "keyN" || e.code == "keyG" ||
        e.code == "keyE" || e.code == "keyT" || e.code == "keyC" ||
        e.code == "keyD" || e.code =="keyM"  || e.code == "keyR" ||
        e.code == "keyL" ){

        let letter = document.getElementById(`key${col}`)

        if(col<Width){

               letter.textContent = e.code[3];
               col+=1;

        }
    }
    else if(e.code == "backspace"){
        console.log(col)
        if(col>0){
            col-=1;
               
        }
        let letter = document.getElementById(`key${col}`)
        letter.textContent = "_";
    }
    else if(e.code == "enter-key"){
        update();
    }
    else if(col==Width){
        gameIs=true;
    }
    
   
}


function initialize(){
    
    
       for(let i in keys){
        const kb = document.createElement("div");
        kb.classList.add("key-row")
      
       for(let j in keys[i]){
            const rowKey = document.createElement("span");
            let tem = keys[i]
            rowKey.textContent = tem[j];
            rowKey.classList.add("rows-key");
            if(rowKey.textContent == "↵"){
                rowKey.id = "enter-key"
            }
            else if(rowKey.textContent == "⌫"){
                rowKey.id = "backspace"
            }
            else{
                rowKey.id = `key${tem[j]}`
            }     
             
            kb.appendChild(rowKey)
            rowKey.addEventListener("click",gameOn)
        }
         keyboard.append(kb)

       } 
        for(let i=0; i<Width; i++){
        let letter = document.createElement("span");
        letter.textContent = "_";
        letter.id = "key"+i;
        letter.classList.add ("letter");
        answer.appendChild(letter);
        answer.style.textAlign = "center";
        answer.style.letterSpacing = "10px";
        letter.style.color = "lightgreen";
        answer.style.marginTop = "2.5em";     

     }
   
   
}

