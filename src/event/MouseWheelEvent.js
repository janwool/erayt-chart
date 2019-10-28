import Event from './Event';

export default class MouseWheelEvent extends Event {
    constructor(callback, wheelEvent) {
        super(Event.EVENT_MOUSE_WHEEL, callback);
        this.nativeEvent = wheelEvent;
    }
    doEvent() {
        if (!this.isProcessed) {
            setTimeout(() => {
                this.callback && this.callback(this);
            }, 0);
        }
        super.doEvent();
    }
}
