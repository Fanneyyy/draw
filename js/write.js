"use strict"

class Write extends Shape {
	draw(context) {
		context.fillStyle = this._color;
		context.font = this._fontsize + ' ' + this._font;
		context.fillText(this._theText,this._startPoint.x,this._startPoint.y);
		this.calculateSelectBox();
	}
	changeFontSize(fontsize) {
		this._fontsize = fontsize;
	}
	changeText(theText) {
		this._theText = theText;
	}
	calculateSelectBox() {
		this.selectBox.x1 = this.startPoint.x;
		this.selectBox.y1 = this.startPoint.y;
		this.selectBox.x2 = this.startPoint.x+100;
		this.selectBox.y2 = this.startPoint.y-30;
	}
	move(startpoint, endPoint) {
		var xMovement = startpoint.x - endPoint.x;
		var yMovement = startpoint.y - endPoint.y;
		this._startPoint.x -= xMovement;
		this._startPoint.y -= yMovement;
		return new Point(startpoint.x-xMovement, startpoint.y-yMovement);
	}
}