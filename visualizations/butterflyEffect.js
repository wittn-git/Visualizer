function butterflyEffectSketch(p) {
    let balls = [];
    let gravity;
    let limit;
    let ballRadius = 10;
    let ballsN = 1000;
    let frameRateValue = 50;
    let startingRangeFactor = 0.8;
    
    p.setup = function() {
        let canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent("canvas-container");
        p.frameRate(frameRateValue);
        gravity = p.createVector(0, 0.08);
        limit = new Limit(p.width / 2, p.height / 2 - p.height/10, p.height / 2 - p.height / 10);
        
        for (let i = 0; i < ballsN; i++) {
            let color = getColor(i, ballsN);
            let position = getStartingPosition(i, ballsN, ballRadius, p.width / 2, p.height / 2 - p.height/10, p.height / 2 - p.height / 10, startingRangeFactor);
            balls.push(new Ball(ballRadius, color, position, p.createVector(0, 0)));
        }
    };

    p.draw = function() {
        p.background(255);
        limit.draw();
        for (let ball of balls) {
            ball.applyForce(gravity);
            ball.applyCollision(limit);
            ball.update();
            ball.draw();
        }
    };
    
    class Limit {
        constructor(x, y, radius) {
            this.center = p.createVector(x, y);
            this.radius = radius;
            this.width = 1;
        }

        draw() {
            p.fill(255);
            p.ellipse(this.center.x, this.center.y, this.radius * 2);
            p.fill(0);
            p.ellipse(this.center.x, this.center.y, (this.radius - this.width) * 2);
        }
    }

    class Ball {
        constructor(radius, color, position, force) {
            this.radius = radius;
            this.color = color;
            this.position = position;
            this.currentForce = force;
        }

        update() {
            this.position.add(this.currentForce);
        }

        applyForce(force) {
            this.currentForce.add(force);
        }

        applyCollision(limit) {
            let dx = this.position.x - limit.center.x;
            let dy = this.position.y - limit.center.y;
            let distance = p.sqrt(dx * dx + dy * dy);
            if (distance + this.radius >= limit.radius) {
                let angle = p.atan2(dy, dx);
                let forceMagnitude = this.currentForce.mag();
                this.currentForce = p.createVector(-forceMagnitude * p.cos(angle), -forceMagnitude * p.sin(angle));
            }
        }

        draw() {
            p.fill(this.color);
            p.noStroke();
            p.ellipse(this.position.x, this.position.y, this.radius * 2);
        }
    }

    function getColor(k, maxK) {
        const maxVal = 255;
        let level = k * (6 * maxVal) / maxK;
        let workLevel = level % maxVal;
        if (level <= maxVal) return p.color(maxVal, workLevel, 0);
        if (level <= 2 * maxVal) return p.color(maxVal - workLevel, maxVal, 0);
        if (level <= 3 * maxVal) return p.color(0, maxVal, workLevel);
        if (level <= 4 * maxVal) return p.color(0, maxVal - workLevel, maxVal);
        if (level <= 5 * maxVal) return p.color(workLevel, 0, maxVal);
        return p.color(maxVal, 0, maxVal - workLevel);
    }
    
    function getStartingPosition(k, maxK, ballRadius, limitX, limitY, limitRadius, startingRangeFactor) {
        if (maxK === 1) return p.createVector(windowSize / 2 - ballRadius / 2, windowSize / 3);
        let x = limitX - limitRadius * startingRangeFactor + (2 * limitRadius * startingRangeFactor) * k / maxK;
        return p.createVector(x, limitY);
    }
}

if (typeof sketches !== 'undefined') {
    sketches.butterflyEffect = butterflyEffectSketch;
}
