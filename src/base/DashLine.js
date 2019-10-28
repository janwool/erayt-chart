import Line from './Line';

export default class DashLine extends Line {
  constructor(canvas, option) {
    super(canvas, option);
    this.dashLine = option.dashLine || [1, 4];
  }

  setLineDash(dash) {
    this.dashLine = dash;
  }

  draw(painter) {
    painter.beginPath();
    painter.fillStyle = this.color.getColor();
    painter.strokeStyle = this.color.getColor();
    painter.lineWidth = this.width;
    painter.setLineDash(this.dashLine);
    painter.moveTo(this.from.x, -this.from.y);
    painter.lineTo(this.to.x, -this.to.y);
    painter.closePath();
    painter.stroke();

  }
}