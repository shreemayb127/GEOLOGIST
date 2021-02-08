function makeTry(dx, dy) {
  return {
    dx,
    dy,
    tried: false
  };
}


class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.visited = false;
    this.options = [makeTry(1, 0), makeTry(-1, 0),
      makeTry(0, 1), makeTry(0, -1)
    ];
  }

  clear() {
    this.visited = false;
    this.options = [makeTry(1, 0), makeTry(-1, 0),
      makeTry(0, 1), makeTry(0, -1)
    ];
  }


}