import Rectangle from './Rectangle';

export default class HollowRectangle extends Rectangle {
  constructor(canvas, option) {
    super(canvas, option);
    this.borderWidth = option.borderWidth;
  }

  setBorderWidth(width) {
    this.borderWidth = width;
  }

  draw(painter) {
    painter.strokeStyle = this.color.getColor();
    painter.lineWidth = this.borderWidth;
    painter.strokeRect(this.position.x, this.position.y + this.height, this.width, this.height);
  }
}
