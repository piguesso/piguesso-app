import { simplifyPath } from "./rdp";
class Skribble {
  private drawing: number[][][];
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
    this.drawing = [];
  }

  print() {
    console.log("X: ", this.x);
    console.log("Y: ", this.y);
  }

  update(x: number, y: number) {
    if (!this.x[this.stroke]) {
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
    console.log("pre-normalize: ", this.x, this.y);
    console.log("minX: ", this.minX);
    console.log("minY: ", this.minY);
    console.log("maxX: ", this.maxX);
    console.log("maxY: ", this.maxY);
    console.log(this.x.filter((x0) => x0.find((x1) => x1 === this.maxX)));
    this.x = this.x.map((x0) => x0.map((x1) => x1 - this.minX));
    this.y = this.y.map((y0) => y0.map((y1) => y1 - this.minY));
    console.log("post-normalize: ", this.x, this.y);
  }

  uniform_scale() {
    const scaleFactor = this.maxX > this.maxY ? 255 /this.maxX : 255 / this.maxY;
    console.log("scaleFactor: ", scaleFactor);
    console.log("maxX: ", this.maxX);
    console.log("maxY: ", this.maxY);

    this.x = this.x.map((x0) => x0.map((x1) => x1 * scaleFactor))
    this.y = this.y.map((y0) => y0.map((y1) => y1 * scaleFactor))
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

    return points.map((point) => {
        return simplifyPath(point, tolerance);
      }
    );
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

    getDrawing() {
      return this.drawing
    }

  setStroke(stroke : number) {
      this.stroke = stroke
    }

    fillStroke(points: Point[]) {
      const xForCurrentStroke:number[] = [];
      const yForCurrentStroke:number[] = [];
      points.map((point) => {
        xForCurrentStroke.push(point.x);
        yForCurrentStroke.push(point.y);
        if (point.x < this.minX) this.minX = point.x;
        if (point.y < this.minY) this.minY = point.y;
        if (point.x > this.maxX) this.maxX = point.x;
        if (point.y > this.maxY) this.maxY = point.y;
      });
      this.drawing.push([xForCurrentStroke, yForCurrentStroke ]);
    }

    toModelInput() {
      return this.x.map((x0, index0) => {
        return [x0, this.y[index0]];
      });
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
