import Node from '../core/Node';
import Color from '../core/Color';

export default class MultiLine extends Node {
  constructor(canvas, points) {
    super(canvas)
    this.color = new Color(0, 0, 0, 255)
    this.points = points;
    this.lineWidth = 1;
  }

  setLineWidth(_w) {
    this.lineWidth = _w;
  }

  setColor(_c) {
    this.color = _c;
  }

  draw(painter) {
    if (this.points.length === 0) {
      return;
    }
    painter.beginPath();
    painter.fillStyle = this.color.getColor();
    painter.strokeStyle = this.color.getColor();
    painter.lineWidth = this.lineWidth;
    painter.moveTo(this.points[0].x, -this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      painter.lineTo(this.points[i].x, -this.points[i].y);
    }
    painter.stroke();
    painter.closePath();
  }
}