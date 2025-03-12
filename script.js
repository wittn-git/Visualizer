let currentSketch = null;
const sketches = {};

function loadVisualization(name) {
    document.getElementById("home").style.display = "none";
    document.getElementById("visualization-container").style.display = "block";

    if (currentSketch) {
        currentSketch.remove();
        currentSketch = null;
    }

    let oldScript = document.getElementById("visualization-script");
    if (oldScript) {
        oldScript.remove();
    }

    let script = document.createElement("script");
    script.src = `visualizations/${name}.js`;
    script.id = "visualization-script";

    script.onload = function () {
        if (sketches[name]) {
            currentSketch = new p5(sketches[name]);
        }
    };

    if (currentSketch) {
        currentSketch.windowResized = function () {
            currentSketch.resizeCanvas(window.innerWidth, window.innerHeight);
        };
    }

    document.body.appendChild(script);
}

function goHome() {
    document.getElementById("home").style.display = "block";
    document.getElementById("visualization-container").style.display = "none";

    if (currentSketch) {
        currentSketch.remove();
        currentSketch = null;
    }

    let script = document.getElementById("visualization-script");
    if (script) {
        script.remove();
    }
}

document.addEventListener("keydown", function(event) {
    if (document.getElementById("visualization-container").style.display === "block") {
         if (event.key === "Backspace") {
            event.preventDefault();
            goHome();
        }
    }
});