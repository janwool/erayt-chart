import Event from './Event';

export default class DragEvent extends Event {
  constructor(callback) {
    super(Event.EVENT_DRAG, callback);
    this.distanceX = 0; // X轴移动距离
    this.distanceY = 0; // Y轴移动距离
  }

  dragging(point) {
    if (!this.isProcessed) {
      this.distanceX = point.x - this.eventPoint.x;
      this.distanceY = point.y - this.eventPoint.y;
      this.eventPoint = point;
      setTimeout(() => {
        this.callback(this);
      }, 0);
    }
  }

  doEvent() {
    // 将事件从管理器中移除
    this.manager.moveQueue.splice(this.manager.moveQueue.indexOf(this), 1);
    super.doEvent();
  }
}
