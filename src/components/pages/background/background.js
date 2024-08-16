import React, { useRef, useEffect } from 'react';
import p5 from 'p5';



var particlesNo = window.innerWidth/5.5;

const mouseCircum = 120;

var vsblty = 0;

var bgColor = "rgba(0,0,0,0)";

const basicSketch = (p) => {

	function Particle() {
		
		this.x = p.random(0 + window.innerWidth);
		
		this.y = p.random(0 + window.innerHeight);
	}
	

	function Pool() {
		
		this.particles = [];
		
		for (let i = 1; i <= particlesNo; i++) {
			this.particles.push(new Particle());
		}
	}
	

	var sects;
	

	function gradientLine(x1, y1, x2, y2,color2,color3) {

		var grad = p.drawingContext.createLinearGradient(x1, y1, x2, y2);

		grad.addColorStop(1, "transparent");
		grad.addColorStop(0.5, color2);
		grad.addColorStop(0, color3);

		p.strokeWeight(1);
		p.drawingContext.strokeStyle = grad;

		p.line(x1, y1, x2, y2);
	}
	

	Particle.prototype.connectMouse = function (mouseX, mouseY) {
		
		if (p.dist(mouseX, mouseY, this.x, this.y) > mouseCircum)
			return;

		p.stroke(255)
		gradientLine(this.x, this.y, mouseX, mouseY, `rgba(120,120,120,${vsblty})`, `rgba(55,55,55,${vsblty})`);

	}
	

	Pool.prototype.connectMouse = function (mouseX, mouseY) {
		for (const part of this.particles) {
			part.connectMouse(mouseX, mouseY);
		}
	}
	

	p.setup = () => {

		p.createCanvas(window.innerWidth, window.innerHeight);
		
		if (window.innerWidth < 800)
			p.noLoop();

		sects = new Pool(particlesNo);
	};
	
	p.mouseMoved = () => {
		vsblty < 0.6 ? vsblty += 0.06 : vsblty = 0.7;
	}

	p.draw = () => {
		// p.background(bgColor);
		p.clear();
		
		vsblty > 0 ? vsblty -= 0.0075 : vsblty = 0;
		
		sects.connectMouse(p.mouseX, p.mouseY);
	};
	
	
	p.windowResized = () => {
		
		vsblty = -1;
		p.loop();
		
		if (window.innerWidth >= 800)
			p.loop();
		else
			p.noLoop();

		particlesNo = window.innerWidth/5.5;
		p.resizeCanvas(window.innerWidth, window.innerHeight);
		sects = new Pool(particlesNo);
	};
};





const P5Wrapper = () => {
	const canvasRef = useRef();

	useEffect(() => {
		const p5Instance = new p5(basicSketch, canvasRef.current);

		return () => {
			p5Instance.remove();
		};
	}, [window.innerWidth]);


	return (
		<div
			ref={canvasRef}
			style={{
				"position": "absolute",
				"zIndex": "-1000",
				"left": "0",
				"right": "0",
				"top": "0",
				"bottom": "0"
			}}
		>
		</div>
	);
};


export default P5Wrapper;