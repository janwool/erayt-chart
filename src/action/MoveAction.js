import Action from '../core/Action';

export default class MoveAction extends Action {
  constructor(_duration, _destination) {
    super(_duration)
    this.destination = _destination
  }

  update(_sprite, frame) {
    let origin = _sprite.getPosition()
    if (this.destination.x != origin.x) {
      let k = (this.destination.y - origin.y) / (this.destination.x - origin.x)
      const deta = (this.destination.x - origin.x) / frame
      _sprite.setPosition(origin.x + deta, origin.y + deta * k)
    } else {
      const deta = (this.destination.y - origin.y) / frame
      _sprite.setPosition(origin.x, origin.y + deta)
    }
  }

  directTo(_destination, _duration) {
    this.destination = _destination
    this.duration = _duration
  }

  reset() {
    this.running = true
    this.currentFrame = this.duration
  }
}