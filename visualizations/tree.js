function treeSketch(p) {
    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent("canvas-container");
        p.background(50, 150, 50);
    };

    p.draw = function() {    };

};

if (typeof sketches !== 'undefined') {
    sketches.tree = treeSketch;
}