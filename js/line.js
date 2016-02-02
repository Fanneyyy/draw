"use strict"

class Line extends Shape {
	draw(context) {
		context.strokeStyle = this._color;
		context.fillStyle = this._color;
		context.lineWidth = this._lineWidth;
		context.beginPath();
		context.moveTo(this._startPoint.x, this._startPoint.y);
		context.lineTo(this._endPoint.x, this._endPoint.y);
		context.stroke();

		this.calculateSelectBox();
	}
}