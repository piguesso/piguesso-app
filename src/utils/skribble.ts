class Skribble {
  private x: number[];
  private y: number[];
  private t: number[];
  private minX: number;
  private minY: number;

  constructor() {
    this.x = [];
    this.y = [];
    this.t = [];
    this.minX = Infinity;
    this.minY = Infinity;
  }

  print() {
    console.log("X: ", this.x);
    console.log("Y: ", this.y);
    console.log("T: ", this.t);
  }

  update(x: number, y: number, t: number) {
    this.x.push(x > 0 ? x : 0);
    this.y.push(y > 0 ? x : 0);
    this.t.push(t > 0 ? x : 0);
    if (x < this.minX) this.minX = x;
    if (y < this.minY) this.minY = y;
  }

  normalize() {
    this.x.map((x) => x - this.minX);
    this.y.map((y) => y - this.minY);
  }

  clear() {
    this.x = [];
    this.y = [];
    this.t = [];
    this.minX = Infinity;
    this.minY = Infinity;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getT() {
    return this.t;
  }

  getMinX() {
    return this.minX;
  }

  getMinY() {
    return this.minY;
  }

  getLength() {
    return this.x.length;
  }

  getPoint(index: number) {
    return { x: this.x[index], y: this.y[index], t: this.t[index] };
  }

  isValid() {
    if (
      this.x.length !== this.y.length ||
      this.x.length !== this.t.length ||
      this.minX === Infinity ||
      this.minY === Infinity ||
      this.minX < 0 ||
      this.minY < 0
    ) {
      return false;
    }
    return true;
  }
}

export default Skribble;
