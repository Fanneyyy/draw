"use strict"

class Square {
	constructor(x1,y1,x2,y2) {
		this.x1 = (x1 === undefined) ? 0 : x1;
		this.y1 = (y1 === undefined) ? 0 : y1;
		this.x2 = (x2 === undefined) ? 0 : x2;
		this.y2 = (y2 === undefined) ? 0 : y2;
	}
	contains(point) {
		if (point.x >= Math.min(this.x1, this.x2) &&
                point.x <= Math.max(this.x1, this.x2) &&
                point.y >= Math.min(this.y1, this.y2) && 
                point.y <= Math.max(this.y1, this.y2)) {
			return true;
		}
		return false;
	}
	draw(context) {
		var width = this.x2 - this.x1;
		var height = this.y2 - this.y1;
		context.beginPath();
		context.lineWidth = "1";
		context.strokeStyle = "grey";
		context.rect(this.x1, this.y1, width, height);
		context.stroke();
	}
	combine(squares) {
		var maxX = Math.max(squares[0].x1, squares[0].x2), 
			minX = Math.min(squares[0].x1, squares[0].x2), 
			maxY = Math.max(squares[0].y1, squares[0].y2), 
			minY = Math.min(squares[0].y1, squares[0].y2);
		for (var i = 0, len = squares.length; i < len; i++) {
			if (maxX < Math.max(squares[i].x1, squares[i].x2)) {
				maxX = Math.max(squares[i].x1, squares[i].x2);
			}
			if (minX > Math.min(squares[i].x1, squares[i].x2)) {
				minX = Math.min(squares[i].x1, squares[i].x2);
			}
			if (maxY < Math.max(squares[i].y1, squares[i].y2)) {
				maxY = Math.max(squares[i].y1, squares[i].y2);
			}
			if (minY > Math.min(squares[i].y1, squares[i].y2)) {
				minY = Math.min(squares[i].y1, squares[i].y2);
			}
		}
		this.x1 = minX;
		this.y1 = minY;
		this.x2 = maxX;
		this.y2 = maxY;
	}
}