import Node from '../core/Node';
import Color from '../core/Color';

export default class Polygon extends Node {
  constructor(canvas, options) {
    super(canvas);
    this.points = options.points || [];
    this.color = new Color(options.color);
  }

  draw(painter) {
    if (this.points.length === 0) {
      return;
    }
    painter.fillStyle = this.color.getColor();
    painter.beginPath();
    painter.moveTo(this.points[0].x, -this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      painter.lineTo(this.points[i].x, -this.points[i].y);
    }
    painter.closePath();
    painter.fill();
  }
}