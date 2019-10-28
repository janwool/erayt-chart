import BaseLayer from './BaseLayer';
import Text from '../base/Text';
import DashLine from '../base/DashLine';
import Point from '../core/Point';

export default class AxisLayer extends BaseLayer {
    constructor(canvas, option) {
        super(canvas);
        this.width = option.width || this.canvas.width;
        this.height = option.height || this.canvas.height;
        this.yAxisType = option.yAxisType || AxisLayer.AxisType.NUMBER;
        this.xAxisType = option.xAxisType || AxisLayer.AxisType.LABEL;
        this.xAxisGraduations = option.xAxisGraduations || 5;
        this.yAxisGraduations = option.yAxisGraduations || 5;
        this.yAxisMax = option.yAxisMax || 1;
        this.yAxisMin = option.yAxisMin || 0;
        this.xAxisMax = option.xAxisMax || 1;
        this.xAxisMin = option.xAxisMin || 0;
        this.xAxisLabels = option.xAxisLabels || [];
        this.yAxisLabels = option.yAxisLabels || [];
        this.xAxisRender = option.xAxisRender || this.xAxisDefaultRender;
        this.yAxisRender = option.yAxisRender || this.yAxisDefaultRender;
        this.xAxisPosition = option.xAxisPosition || AxisLayer.AxisPosition.BLOCK;
        this.yAxisPosition = option.yAxisPosition || AxisLayer.AxisPosition.INNER;
    }

    xAxisDefaultRender(label) {
        return {
            text: `${label}`,
            size: 20,
            font: 'PingFang SC',
            color: '#999999'
        };
    }

    yAxisDefaultRender(label) {
        return {
            text: `${label}`,
            size: 20,
            font: 'PingFang SC',
            color: '#999999'
        };
    }

    setXAxisRender(render) {
        this.xAxisRender = render;
    }

    setYAxisRender(render) {
        this.yAxisRender = render;
    }

