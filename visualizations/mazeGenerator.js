function mazeGeneratorSketch(p) {

    let grid = [];
    let box_size;
    let current_cell;
    let stack = [];
    let directions = [
        { row: -1, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },  
        { row: 0, col: -1 }  
    ];
    let finished = false;
    let n_rows, n_cols;
    let secondary_color = p.color(30, 0, 30);
    
    p.setup = function() {
        let canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent("canvas-container");
        box_size = p.width / 25;
        n_cols = Math.floor(p.width / box_size);
        n_rows = Math.floor(p.height / box_size);
        init();
        p.frameRate(15);
    };

    p.draw = function() {
        if (finished) {
            setTimeout(() => {init();}, 5000);
            return;
        }
        p.background(0);
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                let cell = grid[i][j];
                let x = j * box_size - 1;
                let y = i * box_size - 1;
                
                if (cell.visited) {
                    p.fill(30, 0, 30);
                } else {
                    p.fill(50);
                }
                
                p.rect(x, y, box_size, box_size);
                
                wall_colors = Array.from({ length: 4 }, () => p.color(0));
                if (!cell.walls.top) {
                    wall_colors[0] = p.color(secondary_color);
                }
                if (!cell.walls.right) {
                    wall_colors[1] = p.color(secondary_color);
                }
                if (!cell.walls.bottom) {
                    wall_colors[2] = p.color(secondary_color);
                }
                if (!cell.walls.left) {
                    wall_colors[3] = p.color(secondary_color);
                }

                p.stroke(wall_colors[0])
                p.line(x, y, x + box_size, y);
                p.stroke(wall_colors[1])
                p.line(x + box_size, y, x + box_size, y + box_size);
                p.stroke(wall_colors[2])
                p.line(x + box_size, y + box_size, x, y + box_size);
                p.stroke(wall_colors[3])
                p.line(x, y + box_size, x, y);
            }
        }
        do_generation_step();
    };

    function init() {
        finished = false;
        current_cell = { row: 0, col: 0 };
        for (let i = 0; i < n_rows; i++) {
            grid[i] = [];
            for (let j = 0; j < n_cols; j++) {
                grid[i][j] = {
                    visited: false,
                    walls: {
                        top: true,
                        right: true,
                        bottom: true,
                        left: true
                    }
                };
            }
        }
    }

    function do_generation_step() {
        grid[current_cell.row][current_cell.col].visited = true;
        let unvisted_neighbors = [];
        for (let direction of directions) {
            let new_row = current_cell.row + direction.row;
            let new_col = current_cell.col + direction.col;
            if (new_row >= 0 && new_row < grid.length && new_col >= 0 && new_col < grid[0].length) {
                if (!grid[new_row][new_col].visited) {
                    unvisted_neighbors.push({ row: new_row, col: new_col, direction: direction });
                }
            }
        }
        if (unvisted_neighbors.length === 0) {
            if (stack.length > 0) {
                current_cell = stack.pop();
            } else {
                finished = true;
            }
        } else {

            let random_neighbor = p.random(unvisted_neighbors);
            let new_row = random_neighbor.row;
            let new_col = random_neighbor.col;
            let direction = random_neighbor.direction;

            if (direction.row === -1) {
                grid[current_cell.row][current_cell.col].walls.top = false;
                grid[new_row][new_col].walls.bottom = false;
            } else if (direction.row === 1) {
                grid[current_cell.row][current_cell.col].walls.bottom = false;
                grid[new_row][new_col].walls.top = false;
            } else if (direction.col === -1) {
                grid[current_cell.row][current_cell.col].walls.left = false;
                grid[new_row][new_col].walls.right = false;
            } else if (direction.col === 1) {
                grid[current_cell.row][current_cell.col].walls.right = false;
                grid[new_row][new_col].walls.left = false;
            }

            stack.push(current_cell);
            current_cell = { row: new_row, col: new_col };
        }
    }
    
}

if (typeof sketches !== 'undefined') {
    sketches.mazeGenerator = mazeGeneratorSketch;
}