/*
My implementation of Square Wave Fourier Series

Code based on CodingTrain's Fourier Series Coding Challenge 125
https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_125_Fourier_Series/P5
*/

let time = 0;
let wave = [];
let partial_sums;

const CIRCLE_SIZE = 80;

let n_slider;
let speed_slider;

function setup() {
	n_slider = createSlider(1, 33, 7);
	n_slider.position(50, 370);
	speed_slider = createSlider(1, 75, 10);
	speed_slider.position(300, 370);
	createCanvas(windowWidth, windowHeight);
}

function draw_text() {
	fill(200);
	rect(50, 367, 137, 25, 5);
	fill(200);
	rect(300, 367, 137, 25, 5);
	textFont('Georgia');
	textSize(32);
	fill(255, 255, 255);		
	fill(255, 255, 255);
	text('Square Wave Fourier Series', 50, 50);
	textSize(16);
	text('# of partial sums: ' + partial_sums, 50, 350);
	text('Frequency', 300, 350);
}

function calculate_n() {
	if (n_slider.value() < 31) {
		partial_sums = n_slider.value();
	} else if (n_slider.value() == 31) {
		partial_sums = 50;
	} else {
		partial_sums = Math.pow(10, n_slider.value() - 30);
	}
}


function draw_fourier_series() {
	translate(250, 200);
	let x = 0
	let y = 0;
	for (let i = 0; i < partial_sums; i++) {
		let n = i * 2 + 1;
		let radius = CIRCLE_SIZE * (4 / (n * PI));
		let next_x = x + radius * cos(n * time);
		let next_y = y - radius * sin(n * time);

		stroke(255, 100);
		noFill();
		ellipse(x, y, 2 * radius);

		stroke(255);
		line(x, y, next_x, next_y);

		x = next_x;
		y = next_y;
	}
	wave.unshift(y);
	beginShape();
	translate(350, 0);
	line(x - 350, y, 0, wave[0]);
	for (let i = 0; i < wave.length; i++) {
		vertex(i, wave[i]);
	}
	endShape();
	stroke(255);
	time += speed_slider.value() / 500;

	if (wave.length > 2000) {
		wave.pop();
	}
}

function draw() {
	background(0);
	calculate_n();
	draw_text();
	draw_fourier_series();
}