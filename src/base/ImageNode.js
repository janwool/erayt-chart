import Node from '../core/Node';

export default class ImageNode extends Node {
  constructor(canvas, option) {
    super(canvas);
    this.fileName = option.fileName;
    this.x = option.x || 0;
    this.y = option.y || 0;
    this.image = new Image();
    this.image.src = this.fileName;
    this.width = option.width || this.img.width;
    this.height = option.height || this.img.height;
  }

  resetTexture(_rect){
    if((_rect.x+_rect.width) < this.img.width&&
      (_rect.y+_rect.height) < this.img.height&&
      (_rect.x+_rect.width) > 0&&
      (_rect.y+_rect.height) > 0){
      this.x = _rect.x;
      this.y = _rect.y;
      this.width = _rect.width;
      this.height = _rect.height;
    } else{
      throw 'Out of Bounding'
    }
  }

  draw(painter) {
    painter.translate(this.position.x, this.position.y)
    painter.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height,
      - this.width / 2,
      - this.height / 2,
      this.width,
      this.height
    );
  }

  containsPoint (point) {
    return point.x > this.position.x
      && point.y > this.position.y
      && point.x < this.position.x + this.width
      && point.y < this.position.y + this.height
  }
}