"use strict"

class Pen extends Shape {
	draw(context) {
		context.strokeStyle = this._color;
		context.lineWidth = this._lineWidth;
		for (var i = 0, len = this.points.length-1; i < len; i++) {
			context.beginPath();
			context.moveTo(this._points[i].x, this._points[i].y);
			context.lineTo(this._points[i+1].x, this._points[i+1].y);
			context.stroke();
		};
		this.calculateSelectBox();
	}
	calculateSelectBox() {
		this._selectBox.x1 = this._points[0].x;
		this._selectBox.y1 = this._points[0].y;
		this._selectBox.x2 = 0;
		this._selectBox.y2 = 0;
		for (var i = 0, len = this._points.length; i < len; i++) {
			if (this._selectBox.x1 > this._points[i].x) {
				this._selectBox.x1 = this._points[i].x;
			}
			if (this._selectBox.x2 < this._points[i].x) {
				this._selectBox.x2 = this._points[i].x;
			}
			if (this._selectBox.y1 > this._points[i].y) {
				this._selectBox.y1 = this._points[i].y;
			}
			if (this._selectBox.y2 < this._points[i].y) {
				this._selectBox.y2 = this._points[i].y;
			}
		}
	}
	move(startpoint, endPoint) {
		for (var i = 0, len = this.points.length; i < len; i++) {
			var xMovement = startpoint.x - endPoint.x;
			var yMovement = startpoint.y - endPoint.y;
			this._points[i].x -= xMovement;
			this._points[i].y -= yMovement;
		}
		return new Point(startpoint.x-xMovement, startpoint.y-yMovement)
	}
}