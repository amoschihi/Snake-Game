const cvs = document.getElementById('game');
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "images/ground.png";

const foodImg = new Image();
foodImg.src = "images/apple.png";

// create snake
let snake = [];

snake[0] = {
	x: 9 * box,
	y: 10 * box
}

// create the food
let food = {
	x: Math.floor(Math.random()*17+1) * box,
	y: Math.floor(Math.random()*15+3) * box
}

//create score
let score = 0;

// control the snake 
document.addEventListener("keydown",direction);

function direction(event){
	
}

// draw everything to the canvas

function draw(){
	ctx.drawImage(ground,0,0);

	for(let i=0; i<snake.length; i++){
		ctx.fillStyle = (i==0) ? "green" :"white";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);

		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x,snake[i].y,box,box);
	}

	ctx.drawImage(foodImg, food.x, food.y);

	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score,2*box,1.6*box);
}

//call draw method every 100 ms
let game = setInterval(draw,100);