import Action from '../core/Action';

export default class RotateAction extends Action {
  constructor(_duration, _rotate) {
    super(_duration)
    this.rotate = _rotate
    this.deta = _rotate / this.duration
  }
  run(_sprite) {
    _sprite.rotation += this.deta
    this.currentFrame--
    if(this.currentFrame > 0 && this.running) {
      setTimeout(()=>{this.run(_sprite)}, Math.round(1000/60))
    }
  }
}