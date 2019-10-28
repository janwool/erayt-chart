import Node from '../core/Node';
import Color from '../core/Color';

export default class Sector extends Node {
  constructor(canvas, option) {
    super(canvas)
    this.color = new Color(option.color || '#000000FF');
    this.start = option.start || 0;
    this.stop = option.stop || 2 * Math.PI;
    this.radius = option.radius || 1;
  }

  setStart(_start) {
    this.start = _start;
  }

  setStop(_stop) {
    this.stop = _stop;
  }

  setRadius(radius) {
    this.radius = radius;
  }

  setColor(_c) {
    this.color = _c;
  }

  containsPoint(_p) {
    const dist = (_p.x - this.position.x) * (_p.x - this.position.x)
      + (_p.y - this.position.y) * (_p.y - this.position.y);
    if (dist > this.radius * this.radius) {
      return false;
    }
    const tan = -(_p.y - this.position.y) / (_p.x - this.position.x);
    let atan = Math.atan(tan);
    if (_p.x < this.position.x && _p.y < this.position.y) {
      atan = Math.PI + atan;
    } else if (_p.x < this.position.x && _p.y > this.position.y) {
      atan = Math.PI * 3 / 2 + atan;
    } else if (_p.x > this.position.x && _p.y > this.position.y) {
      atan = Math.PI * 2 + atan;
    }
    if (this.stop < this.start) {
      return atan >= this.start || atan <= this.stop;
    } else {
      return atan >= this.start && atan <= this.stop;
    }
  }

  draw(painter) {
    painter.fillStyle = this.color.getColor();
    painter.beginPath();
    painter.arc(
      this.position.x / this.scaleX,
      this.position.y / this.scaleY,
      this.radius,
      this.start,
      this.stop
    );
    painter.lineTo(
      this.position.x / this.scaleX,
      this.position.y / this.scaleY
    );
    painter.closePath();
    painter.fill();
  }
}
