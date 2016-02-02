$(document).ready(function() {

    globals.canvas = document.getElementById("myCanvas");
    globals.context = globals.canvas.getContext("2d");
    globals.loadContent(true);
    globals.loadContent(false);

    $('body').on('click', "#loadPage li", function(event) {
        globals.loadPicture(event.currentTarget.value);
    });

    $('body').on('click', "#template li", function(event) {
        globals.loadTemplate(event.currentTarget.value);
    });

    $('body').on('change', "input[name='pencolor']", function() {
        globals.color = $(this).val();
    });

    $('body').on('change', "input[name='shape']", function() {
        globals.currentShapeType = $(this).val();
        if (globals.currentShapeType !== "write") {
            $("#textarea").hide();
        }
        if (globals.currentShapeType === "select") {
            $("#selectMenu").show();
        } else {
            $("#selectMenu").hide(); 
        }
    });

    $('body').on('change', "select[name='font']", function() {
        globals.font = $(this).val();
        if (globals.currentShapeType === "select") {
            globals.currentShape.font = globals.font;
            globals.redraw();
        }
    });

    $("#linewidth-slider").slider({
        min: 1,
        max: 8,
        value: 2,
        slide: function(e, ui) {
            if (globals.currentShapeType === "select") {
                globals.currentShape.lineWidth = ui.value;
                globals.redraw();
            }  
            globals.lineWidth = ui.value;
            $("#linewidth").text(ui.value);
        }      
    });

    $("#fontsize-slider").slider({
        min: 14,
        max: 48,
        value: 16,
        slide: function(e, ui) {
            if (globals.currentShapeType === "select") {
                globals.currentShape.fontsize = ui.value + "px";
                globals.redraw();
            }
            globals.fontsize = ui.value + "px";
            $("#fontsize").text(ui.value);
        }
    });

    $('body').on('click', "#undoButton", function() {
        globals.undo();
    });

    $('body').on('click', "#redoButton", function() {
        globals.redo();
    });

    $('body').on('click', "#clearButton", function() {
        globals.clear();
    });

    $('body').on('click', "#moveToBack", function() {
        globals.moveToBack();
    });

    $('body').on('click', "#moveToFront", function() {
        globals.moveToFront();
    });

    $('body').on('click', "#fillColor", function() {
        globals.changeFillColor();
    });

    $('body').on('click', "#strokeColor", function() {
        globals.changeStrokeColor();
    });

    $('body').on('click', "#prevPage", function() {
        globals.goToPreviousPage();
    });

    $('body').on('click', "#nextPage", function() {
        globals.goToNextPage();
    });

    $('body').on('click', "#savePage", function() {
        globals.saveContent(false);
    });

    $('body').on('click', "#saveTemplate", function() {
        globals.saveContent(true);
    });

    $("#myCanvas").mousedown(function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        globals.startPoint = new Point(x,y);
        e.preventDefault();
        if (globals.currentShapeType === "select") {
            globals.currentShapeIndex = globals.selectShape(globals.startPoint);
        }
        if (globals.currentShapeType === "write") {
            $("#textarea")
                .show()
                .focus()
                .css('top', e.pageY)
                .css('left', e.pageX)
                .css('font-family', globals.font)
                .css('font-size', globals.fontsize)
                .css('color', globals.color);
        } 
        globals.isDrawing = true;
        globals.currentShape = globals.shapeType(globals.currentShapeType, globals.startPoint);
    });

    $("#myCanvas").mousemove(function(e) {
        if (globals.isDrawing === true &&
                globals.currentShapeType !== "write") {
            var endX = e.pageX - this.offsetLeft;
            var endY = e.pageY - this.offsetTop;
            var endPoint = new Point(endX, endY);
            if (globals.currentShapeType === "select") {
                if (globals.currentShape !== undefined) {
                    $('#myCanvas').css('cursor', 'move');
                    globals.startPoint = globals.currentShape.move(globals.startPoint, endPoint);
                }
            } else {
                globals.currentShape.endPoint = endPoint;
            }
            if (globals.currentShape !== undefined) {
                globals.redraw();
                globals.currentShape.draw(globals.context);
            }
        }
    });

    $("#myCanvas").mouseout(function(e) {
        if (globals.isDrawing) {
            var e = $.Event( "mouseup", { which: 1 } );
                $("#myCanvas").trigger(e);
        }
    });

    $("#myCanvas").mouseup(function(e) {
        if (globals.isDrawing) {
            if (globals.shapes === undefined) {
                globals.shapes = [];
            }
            if (globals.currentShapeType !== "write" &&
                    globals.currentShapeType !== "select") {
                globals.shapes.push(globals.currentShape);
                globals.pages[this.pageIndex] = globals.shapes;
            }
            $('#myCanvas').css('cursor', 'crosshair');
            globals.isDrawing = false; 
        } 
    });

    $("#textarea").change(function(e) {
        globals.theText = $(this).val();
        globals.currentShape.changeText(globals.theText);
        $(this).val("");
        $("#textarea").hide();
        globals.currentShape.draw(globals.context);
        globals.shapes.push(globals.currentShape);
        globals.pages[this.pageIndex] = globals.shapes;
    });

    $(".main-draw").css('min-height',$(window).height());
});