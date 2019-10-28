export default class Event {
  constructor(_event, _callback) {
    this.event = _event;
    this.callback = _callback;
    this.isProgapation = true;
    this.node = null;
    this.isProcessed = false; // 该事件是否被处理
    this.manager = null;
    this.eventPoint = null;
  }

  // 禁止事件往下传递
  stopProgapation() {
    this.isProgapation = false;
  }

  doEvent() {
    this.isProcessed = true;
  }
}

Event.EVENT_MOUSE_DOWN = 1;
Event.EVENT_MOUSE_MOVE = 2;
Event.EVENT_MOUSE_UP = 3;
Event.EVENT_CLICK = 4;       // 单击
Event.EVENT_LONG_CLICK = 5; // 长点击
Event.EVENT_DRAG = 6;       // 拖拽
Event.EVENT_TOUCH_START = 7;
Event.EVENT_TOUCH_MOVE = 8;
Event.EVENT_TOUCH_END = 10;
Event.EVENT_TAP = 11;
Event.EVENT_LONG_TAP = 12;
Event.EVENT_SCALE = 13;
Event.EVENT_DRAG_END = 14; // 拖拽结束
Event.EVENT_MOUSE_WHEEL = 15; // 滚轮事件
Event.EVENT_MOUSE_ENTER = 16; // 鼠标进入事件
Event.EVENT_MOUSE_OUTER = 17; // 鼠标出去事件
