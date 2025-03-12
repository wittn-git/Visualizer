function fractualTreeSketch(p) {

    p.branch = function(length) {
        p.strokeWeight(p.random(length / 20, length / 12));
        if (length > 30) {
            p.stroke(p.color(60, 40, 20));
        } else {
            p.stroke(p.color(20, 40 + p.random(0, 120), 20));
        }
        p.line(0, 0, 0, -length);
        if (length > 10) {
            for (let i = 0; i < p.int(p.random(2, 4)); i++) {
                let angle = p.random(10, 30);
                if (p.random(0, 1) > 0.5) {
                    angle *= -1;
                }
                p.push();
                p.translate(0, -length);
                p.rotate(p.radians(angle));
                p.branch(length * p.random(0.5, 1));
                p.pop();
            }
        }
    };

    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent("canvas-container");
        p.background(30, 100, 200);
        p.translate(p.width / 2, p.height);
        p.branch(100);
    };

};

if (typeof sketches !== 'undefined') {
    sketches.fractualTree = fractualTreeSketch;
}