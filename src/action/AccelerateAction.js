import Action from '../core/Action';

export default class AccelerateAction extends Action {
    constructor(duration,  option) {
        super(duration);
        this.speedX = option.speedX || 0;
        this.speedY = option.speedY || 0;
        this.accelerateX = option.accelerateX || 0;
        this.accelerateY = option.accelerateY || 0;
        this.beforeUpdate = option.beforeUpdate;
    }

    update(node, frame) {
        if (this.duration === 0) {
            return;
        }
        const t = 1 / 60;
        const vX = this.speedX - (this.duration - frame) / 60  * this.accelerateX;
        const vY = this.speedY - (this.duration - frame) / 60 * this.accelerateY;
        const distX = vX * t + 0.5 * this.accelerateX * t * t;
        const distY = vY * t + 0.5 * this.accelerateY * t * t;
        if (!node.locked) {
            node.setPosition(node.position.x + distX, node.position.y + distY);
            this.beforeUpdate && this.beforeUpdate(node, frame);
            node.canvas.paint();
        }
    }
}
