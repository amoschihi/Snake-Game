const cvs = document.getElementById('game');
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "images/ground.png";

const foodImg = new Image();
foodImg.src = "images/apple.png";

// load audio files
const dead = new Audio();
const eat = new Audio();

dead.src = "audio/death.ogg";
eat.src = "audio/eat.ogg";

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
let d;

document.addEventListener("keydown",direction);

function direction(event){
	// alert(event);
	if(event.keyCode == 37 && d != "RIGHT") {
		d = "LEFT";
	}else if(event.keyCode == 38 && d != "DOWN") {
		d = "UP";
	}else if(event.keyCode == 39 && d != "LEFT") {
		d = "RIGHT";
	}else if(event.keyCode == 40 && d != "UP") {
		d = "DOWN";
	}
}
// check collision
function collision(head, array){
	for(let i= 0; i<array.length; i++){
		if(head.x == array[i].x && head.y == array[i].y) {
			return true;
		}
	}
	return false;
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

	// old head position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	// which direction
	if( d = "LEFT") snakeX -= box;
	if( d = "UP") snakeY -= box;
	if(d = "RIGHT") snakeX += box;
	if(d = "DOWN") snakeY += box;

	// If the snake eats the food
	if(snakeX == food.x && snakeY == food.y){
		score++;
		eat.play();
		food = {
			x: Math.floor(Math.random()*17+1) * box,
			y: Math.floor(Math.random()*15+3) * box
		}
		// don't remove the tail

	}else{
		//remove the tail
		snake.pop();
	}


	// add new head
	let newHead = {
		x: snakeX,
		y: snakeY
	}


	// game over
	if(snakeX < box || snakeX > 17 * box || 
		snakeY < 3 * box || snakeY > 17 * box ||
		collision(newHead, snake)) {
		clearInterval(game);
		dead.play();
	}


	snake.unshift(newHead);

	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score,2*box,1.6*box);
}

//call draw method every 100 ms
let game = setInterval(draw,100);