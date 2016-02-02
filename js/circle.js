"use strict"

class Circle extends Shape {
	draw(context) {
		var width = this._endPoint.x - this._startPoint.x;
		var height = this._endPoint.y - this._startPoint.y;
		context.strokeStyle = this._color;
		context.fillStyle = this._color;
		context.lineWidth = this._lineWidth;
		context.beginPath();
  
 		context.moveTo(this.startPoint.x, this._startPoint.y - height);
  
  		context.bezierCurveTo(
	    	this._startPoint.x + width, this._startPoint.y - height,
	    	this._startPoint.x + width, this._startPoint.y + height,
	    	this._startPoint.x, this._startPoint.y + height);

  		context.bezierCurveTo(
	    	this._startPoint.x - width, this._startPoint.y + height,
	    	this._startPoint.x - width, this._startPoint.y - height,
	    	this._startPoint.x, this._startPoint.y - height);

  		if (this.filled) {
			context.fillStyle = this._fillColor;
			context.fill();
		}
  		context.stroke();
  		context.closePath();

		this.calculateSelectBox();
	}
	calculateSelectBox() {
		var width = this.endPoint.x - this.startPoint.x;
		var height = this.endPoint.y - this.startPoint.y;
		this._selectBox.x1 = this._startPoint.x - width;
		this._selectBox.y1 = this._startPoint.y - height;
		this._selectBox.x2 = this._endPoint.x;
		this._selectBox.y2 = this._endPoint.y;
	}
}