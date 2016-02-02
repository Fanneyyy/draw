"use strict"

class Rectangle extends Shape {
	draw(context) {
		var width = this._endPoint.x - this._startPoint.x;
		var height = this._endPoint.y - this._startPoint.y;
		context.beginPath();
		context.lineWidth = this._lineWidth;
		context.strokeStyle = this._color;
		context.rect(this._startPoint.x, this._startPoint.y, width, height);
		if (this._filled) {
			context.fillStyle = this._fillColor;
			context.fill();
		};
		context.stroke();

		this.calculateSelectBox();
	}
}