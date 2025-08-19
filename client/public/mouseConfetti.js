function startMouseConfetti() {
	var canvas = document.getElementById("confetti-canvas");
	if (!canvas) {
		setTimeout(startMouseConfetti, 100);
		return;
	}
		var ctx = canvas.getContext("2d");
				var colors = [
					"#e9cbd5ff", 
					"#eee6b5ff", 
					"#f7b1deff", 
					"#D8A48F", 
					"#BB8588"  
				];

		var particles = [];
		var mousePos = { x: 0, y: 0 };

		function Particle(x, y, size, color, speedX, speedY) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.speedX = speedX;
		this.speedY = speedY;
	}
	Particle.prototype.update = function() {
		this.x += this.speedX;
		this.y += this.speedY;
		this.size *= 0.98;
	};
	Particle.prototype.draw = function() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	};

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	function createExplosion(x, y) {
		var particleCount = 50;
		for (var i = 0; i < particleCount; i++) {
			var size = Math.random() * 5 + 2;
			var color = colors[Math.floor(Math.random() * colors.length)];
			// Reduce speed for slower effect
			var speedX = (Math.random() * 2 - 1) * 1.1; // was * 2
			var speedY = (Math.random() * 2 - 1) * 1.1; // was * 2
			particles.push(new Particle(x, y, size, color, speedX, speedY));
		}
	}

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		particles = particles.filter(function(particle) {
			particle.update();
			particle.draw();
			return particle.size > 0.5;
		});
		requestAnimationFrame(animate);
	}

	function handleMouseMove(event) {
		mousePos.x = event.clientX;
		mousePos.y = event.clientY;
	}

		// Initialize
		resizeCanvas();
		animate();

		// Event listeners
		window.addEventListener("resize", resizeCanvas);
		window.addEventListener("mousemove", handleMouseMove);
		// Create explosions at intervals
		// Make confetti slower: increase interval
		setInterval(function() {
			createExplosion(mousePos.x, mousePos.y);
		}, 150); // was 50
	}

	startMouseConfetti();