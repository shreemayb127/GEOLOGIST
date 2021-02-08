// Self-Avoiding Walk!

let path = [];
let step = 50;
let cell;
let cols, rows;
let grid;

function setup() {
  createCanvas(400, 400);
  background(0);
  cols = floor(width / step);
  rows = floor(height / step);
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  cell = grid[0][0];
  path.push(cell);
}

function nextStep() {
  cell.visited = true;
  let newX, newY;
  do {
    if (cell.options.every(elt => elt.tried)) {
      return false;
    }
    let left = cell.options.filter(elt => !elt.tried);
    let choice = random(left);
    choice.tried = true;
    newX = cell.i + choice.dx;
    newY = cell.j + choice.dy;
  } while (notValid(newX, newY) || grid[newX][newY].visited);
  cell = grid[newX][newY];
  return true;
}

function notValid(x, y) {
  return (x < 0 || x >= cols || y < 0 || y >= rows);
}

function draw() {
  let next = nextStep();
  if (!next) {
    let goback = path.pop();
    goback.clear();
    cell = path[path.length - 1];
  } else {
    path.push(cell);
  }
  if (path.length >= cols * rows) {
    console.log('complete');
    noLoop();
  }

  push();
  background(0);
  strokeWeight(1);
  stroke(255);
  noFill();
  beginShape();
  for (let v of path) {
    let x = v.i * step + step * 0.5;
    let y = v.j * step + step * 0.5;
    vertex(x, y);
  }
  endShape();

  strokeWeight(step / 2);
  for (let v of path) {
    let x = v.i * step + step * 0.5;
    let y = v.j * step + step * 0.5;
    point(x, y);
  }
  pop();
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}