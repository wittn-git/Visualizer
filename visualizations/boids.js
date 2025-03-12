let boidsSketch = (p) => {
    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent("canvas-container");
        p.background(0);
    };

    p.draw = function() {
        p.background(0, 50);
        p.fill(255);
        p.ellipse(p.random(p.width), p.random(p.height), 10, 10);
    };

};

if (typeof sketches !== 'undefined') {
    sketches.boids = boidsSketch;
}