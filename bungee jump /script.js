const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const card = document.getElementById("card");
const cardScore = document.getElementById("card-score");


let player = null;
let score = 0;

let scoreIncrement = 0;
let arrayBlocks = [];

let enemySpeed = 5;

let canScore = true;

let presetTime = 1000;


function startGame() {
    player = new Player(150,350,50,"blue");
    arrayBlocks = [];
    score = 0;
    scoreIncrement = 0;
    enemySpeed = 5;
    canScore = true;
    presetTime = 1000;
}

function squaresColliding(player,block){
    let s1 = Object.assign(Object.create(Object.getPrototypeOf(player)), player);
    let s2 = Object.assign(Object.create(Object.getPrototypeOf(block)), block);
    
    s2.size = s2.size - 10;
    s2.x = s2.x + 10;
    s2.y = s2.y + 10;
    return !(
        s1.x>s2.x+s2.size || 
        s1.x+s1.size<s2.x || 
        s1.y>s2.y+s2.size || 
        s1.y+s1.size<s2.y 
    )
}


function isPastBlock(player, block){
    return(
        player.x + (player.size / 2) > block.x + (block.size / 4) && 
        player.x + (player.size / 2) < block.x + (block.size / 4) * 3
    )
}

function getRandomNumber(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}






class AvoidBlock {
    constructor(size, speed){
        this.x = canvas.width + size;
        this.y = 400 - size;
        this.size = size;
        this.color = "orange";
        this.slideSpeed = speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }

    slide() {
        this.draw();
        this.x -= this.slideSpeed;
    }
    
}

class Player {
    constructor(x,y,size,color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.jumpHeight = 12;
        this.shouldJump = false;
        this.jumpCounter = 0;
        this.jumpUp = true;
        this.spin = 0;
        this.spinIncrement = 90 / 32;
    }

    draw() {
        this.jump();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
       if(this.shouldJump) this.counterRotation();
    }

    jump() {
        if(this.shouldJump){
            this.jumpCounter++;
            if(this.jumpCounter < 15){
            this.y -= this.jumpHeight;
            }else if(this.jumpCounter > 14 && this.jumpCounter < 19){
                this.y += 0;
            }else if(this.jumpCounter < 33){
            this.y += this.jumpHeight;
            }
            this.rotation();
            if(this.jumpCounter >= 32){
                this.counterRotation();
                this.spin = 0;
                this.shouldJump = false;
            }
        }    
    }
    

    rotation() {
        let offsetXPosition = this.x + (this.size / 2);
        let offsetYPosition = this.y + (this.size / 2);
        ctx.translate(offsetXPosition,offsetYPosition);
        ctx.rotate(this.spin * Math.PI / 180);
        ctx.rotate(this.spinIncrement * Math.PI / 180 );
        ctx.translate(-offsetXPosition,-offsetYPosition);
        this.spin += this.spinIncrement;
    }

    counterRotation() {
     
        let offsetXPosition = this.x + (this.size / 2);
        let offsetYPosition = this.y + (this.size / 2);
        ctx.translate(offsetXPosition,offsetYPosition);
        ctx.rotate(-this.spin * Math.PI / 180 );
        ctx.translate(-offsetXPosition,-offsetYPosition);
    }

}

let animationId = null;
function animate() {
    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
   
    drawBackgroundLine();
    drawScore();

    player.draw();

   
    shouldIncreaseSpeed();

    arrayBlocks.forEach((arrayBlock, index) => {
        arrayBlock.slide();
       
        if(squaresColliding(player, arrayBlock)){
            gameOverSFX.play();
            cardScore.textContent = score;
            card.style.display = "block";
            cancelAnimationFrame(animationId);
        }
       
        if(isPastBlock(player, arrayBlock) && canScore){
            canScore = false;
            scoreSFX.currentTime = 0;
            scoreSFX.play();
            score++;
            
        }

        if((arrayBlock.x + arrayBlock.size) <= 0){
            setTimeout(() => {
                arrayBlocks.splice(index, 1);
            }, 0)
        }
    });
    
}

function randomInterval(timeInterval) {
    let returnTime = timeInterval;
    if(Math.random() < 0.5){
        returnTime += getRandomNumber(presetTime / 3, presetTime * 1.5);
    }else{
        returnTime -= getRandomNumber(presetTime / 5, presetTime / 2);
    }
    return returnTime;
}

function generateBlocks() {


    let timeDelay = randomInterval(presetTime);
    arrayBlocks.push(new AvoidBlock(50, enemySpeed));


    setTimeout(generateBlocks, timeDelay);
}


function drawBackgroundLine() {
    ctx.beginPath();
    ctx.moveTo(0,400);
    ctx.lineTo(600,400);
    ctx.lineWidth = 1.9;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function drawScore() {
    ctx.font = "80px Arial";
    ctx.fillStyle = "black";
    let scoreString = score.toString();
    let xOffset = ((scoreString.length - 1) * 20);
    ctx.fillText(scoreString, 280 - xOffset, 100);
}

function shouldIncreaseSpeed() {
        if(scoreIncrement + 10 === score){
            scoreIncrement = score;
            enemySpeed++;
            presetTime >= 100 ? presetTime -= 100 : presetTime = presetTime / 2;
            arrayBlocks.forEach(block => {
                block.slideSpeed = enemySpeed;
            });
            console.log("Speed increased");
        }
}

startGame();
animate();
setTimeout(() => {
    generateBlocks();
}, randomInterval(presetTime))

addEventListener("keydown", e => {
    if(e.code === 'Space'){
        if(!player.shouldJump){
            jumpSFX.play();
            player.jumpCounter = 0;
            player.shouldJump = true;
            canScore = true;
        }
    }
});

function restartGame(button) {
    card.style.display = "none";
    button.blur();
    startGame();
    requestAnimationFrame(animate);
}


let jumpSFX = new Audio("https://archive.org/download/jump_20210424/jump.wav");