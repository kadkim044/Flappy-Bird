let canvas;
let ctx;
const gameWidth=360;
const gameHeight=640;
let birdWidth=34;
let birdHeight=24;
let birdX=gameWidth/8;
let birdY=gameHeight/2;
let gameOver;
let birdImg;
let bottomPipe;
let topPipe;
let pipeX=gameWidth;
let pipeY=0;
let pipeWidth=64;
let pipeHeight=512;
let topPipeImg;
let bottomPipeImg;
let gravity=0.4;
let bird={
    x:birdX,
    y:birdY,
    width:birdWidth,
    height:birdHeight,
}
let score=0;
let velocityY=0;
let pipes=[];
let velocityX=-2;
window.onload=function(){
    canvas=document.getElementById("canvas");
    ctx=canvas.getContext("2d");
    canvas.width=gameWidth;
    canvas.height=gameHeight;
    birdImg=new Image();
    birdImg.src="./flappybird.png";
    birdImg.onload=function(){
        ctx.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height)
    }
    topPipeImg=new Image();
    topPipeImg.src="./toppipe.png";
    bottomPipeImg= new Image();
    bottomPipeImg.src="./bottompipe.png";
    requestAnimationFrame(update);
    setInterval(setPipes,1500);
    window.addEventListener("keydown",moveBird);
    document.addEventListener("touchstart", moveBird);
}
function update(){
    if(gameOver){
        ctx.font="40px Arial";
        ctx.fillStyle="red";
        ctx.fillText("Game Over",gameWidth/4,gameHeight/2);
        return;
    }
    requestAnimationFrame(update);
    ctx.clearRect(0,0,gameWidth,gameHeight);
    bird.y=Math.max(bird.y+velocityY,0);
    velocityY+=gravity
    ctx.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
    if(bird.y+bird.width>gameHeight){
        gameOver=true
    }
    for(let i=0;i<pipes.length;i++){
        let pipe=pipes[i];
        pipe.x+=velocityX
        ctx.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);
        if(!pipe.passed&&bird.x>pipe.x+pipe.width){
            score+=0.5;
            pipe.passed=true
        }
        if(checkColision(bird,pipe)){
            gameOver=true;
        }
        
    }
    while(pipes.length>0&&pipes[0].x<-pipeWidth){
        pipes.shift()
    }
    ctx.font="40px MV Bali";
    ctx.fillStyle="green";
    ctx.fillText(score,5,45)
}
function setPipes(){
    if(gameOver) return;
    let randomPipeY=-gameHeight/4-Math.random()*(pipeHeight/2);
    let space=gameHeight/4;
    topPipe={
        x:pipeX,
        y:randomPipeY,
        width:pipeWidth,
        height:pipeHeight,
        passed:false,
        img:topPipeImg
    }
    pipes.push(topPipe);
    bottomPipe={
        x:pipeX,
        y:randomPipeY+pipeHeight+space,
        width:pipeWidth,
        height:pipeHeight,
        passed:false,
        img:bottomPipeImg,
    }
    pipes.push(bottomPipe);
}
function moveBird(e){
    if(e.code==="Space"||e.code==="ArrowUp"){
        velocityY=-6;
    }
}
function checkColision(a,b){
    return a.x<b.x+b.width&&
    a.x+a.width>b.x&&
    a.y<b.y+b.height&&
    a.y+a.height>b.y
}