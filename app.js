let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "blue", "green"];
let highScore = 0;
let started  = false;
let level = 0;
let h2 = document.querySelector("h2");

function highS (level){
    if (level >= highScore) {
        highScore = level;
    }

    let high = document.querySelector(".high");
    high.innerText = "High Score : " + highScore;
    
}


document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game Started");
        started = true;

        levelUp();
    }
}); 

function levelUp(){
    userSeq = [];
    level++;
   
    h2.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random() * 3);
    let randomColor =  btns[randomIndex];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn); 
}

function gameFlash(randomBtn) {
    randomBtn.classList.add("flash");
    setTimeout(function () {
        randomBtn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function btnPress (){
    // console.log(this);
    userFlash(this);
    
    let userColor = this.getAttribute("id");
    userSeq.push(userColor);
    
    checkResult(userSeq.length - 1);
    console.log(userSeq);
}


function checkResult(idx){
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
            highS(level);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level-1}</b> <br>  Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        reset();
        highS();
    }
}



let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset () {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}