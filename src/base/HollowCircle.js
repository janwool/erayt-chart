import HollowSector from './HollowSector';

export default class HollowCircle extends HollowSector {
  constructor(canvas, radius) {
    super(canvas, { radius });
  }

  containsPoint(_p) {
    const dist = (_p.x - this.position.x)
      * (_p.x - this.position.x)
      + (_p.y - this.position.y)
      * (_p.y - this.position.y);
    return dist <= (this.radius + 15) * (this.radius + 15);
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
    painter.stroke();
  }
}
