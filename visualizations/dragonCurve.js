function dragonCurveSketch(p) {    

    p.setup = function() {
        let canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent("canvas-container");

        p.sequence = "0";
        p.iteration = 0;
        p.max_iterations = 15;
        p.length = 4;

        p.background(0);
        p.frameRate(10)
    };

    p.draw = function() {

        if(p.iteration >= p.max_iterations) {
            return;
        }
        
        p.iteration += 1;
        p.sequence = p.sequence + "0" + p.sequence.split("").reverse().map(x => x === "0" ? "1" : "0").join("");

        p.background(0);
        p.stroke(255);
        p.strokeWeight(2);
        p.translate(p.width / 3,  p.height / 2);

        let x = 0;
        let y = 0;
        let angle = 0;
        
        for(let letter in p.sequence) {
            x2 = x + p.cos(angle) * p.length;
            y2 = y + p.sin(angle) * p.length;
            p.line(x, y, x2, y2);
            x = x2;
            y = y2;
            angle += p.int(p.sequence[letter]) === 0 ? p.PI / 2 : -p.PI / 2;
        }

    }

};

if (typeof sketches !== 'undefined') {
    sketches.dragonCurve = dragonCurveSketch;
}