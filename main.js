const width = 640 * 1.2;
const height = 480 * 1.2;

let particle;
let walls_c = 6; // Walls Count
walls_c += 4; // Adding 4 walls
let walls = [];


function setup() {
	const canvas = createCanvas(width, height);
	canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
	background(40);

	// Initializing new Particle
	particle = new Particle(width, height);

	// Initializing new Walls
	for(let i = 0; i < walls_c; i ++) {
		if(i == 0)		walls.push(new Wall(0, 0, width, 0));
		else if(i == 1) walls.push(new Wall(width, 0, width, height));
		else if(i == 2) walls.push(new Wall(width, height, 0, height));
		else if(i == 3) walls.push(new Wall(0, height, 0, 0));
		else {
			walls.push(new Wall(
				floor(random(width)), floor(random(height)), // Point (x1, y1)
				floor(random(width)), floor(random(height))  // Point (x2, y2)
			));
		}
	}
}


function draw() {
	background(40);

	// Displaying Walls
	for(let i = 0; i < walls_c; i ++)
		walls[i].display();

	// Casting Particle's rays on walls
	particle.ray_cast(walls);

	// Displaying Particle
	particle.display();
}


function mouseMoved() {
	if(mouseX < 0 || mouseY < 0 || mouseX > width - 1 || mouseY > height - 1) return;

	// Updating Particle position
	particle.update_pos(mouseX, mouseY);
}