    make() {
        if (this.xAxisGraduations <= 2) {
            throw 'X轴坐标标尺数不能小于等于2';
        }
        if (this.yAxisGraduations <= 2) {
            throw 'Y轴坐标标尺数不能小于等于2';
        }
        this.onBeforeMake && this.onBeforeMake(this);
        this.childs.splice(0, this.childs.length);
        let xLabels = [];
        let xHeight = 0;
        let yLabels = []
        let yWidth = 0;
        if (this.xAxisType === AxisLayer.AxisType.NUMBER) {
            let xAxisStep = (this.xAxisMax - this.xAxisMin) / (this.xAxisGraduations - 1);
            for (let i = 0; i < this.xAxisGraduations; i++) {
                let xAxisStyle = this.xAxisRender(this.xAxisMin + i * xAxisStep);
                let xAxisTextValue = xAxisStyle.text || '';
                let xAxisTextSize = parseInt(xAxisStyle.size) || 20;
                let xAxisTextFont = xAxisStyle.font || 'PingFang SC';
                let xAxisTextColor = xAxisStyle.color || '#999999';
                if (xAxisTextSize > xHeight) {
                    xHeight = xAxisTextSize;
                }
                let xAxisText = new Text(this.canvas, {
                    text: xAxisTextValue,
                    size: xAxisTextSize,
                    font: xAxisTextFont,
                    color: xAxisTextColor
                });
                xLabels.push(xAxisText);
            }
        } else {
            for (let i = 0; i < this.xAxisLabels.length; i++) {
                let xAxisStyle = this.xAxisRender(this.xAxisLabels[i]);
                let xAxisTextValue = xAxisStyle.text || '';
                let xAxisTextSize = parseInt(xAxisStyle.size) || 20;
                let xAxisTextFont = xAxisStyle.font || 'PingFang SC';
                let xAxisTextColor = xAxisStyle.color || '#999999';
                if (xAxisTextSize > xHeight) {
                    xHeight = xAxisTextSize;
                }
                let xAxisText = new Text(this.canvas, {
                    text: xAxisTextValue,
                    size: xAxisTextSize,
                    font: xAxisTextFont,
                    color: xAxisTextColor
                });
                xLabels.push(xAxisText);
            }
        }
        if (this.yAxisType === AxisLayer.AxisType.NUMBER) {
            let yAxisStep = (this.yAxisMax - this.yAxisMin) / (this.yAxisGraduations - 1);
            for (let i = 0; i < this.yAxisGraduations; i++) {
                let yAxisStyle = this.yAxisRender(this.yAxisMin + i * yAxisStep);
                let yAxisTextValue = yAxisStyle.text || '';
                let yAxisTextSize = parseInt(yAxisStyle.size) || 20;
                let yAxisTextFont = yAxisStyle.font || 'PingFang SC';
                let yAxisTextColor = yAxisStyle.color || '#999999';
                if (yAxisTextSize > yWidth) {
                    yWidth = yAxisTextSize * 0.625;
                }
                let yAxisText = new Text(this.canvas, {
                    text: yAxisTextValue,
                    size: yAxisTextSize,
                    font: yAxisTextFont,
                    color: yAxisTextColor
                });
                yLabels.push(yAxisText);
            }
        } else {
            for (let i = 0; i < this.yAxisLabels.length; i++) {
                let yAxisStyle = this.yAxisRender(this.yAxisLabels[i]);
                let yAxisTextValue = yAxisStyle.text || '';
                let yAxisTextSize = parseInt(yAxisStyle.size) || 20;
                let yAxisTextFont = yAxisStyle.font || 'PingFang SC';
                let yAxisTextColor = yAxisStyle.color || '#999999';
                if (yAxisTextSize > yWidth) {
                    yWidth = yAxisTextSize * 0.625;
                }
                let yAxisText = new Text(this.canvas, {
                    text: yAxisTextValue,
                    size: yAxisTextSize,
                    font: yAxisTextFont,
                    color: yAxisTextColor
                });
                yLabels.push(yAxisText);
            }
        }
        const xLabelY = this.xAxisPosition === AxisLayer.AxisPosition.INNER ? 0 : xHeight;
        const yLabelX = this.yAxisPosition === AxisLayer.AxisPosition.INNER ? 0 : yWidth;

        // 绘制X轴标尺
        const xStep = (this.width - yLabelX) / (this.xAxisGraduations - 1);
        for (let i = 0; i < this.xAxisGraduations; i++) {
            const positionX = this.position.x + yLabelX + i * xStep;
            let xLine = new DashLine(this.canvas, {
                from: new Point(positionX, this.position.y + xLabelY),
                to: new Point(positionX, this.position.y + this.height),
                color: '#999999'
            });
            if (xLabels[i]) {
                if (i === 0) {
                    xLabels[i].setPosition(positionX, this.position.y);
                } else if (i === this.xAxisGraduations - 1) {
                    xLabels[i].setPosition(positionX - xLabels[i].text.length * 0.625 * xLabels[i].size, this.position.y);
                } else {
                    xLabels[i].setPosition(positionX - xLabels[i].text.length * 0.625 * xLabels[i].size / 2, this.position.y);
                }
                this.addChild(xLabels[i]);
            }
            this.addChild(xLine);
        }
        // 绘制Y轴标尺
        const yStep = (this.height - xLabelY) / (this.yAxisGraduations - 1);
        for (let i = 0; i < this.yAxisGraduations; i++) {
            const positionY = this.position.y + xLabelY + i * yStep;
            let yLine = new DashLine(this.canvas, {
                from: new Point(this.position.x + yLabelX, positionY),
                to: new Point(this.position.x + this.width, positionY),
                color: '#999999'
            });
            if (yLabels[i]) {
                if (i === 0) {
                    yLabels[i].setPosition(this.position.x, positionY);
                } else if (i === this.yAxisGraduations - 1){
                    yLabels[i].setPosition(this.position.x, positionY - yLabels[i].size);
                } else {
                    yLabels[i].setPosition(this.position.x, positionY - yLabels[i].size * 0.5);
                }

                this.addChild(yLabels[i]);
            }
            this.addChild(yLine);
        }
        this.onMaked && this.onMaked(this, {
            xStart: yLabelX,
            yStart: xLabelY
        });
    }


}
AxisLayer.AxisType = {
    NUMBER: 0,
    LABEL: 1
};
AxisLayer.AxisPosition = {
    INNER: 0,
    BLOCK: 1
};
