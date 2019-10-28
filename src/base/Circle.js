import Sector from './Sector';

export default class Circle extends Sector {
  constructor(canvas, radius) {
    super(canvas, { radius });
  }

  containsPoint(_p) {
    const dist = (_p.x - this.position.x)
      * (_p.x - this.position.x)
      + (_p.y - this.position.y)
      * (_p.y - this.position.y);
    return dist <= (this.radius) * (this.radius);
  }
}
