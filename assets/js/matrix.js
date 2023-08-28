const canvas = document.getElementById('c');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//Falling Text
class Text {
	constructor(x, y, v, len, i) {
		//Movement Data
		this.x = x;
		this.y = y;
		this.vel = v;
		//Visual Features
		this.len = len;
		this.i = i;
		let r = Math.random();
		if (r < 0.6) this.val = String.fromCharCode(0x30A0 + Math.round(Math.random() * 96));
		else if (r < 0.9) this.val = String.fromCharCode(0x50D0 + Math.round(Math.random() * 222));
		else this.val = Math.round(Math.random() * 9)
		if (this.i == 0) {
			if (Math.random() < 0.4) this.tip = true;
		}
	}
	update() {
		//Changing Character
		if (Math.random() < 0.03) {
			let r = Math.random();
			if (r < 0.6) this.val = String.fromCharCode(0x30A0 + Math.round(Math.random() * 96));
			else if (r < 0.9) this.val = String.fromCharCode(0x50D0 + Math.round(Math.random() * 222));
			else this.val = Math.round(Math.random() * 9)
		}
		//Moving Character
		this.y += this.vel;
		if (this.y > canvas.height + inc) this.y = -inc;
	}
	show() {
		//Shading Based on Index
		if (this.tip) c.fillStyle = 'rgb(200, 255, 200)';
		else c.fillStyle = 'rgb(0, ' + (300 - this.i / this.len * 255) + ', 0)';
		c.fillText(this.val, this.x, this.y)
	}
}
//Streaks Of Text
class Streak {
	constructor(x, y, len) {
		//Array Holding Text Objects Belonging to This Streak
		this.t = [];
		let v = Math.random() * 4 + 4;
		for (let i = 0; i < len; i++) {
			this.t[i] = new Text(x, y - i * inc, v, len, i);
		}
	}
	run() {
		//Updating And Showing Text
		for (let i = 0; i < this.t.length; i++) {
			this.t[i].update();
			this.t[i].show();
		}
	}
}
let inc = 26;
//Adding Streaks
let s = [];
for (let i = 0; i < canvas.width / inc; i++) {
	s[i] = new Streak(inc / 2 + i * inc, Math.random() * canvas.height - canvas.height, Math.random() * 15 + 20);
}
c.textAlign = 'center';
c.font = inc + 'px Arial';
//Animation Loop
function draw() {
	requestAnimationFrame(draw);
	c.fillStyle = 'rgba(0, 0, 0, 0.5)';
	c.fillRect(0, 0, canvas.width, canvas.height);
	//Running Streaks
	for (let i = 0; i < s.length; i++) s[i].run();
}
draw();