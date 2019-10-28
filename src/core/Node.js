import Point from './Point';
import Scheduler from './Scheduler';
import Action from './Action';
import Event from '../event/Event';
import Listener from '../event/Listener';

export default class Node {
  constructor(canvas) {
    this.position = new Point(0, 0);
    this.visible = true;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.alpha = 1;
    this.schedulers = [];
    this.canvas = canvas || null;
    this.isSelected = false;
    this.isDraggable = false;
    this.locked = false;
    this.ext = null; // 附加数据
  }

  setPosition(_x, _y = 0) {
    if (_x instanceof Point) {
      this.position = _x;
    } else {
      this.position.x = parseInt(_x);
      this.position.y = parseInt(_y);
    }
  }

  getPosition() {
    return this.position;
  }

  scheduleUpdate(dt) {
    this.updateScheduler = setInterval((dt) => {
      this.update(dt);
    }, dt);
  }

  unschedulerUpdate() {
    clearInterval(this.updateScheduler);
  }

  update(dt) {
    // 用于继承
  }

  schedule(callback, dt) {
    const scheduler = setInterval(callback(dt), dt);
    this.schedulers.push(new Scheduler(scheduler, callback));
  }

  runAction(action, callback) {
    if (action instanceof Action) {
      action.reset(this);
      action.run(this, callback);
    } else {
      throw new Error('Error Arguments: action is not a instance of class Action');
    }
  }

  stopAction(action) {
    if (action instanceof Action) {
      action.stop();
    } else {
      throw new Error('Error Arguments: action is not a instance of class Action');
    }
  }

  unscheduler(callback) {
    for (const i in this.schedulers) {
      const scheduler = this.schedulers[i];
      if (scheduler.callback === callback) {
        this.schedulers.slice(i, 1);
        clearInterval(scheduler.scheduler);
        break;
      }
    }
  }

  containsPoint(point) {
    return false;
  }

  addEventListener(event, callback) {
    if (this.canvas === undefined || this.canvas === null) {
      throw new Error('No Canvas Found');
    }
    const ev = new Event(event, callback);
    const listener = new Listener(this, ev);
    this.canvas.eventManager.addEventListener(listener);
  }

  removeEventListener(event, callback) {
    if (this.canvas === undefined || this.canvas === null) {
      throw new Error('No Canvas Found');
    }
    const ev = new Event(event, callback);
    const listener = new Listener(this, ev);
    this.canvas.eventManager.removeEventListener(listener);
  }

  clearEventListener() {
    const listeners = this.canvas.eventManager.listeners.filter(item => item.obj === this);
    if (listeners) {
      for (const l of listeners) {
        this.canvas.eventManager.listeners.splice(this.canvas.eventManager.listeners.indexOf(l), 1);
      }
    }
  }

  draw(painter) {
    // Node 绘制函数
  }

  paint(config) {
    if (this.visible) {
      const { painter } = this.canvas;
      config.before && config.before(this, painter);
      painter.save();
      painter.globalAlpha = this.alpha;
      painter.translate(0, this.scaleY * (this.canvas.height - 2 * this.position.y));
      painter.rotate(this.rotation * Math.PI / 180);
      painter.scale(this.scaleX, this.scaleY);
      this.draw(painter);
      painter.restore();
      config.after && config.after(this, painter);
    }
  }
}
