import Node from '../core/Node';
import Color from '../core/Color';
import Point from '../core/Point';

export default class Line extends Node {
  constructor(canvas, option) {
    super(canvas);
    this.color = new Color(option.color || '#000000FF');
    this.from = option.from || new Point(0, 0);
    this.to = option.to || new Point(0, 0);
    this.width = option.width || 1;
  }

  setColor(color) {
    this.color = color;
  }

  setFrom(from, y = 0) {
    if (from instanceof Point) {
      this.from = from;
    } else {
      this.from = new Point(from, y);
    }
  }

  setTo(to, y = 0) {
    if (to instanceof Point) {
      this.to = to;
    } else {
      this.to = new Point(to, y);
    }
  }

  setLineWidth(width) {
    this.width = width;
  }

  containsPoint(point) {
    const targetY = (this.to.y - this.from.y) / (this.to.x - this.from.y) * (point.x - this.from.x) + this.from.y;
    return point.y >= targetY - this.width && point.y <= targetY + this.width
  }

  draw(painter) {
    painter.beginPath();
    painter.fillStyle = this.color.getColor();
    painter.strokeStyle = this.color.getColor();
    painter.lineWidth = this.width;
    painter.moveTo(this.from.x, -this.from.y);
    painter.lineTo(this.to.x, -this.to.y);
    painter.closePath();
    painter.stroke();
  }
}
