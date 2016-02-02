"use strict"

class Shape {
	constructor(type, startPoint, color, lineWidth, font, fontsize) {
		this._startPoint = startPoint;
		this._endPoint = startPoint;
		this._selectBox = new Square();
		this._color = (color === undefined) ? "#0000ff" : color;
		this._fillColor;
		this._lineWidth = lineWidth;
		this._points = [];
		this._points.push(this.startPoint);
		this._font = font;
		this._fontsize = fontsize;
		this._theText = "";
		this._filled = false;
		this._type = type;
		this._shapes = [];
	}

	// Getters
	get startPoint() {
		return this._startPoint;
	}
	get endPoint() {
		return this._endPoint;
	}
	get selectBox() {
		return this._selectBox;
	}
	get color() {
		return this._color;
	}
	get fillColor() {
		return this._fillColor;
	}
	get lineWidth() {
		return this._lineWidth;
	}
	get points() {
		return this._points;
	}
	get font() {
		return this._font;
	}
	get fontsize() {
		return this._fontsize;
	}
	get filled() {
		return this._filled;
	}
	get type() {
		return this._type;
	}
	get theText() {
		return this._theText;
	}

	// Setters
	set startPoint(newPoint) {
		this._startPoint = newPoint;
	}
	set endPoint(newPoint) {
		if (this._type === "pen") {
			this._points.push(newPoint);
		}
		this._endPoint = newPoint;
	}
	set selectBox(newBox) {
		this._selectBox = newBox;
	}
	set fillColor(newColor) {
		this._fillColor = newColor;
	}
	set color(newColor) {
		this._color = newColor;
	}
	set lineWidth(newWidth) {
		this._lineWidth = newWidth;
	}
	set points(newPoints) {
		this._points = newPoints;
	}
	set font(newFont) {
		this._font = newFont;
	}
	set fontsize(newSize) {
		this._fontsize = newSize;
	}
	set filled(newFilled) {
		this._filled = newFilled;
	}
	set type(newType) {
		this._type = newType;
	}
	set theText(newText) {
		this._theText = newText;
	}

	calculateSelectBox() {
		this._selectBox.x1 = this._startPoint.x;
		this._selectBox.y1 = this._startPoint.y;
		this._selectBox.x2 = this._endPoint.x;
		this._selectBox.y2 = this._endPoint.y;
	}
	move(startpoint, endPoint) {
		var xMovement = startpoint.x - endPoint.x;
		var yMovement = startpoint.y - endPoint.y;
		this._startPoint.x -= xMovement;
		this._startPoint.y -= yMovement;
		this._endPoint.x -= xMovement;
		this._endPoint.y -= yMovement;
		return new Point(startpoint.x-xMovement, startpoint.y-yMovement);
	}
	changeColor(strokeColor, fillColor) {
		if (strokeColor !== undefined) {
			this._color = strokeColor;
		}
		if (fillColor !== undefined) {
			this._fillColor = fillColor;
			this._filled = true;
		}
	}
}