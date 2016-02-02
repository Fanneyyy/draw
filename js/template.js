"use strict"

class Template extends Shape {
    draw(context) {
        for (var i = 0; i < this._shapes.length; i++) {
            this._shapes[i].draw(context);
        }
    }
    calculateSelectBox() {
        var squares = [];
        for (var i = 0, templen = this._shapes.length; i < templen; i++) {
            squares.push(this._shapes[i]._selectBox);
        }
        this._selectBox.combine(squares);
    }
    move(startpoint, endpoint) {
        for (var i = 0; i < this._shapes.length; i++) {
            var point = this._shapes[i].move(startpoint, endpoint);
            this.calculateSelectBox();
        }
        return point;
    }
}