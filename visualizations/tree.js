let treeSketch = (p) => {
    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent("canvas-container");
        p.background(50, 150, 50);
    };

    p.draw = function() {
        p.stroke(255);
        p.line(p.width / 2, p.height, p.width / 2, p.height - 100);
    };

};

if (typeof sketches !== 'undefined') {
    sketches.tree = treeSketch;
}