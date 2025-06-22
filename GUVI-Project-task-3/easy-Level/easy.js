const buttons = document.querySelectorAll('button')

var Height = 4;
var Width = 3;
let gameOver = false;
let row = 0;
let col = 0;

let words = [
            "ant", "bag", "cat", "dig", "egg",
            "ear", "fan", "gap", "hat", "ink", "jam", 
            "kit", "log", "map", "net", "owl", "pen", "run", 
            "sun", "tap", "van"
          ]
console.log(words.length)
let word = words[Math.floor(Math.random()*words.length)].toUpperCase()
console.log(word)      
window.onload = function(){
    initialize();
}

function initialize(){

    // greate row and colunms

    for(let r = 0;r<Height;r++){
        for(let c = 0;c<Width;c++){
            box = document.createElement('div')
            box.id = r.toString()+'-'+c.toString()
            board.appendChild(box)
            // console.log(box.id)
            box.classList.add('box')
        }
    }
    for(let i=0;i<buttons.length;i++){
        buttons[i].addEventListener('click',startGame)
    }
 document.addEventListener('keyup',(e)=>process(e))    
}


// Starting Function-1
function startGame(){
   e = {'code':this.id}
   console.log(e.code)
 process(e);
}

function process(e){
    if(gameOver) return;
    if("keyA"<=e.code && "keyZ">=e.code ){
       if(col<Width){
            let curBox = document.getElementById(row.toString()+'-'+col.toString())
            if(curBox.textContent ==''){
                curBox.textContent = e.code[3];
                col+=1;
            }
       }      
        
    }
    else if(e.code == 'backspace'){
        if(col>0 && col<=Width){
            col-=1
        }
         let curBox = document.getElementById(row.toString()+'-'+col.toString())
        curBox.textContent = ""
    }
    else if(e.code == 'enter-key'){
        update();
        row += 1;//going to next line
        col = 0;//start with first box
    }
    if(!gameOver && row==Height){
        gameOver = true;
        document.getElementById('answer').textContent = `😞 ${word}(keep try) 😞`;
    }
}

function update(){
    let correct = 0;
    let letterCount = {};
    
    for(let i=0; i<word.length;i++){
        let letter = word[i];
        if(letterCount[letter]){
            letterCount[letter]+=1;
        }else{
            letterCount[letter]=1;
        }
    }
    // first iteration,check all elements is correct
    for(let i=0; i<Width; i++){
        let curBox = document.getElementById(row.toString()+'-'+i.toString())
        let letter = curBox.textContent;
        if(letter==word[i]){
            curBox.classList.add("correct")
            correct+=1;
            letterCount[letter]-=1;
            
        }
        if(correct == Width){
            gameOver=true;
        }
      
    }
    // checking the no.of word presents
    for(let i=0; i<Width; i++){
        let curBox = document.getElementById(row.toString()+'-'+i.toString())
        let letter = curBox.textContent;
        if(!curBox.classList.contains('correct')){
            if(word.includes(letter) && letterCount[letter]>0){
                curBox.classList.add("present")
                letterCount[letter]-=1;
            }
        
            else{
                curBox.classList.add("absent")
            }
        }
             
        
    }
  
    
} 



   
    



