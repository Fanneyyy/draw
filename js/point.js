"use strict"

class Point {
	constructor(x,y) {
		this.x = (x === undefined) ? 0 : x;
		this.y = (y === undefined) ? 0 : y;
	}
	changeCoord(x, y) {
		this.x = x;
		this.y = y;
	}
}
