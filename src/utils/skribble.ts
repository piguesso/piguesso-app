import { simplifyPath } from "./rdp";

class Skribble {
  private x: number[][];
  private y: number[][];
  private minX: number;
  private minY: number;
  private stroke: number;
  private maxX: number;
  private maxY: number;

  constructor() {
    this.x = [];
    this.y = [];
    this.minX = Infinity;
    this.minY = Infinity;
    this.maxX = -Infinity;
    this.maxY = -Infinity
    this.stroke = 0;
  }

  print() {
    console.log("X: ", this.x);
    console.log("Y: ", this.y);
  }

  update(x: number, y: number) {
    if (!this.x[this.stroke] || this.x[this.stroke].length < 0) {
      this.x.push([])
      this.y.push([])
    }
    if (this.x[this.stroke][this.x.length - 1] === x && this.y[this.stroke][this.y.length - 1] === y) {
      return;
    }
    this.x[this.stroke].push(x > 0 ? x : 0);
    this.y[this.stroke].push(y > 0 ? x : 0);
    if (x < this.minX) this.minX = x;
    if (y < this.minY) this.minY = y;
    if (x > this.maxX) this.maxX = x;
    if (y > this.maxY) this.maxY = y;
  }

  normalize() {
    this.x = this.x.map((x0) => x0.map((x1) => x1 - this.minX));
    this.y = this.y.map((y0) => y0.map((y1) => y1 - this.minY));
  }

  uniform_scale() {
    console.log(this.maxX)
    const scalefactorX = this.maxX / 255
    const scalefactorY = this.maxY / 255

    this.x = this.x.map((x0) => x0.map((x1) => x1 / scalefactorX))
    this.y = this.y.map((y0) => y0.map((y1) => y1 / scalefactorY))
  }

  resampleOnePixelSpacing() {
    this.x = this.x.map((x0) => x0.map((x1) => Math.trunc(x1)))
    this.y = this.y.map((y0) => y0.map((y1) => Math.trunc(y1)))

    const backupX = this.x;

    for (let stroke = 0; stroke < this.x.length; stroke++) {
      this.x[stroke] = this.x[stroke].filter((value, index) => {
        return index === 0 || (value !== this.x[stroke][index - 1] && value !== this.y[stroke][index - 1]);
      });
      this.y[stroke] = this.y[stroke].filter((value, index) => {
        return index === 0 || (value !== this.y[stroke][index - 1] && value !== backupX[stroke][index - 1]);
      });
    }
  }

  simplify(tolerance: number) {
    // from https://gist.github.com/adammiller/826148
    // turn X and Y into an array of points
    const points:Point[][] = this.x.map((x0, index0) => {
      return x0.map((x1, index1) => {
        return { x: x1, y: this.y[index0][index1] }
      });
    });

    const simplifiedPoints = points.map((point) => {
      return simplifyPath(point, tolerance);
    }
    );
    return simplifiedPoints;
  }

    clear() {
      this.x = [];
      this.y = [];
      this.minX = Infinity;
      this.minY = Infinity;
    }

    getX() {
      return this.x;
    }

    getY() {
      return this.y;
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
      return { x: this.x[index], y: this.y[index] };
    }

    getStroke() {
      return this.stroke
    }

    setStroke(stroke : number) {
      this.stroke = stroke
    }

    isValid() {
      if (
        this.x.length !== this.y.length ||
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
