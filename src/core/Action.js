export default class Action {
  constructor(_duration) {
    this.running = true;
    this.duration = _duration * 60;
    this.currentFrame = _duration * 60;
    this.runSpeed = 1;
  }

  run(node, callback) {
    this.update(node, this.currentFrame);
    callback && callback(node, this);
    this.currentFrame = this.currentFrame - this.runSpeed;
    if (this.currentFrame > 0 && this.running) {
      setTimeout(() => {
        this.run(node, callback);
      }, node.canvas.fps ? (1000 / node.canvas.fps) : (1000 / 60));
    }
  }

  stop() {
    this.running = false;
    this.currentFrame = this.duration;
  }

  update(node, frame) {

  }

  restart(node) {
    this.running = true;
    this.run(node);
  }

  reset(node) {
    this.currentFrame = this.duration;
    this.running = true;
    this.run(node);
  }
}
