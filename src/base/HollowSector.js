import Sector from './Sector';

export default class HollowSector extends Sector {
  constructor(canvas, option) {
    super(canvas, option)
    this.lineWidth = option.width || 5;
  }

  setLineWidth(_w) {
    this.lineWidth = _w;
  }

  draw(painter) {
    painter.beginPath();
    painter.strokeStyle = this.color.getColor();
    painter.lineWidth = this.lineWidth;
    painter.arc(
      this.position.x / this.scaleX,
      this.position.y / this.scaleY,
      this.radius,
      this.start, this.stop
    );
    painter.lineTo(
      this.position.x / this.scaleX,
      this.position.y / this.scaleY
    );
    painter.closePath();
    painter.stroke();
  }
}
