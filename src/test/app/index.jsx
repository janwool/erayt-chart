import React from 'react';
import Canvas from '../../core/Canvas';
import './index.scss';
import ReactDOM from "react-dom";
import Circle from  '../../base/Circle';
import Color from '../../core/Color';
import Event from '../../event/Event';
import MoveAction from '../../action/MoveAction';
import Point from '../../core/Point';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.canvas = new Canvas({
      ele: this.canvasRef.current, // 容器DOM节点
      canAction: true, //启动动作
    });
    const circle = new Circle(this.canvas, 30);
    // 设置位置居于画布中间
    circle.setPosition(this.canvas.width / 2, this.canvas.height / 2);
    //设置颜色为红色
    circle.setColor(new Color('#FF0000'));
    // 添加点击事件
    circle.addEventListener(Event.EVENT_CLICK, (e) => {
      // 创建移动动作
      let moveAction = new MoveAction(2, new Point(100, 100));
      circle.runAction(moveAction);
    });
    //添加圆到画布中
    this.canvas.addChild(circle);
    //画布绘制
    this.canvas.paint();
  }

  render() {
    return (<div ref={this.canvasRef} className="chart-wrapper"/>)
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)