function generateConfetti(confettiConfigObj, canvasId = "vanillaConfettiCanvas") {
    const canvasEl = document.querySelector(`#${canvasId}`);

    if (canvasEl === null) {
        console.error(`Canvas with id "${canvasId}" not found.`);
        return;
    };

    const ctx = canvasEl.getContext("2d");
    const confettiArray = [];

    function resizeCanvas() {
        canvasEl.width = window.innerWidth;
        canvasEl.height = window.innerHeight;
    };
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    function createConfetti() {
        for (let i = 0; i < confettiConfigObj.quantity; i += 1) {
            confettiArray.push({
                x: Math.random() * canvasEl.width,
                y: Math.random() * canvasEl.height - canvasEl.height,
                size: Math.random() * (confettiConfigObj.maxSize - confettiConfigObj.minSize) + confettiConfigObj.minSize,
                color: confettiConfigObj.colorsArray[Math.floor(Math.random() * confettiConfigObj.colorsArray.length)],
                velocityX: Math.random() * 2 - 1,
                velocityY: Math.random() * 3 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5,
                shape: Math.floor(Math.random() * 3),
                depth: Math.random() * 3
            });
        };
    };

    function drawConfetti(confettiObj) {
        ctx.save();
        ctx.translate(confettiObj.x, confettiObj.y);
        ctx.rotate((confettiObj.rotation * Math.PI) / 180);
        ctx.scale(1, Math.cos(confettiObj.rotation * Math.PI / 180));
        ctx.fillStyle = confettiObj.color;

        if (confettiObj.shape === 0) {
            ctx.fillRect(-confettiObj.size / 2, -confettiObj.size / 2, confettiObj.size, confettiObj.size);
        } else if (confettiObj.shape === 1) {
            ctx.beginPath();
            ctx.arc(0, 0, confettiObj.size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.moveTo(-confettiObj.size / 2, confettiObj.size / 2);
            ctx.lineTo(confettiObj.size / 2, confettiObj.size / 2);
            ctx.lineTo(confettiObj.size / 4, -confettiObj.size / 2);
            ctx.lineTo(-confettiObj.size / 4, -confettiObj.size / 2);
            ctx.closePath();
            ctx.fill();
        };
        ctx.restore();
    };

    function animateConfetti() {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

        for (let confettiObj of confettiArray) {
            confettiObj.velocityY += confettiConfigObj.velocity;
            confettiObj.x += Math.sin(confettiObj.y / 30) * 0.5;
            confettiObj.rotation += confettiObj.rotationSpeed;
            confettiObj.x += confettiObj.velocityX;
            confettiObj.y += confettiObj.velocityY;

            if (confettiObj.y > canvasEl.height) {
                if (confettiConfigObj.infiniteLoop === true) {
                    confettiObj.y = -10;
                    confettiObj.x = Math.random() * canvasEl.width;
                    confettiObj.velocityY = Math.random() * 3 + 2;
                    confettiObj.size = Math.random() * (confettiConfigObj.maxSize - confettiConfigObj.minSize) + confettiConfigObj.minSize;
                    confettiObj.color = confettiConfigObj.colorsArray[Math.floor(Math.random() * confettiConfigObj.colorsArray.length)];
                    confettiObj.depth = Math.random() * 3;
                    confettiObj.rotation = Math.random() * 360;
                } else {
                    confettiArray.splice(confettiArray.indexOf(confettiObj), 1);
                };
            };

            ctx.globalAlpha = (1 - confettiObj.depth / 3) * confettiConfigObj.minOpacity + Math.random() * (confettiConfigObj.maxOpacity - confettiConfigObj.minOpacity);

            drawConfetti(confettiObj);
        };

        ctx.globalAlpha = 1;
        requestAnimationFrame(animateConfetti);
    };

    createConfetti();
    animateConfetti();
}

// Expose to window for use in React.
window.generateConfetti = generateConfetti;