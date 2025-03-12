function boidsSketch(p) {
    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent("canvas-container");
    };

    p.draw = function() {
    };

};

if (typeof sketches !== 'undefined') {
    sketches.boids = boidsSketch;
}