

function starfieldSketch(p) {

    let stars = [];

    class Star {

        constructor() {
            this.init_values();
        }

        init_values() {
            this.position = p.createVector(p.random(-p.height, p.height), p.random(-p.height, p.height), p.random(-1000, 0));
            this.size = p.random(1, 5);
            this.length = p.random(30, 80);
            this.velocity = p.random(10, 50);
        }

        draw(p) {
            p.noStroke();
            for (let i = 0; i < this.length; i++) {
                p.stroke(255 - (220 - i * (220 / this.length)));
                p.strokeWeight(this.size);
                p.point(this.position.x, this.position.y, this.position.z + i * this.size / 3);
            }
        }

        update() {
            this.position.z += this.velocity;
            if (this.position.z > 1000) {
                this.init_values();
            }
        }
    }
    
    p.setup = function() {
        let canvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        canvas.parent("canvas-container");
        p.background(0);

        for (let i = 0; i < 150; i++) {
            stars.push(new Star());
        }
        p.frameRate(30);
    };

    p.draw = function() {
        p.background(0)
        for (let star of stars) {
            star.update();
            star.draw(p);
        }
    }

};

if (typeof sketches !== 'undefined') {
    sketches.starfield = starfieldSketch;
}