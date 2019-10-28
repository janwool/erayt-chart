import Node from '../core/Node';
import Color from '../core/Color';

export default class Rectangle extends Node {
  constructor(canvas, option) {
    super(canvas);
    this.width = option.width || 0;
    this.height = option.height || 0;
    this.color = new Color(option.color || '#000000FF');
  }

  setColor(_c) {
    this.color = _c;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height || this.height;
  }

  draw(painter) {
    painter.fillStyle = this.color.getColor();
    painter.fillRect(this.position.x, this.position.y - this.height, this.width, this.height);
  }

  containsPoint(point) {
    return point.x <= this.position.x + this.width
        && point.x >= this.position.x
        && point.y >= this.position.y
        && point.y <= this.position.y + this.height;
  }
}
