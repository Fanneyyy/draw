var globals = {
    canvas: undefined,
    context: undefined,
    clearShapes: undefined,
    currentShape: undefined,
    startPoint: undefined,
    currentShapeIndex: undefined,
    color: "#0000ff",
    currentShapeType: "pen",
    font: "Arial",
    fontsize: "16px",
    lineWidth: "2",
    theText: "",
    isDrawing: false,
    shapes: [],
    temporaryShapes: [],
    undoShapes: [],
    loadedShapes: [],
    loadedTemplates: [],
    pages: [],
    pageUndoShapes: [],
    pageClearShapes: [],
    pageIndex: 0,
    shapeType: function(shape, startPoint) {
        switch(shape) {
            case "pen":
                return new Pen(shape, startPoint, this.color, this.lineWidth);
                break;
            case "line":
                return new Line(shape, startPoint, this.color, this.lineWidth);
                break;
            case "rectangle":
                return new Rectangle(shape, startPoint, this.color, this.lineWidth);
                break;
            case "circle":
                return new Circle(shape, startPoint, this.color, this.lineWidth);
                break;
            case "write":
                return new Write(shape, startPoint, this.color, this.lineWidth, 
                    this.font, this.fontsize);
                break;
            case "select":
                return this.currentShape;
                break;
            case "template":
                return new Template(shape, startPoint, this.color, this.lineWidth);
                break;
            // no default
        }
    },
    redraw: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.shapes !== undefined) {
           for (var i = 0, len = this.shapes.length; i < len; i++) {
                this.shapes[i].draw(this.context);
            } 
        }
    },
    drawNewPage: function() {
        this.shapes = this.pages[this.pageIndex];
        this.undoShapes = this.pageUndoShapes[this.pageIndex];
        this.clearShapes = this.pageClearShapes[this.pageIndex];
        this.redraw();
    },
    selectShape: function(point) {
        var shape, index;
        if (this.shapes !== undefined) {
            for (var i = 0, len = this.shapes.length; i < len; i++) {
                if (this.shapes[i].selectBox.contains(point)) {
                    shape = this.shapes[i];
                    index = i;
                } 
            }
            this.currentShape = shape;
        }
        return index;
    },
    undo: function() {
        if (this.undoShapes === undefined) {
            this.undoShapes = [];
        }
        if (this.clearShapes !== undefined && this.clearShapes.length > 0) {
             this.shapes = this.clearShapes;
             this.clearShapes = [];
            this.pageClearShapes[this.pageIndex] = this.clearShapes;
        } else if (this.shapes.length > 0) {
            this.undoShapes.push(this.shapes.pop());
            this.pageUndoShapes[this.pageIndex] = this.undoShapes;

        } else {
            $('#all-shapes').empty()
            $("#all-shapes").append('<p>Nothing more to undo</p>');
        }
        this.redraw();
    },
    clear: function() {
        this.clearShapes = this.shapes;
        this.shapes = [];
        this.pageClearShapes[this.pageIndex] = this.clearShapes;
        this.redraw();
    },
    redo: function() {
        if (this.undoShapes.length > 0) {
            this.shapes.push(this.undoShapes.pop());
        } else {
            $('#all-shapes').empty()
            $("#all-shapes").append('<p>Nothing more to redo</p>');
        }
        this.redraw();
    },
    moveToBack: function() {
        if (this.currentShapeIndex !== undefined && 
                this.currentShape !== undefined) {
            var temp = new Shape();
            temp = this.currentShape;
            this.shapes.splice(this.currentShapeIndex, 1);
            this.shapes.unshift(temp);
            globals.currentShapeIndex = 0;
            this.currentShape = this.shapes[globals.currentShapeIndex];
        }
        this.redraw();
    },
    moveToFront: function() {
        if (this.currentShapeIndex !== undefined && 
                this.currentShape !== undefined) {
            var temp = new Shape();
            temp = this.currentShape;
            this.shapes.splice(this.currentShapeIndex, 1);
            this.shapes.push(temp);
            globals.currentShapeIndex = this.shapes.length-1;
            this.currentShape = this.shapes[globals.currentShapeIndex];
        }
        this.redraw();
    },
    changeStrokeColor: function() {
        if (this.currentShape !== undefined) {
            this.currentShape.changeColor(this.color, undefined);
        }
        this.redraw();
    },
    changeFillColor: function() {
        if (this.currentShape !== undefined) {
            this.currentShape.changeColor(undefined, this.color);
        }
        this.redraw();
    },
    goToNextPage: function() {
        this.pages[this.pageIndex] = this.shapes;
        this.pageUndoShapes[this.pageIndex] = this.undoShapes;
        this.pageClearShapes[this.pageIndex] = this.clearShapes;
        this.pageIndex += 1;
        this.drawNewPage();
        $("input[name='shape']:radio:first").click();
    },
    goToPreviousPage: function() {
        if (this.pageIndex > 0) {
            this.pages[this.pageIndex] = this.shapes;
            this.pageUndoShapes[this.pageIndex] = this.undoShapes;
            this.pageClearShapes[this.pageIndex] = this.clearShapes;
            this.pageIndex -= 1;
            this.drawNewPage()
            $("input[name='shape']:radio:first").click();
        }
    },
    saveContent: function(template) {
        // This only saves current page
        var stringifiedArray = JSON.stringify(this.shapes);
        var param = { 
            "user": "fanney14", // You should use your own username!
            "name": ($('#project').val() === "") ? "Untitled" : $('#project').val(),
            "content": stringifiedArray,
            "template": template
        }
        if (template) {
            param.name = $('#templateName').val();
        }
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://whiteboard.apphb.com/Home/Save",
            data: param,
            dataType: "jsonp",
            crossDomain: true,
            success: function (data) {
                globals.loadContent(template);
            },
            error: function (xhr, err) {
                // Something went wrong
                $('#all-shapes').empty();
                $("#all-shapes").append('<p>Error: ' + err + ' </p>');
            }
        });
    },
    loadContent: function(template) {
        // This gets all saved objects
        var param = { 
            "user": "fanney14",
            "template": template
        };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://whiteboard.apphb.com/Home/GetList",
            data: param,
            dataType: "jsonp",
            crossDomain: true,
            success: function (data) {
                // The load was successful...
                if (!template) {
                    globals.loadedShapes = [];
                    for (var i = 0, loadLength = data.length; i < loadLength; i++) {
                        globals.loadedShapes.push({
                            name : data[i].WhiteboardTitle,
                            array : $.parseJSON('[' + data[i].WhiteboardContents + ']'),
                            template: data[i].IsTemplate
                        });
                    }
                    globals.listLoadedPictures();
                } else {
                    globals.loadedTemplates = [];
                    for (var i = 0, loadLength = data.length; i < loadLength; i++) {
                        globals.loadedTemplates.push({
                            name : data[i].WhiteboardTitle,
                            array : $.parseJSON('[' + data[i].WhiteboardContents + ']'),
                            template: data[i].IsTemplate
                        });
                    }
                    globals.listLoadedTemplates();
                }
            },
            error: function (xhr, err) {
                // Something went wrong...
                $('#all-shapes').empty();
                $("#all-shapes").append('<p>Error: ' + err + ' </p>');
            }
        });
    },
    makeShapes: function(shapeIndex, template) {
        if (template) {
            var shapesToDisplay = this.loadedTemplates[shapeIndex];
        } else {
            var shapesToDisplay = this.loadedShapes[shapeIndex];
        }
        for (var i = 0, len = shapesToDisplay.array[0].length; i < len; i++) {
            this.setGlobals(shapesToDisplay.array[0][i]);
            var loadedShape = this.shapeType(shapesToDisplay.array[0][i]._type, shapesToDisplay.array[0][i]._startPoint);
            loadedShape.endPoint = shapesToDisplay.array[0][i]._endPoint;
            loadedShape.calculateSelectBox();
            loadedShape.type = shapesToDisplay.array[0][i]._type;
            loadedShape.theText = shapesToDisplay.array[0][i]._theText
            loadedShape.filled = shapesToDisplay.array[0][i]._filled;
            loadedShape.fillColor = shapesToDisplay.array[0][i]._fillColor;
            loadedShape.color = shapesToDisplay.array[0][i]._color;
            this.temporaryShapes.push(loadedShape);
        }
    },
    loadPicture: function(shapeIndex) {
        // This clears board and draws the selected picture
        this.makeShapes(shapeIndex, false);
        this.shapes = this.temporaryShapes;
        this.temporaryShapes = [];
        this.redraw();
    },
    loadTemplate: function(shapeIndex) {
        this.makeShapes(shapeIndex, true);
        var loadedTemplate = this.shapeType("template", this.temporaryShapes[0].startPoint);
            for (var i = 0; i < this.temporaryShapes.length; i++) {
                loadedTemplate._shapes.push(this.temporaryShapes[i]);
            }
            loadedTemplate.endPoint = loadedTemplate._shapes[0]._endPoint;
            loadedTemplate.calculateSelectBox();
            loadedTemplate.theText = loadedTemplate._shapes[0]._theText
            loadedTemplate.filled = loadedTemplate._shapes[0]._filled;
            this.shapes.push(loadedTemplate);
            loadedTemplate = undefined;
            this.temporaryShapes = [];
            this.redraw();
    },
    listLoadedPictures: function() {
        var picLength = this.loadedShapes.length;
        $('#loadPage').empty()
        if (picLength === 0) {
            $('#loadPage').append('<li><a>No pictures available</a></li>');
        }
        for (var i = 0; i < picLength; i++) {
            $('#loadPage').append('<li value="' + i + '"><a>' + this.loadedShapes[i].name + '</a></li>');
        }
    },
    listLoadedTemplates: function() {
        var picLength = this.loadedTemplates.length;
        $('#template').empty()
        if (picLength === 0) {
            $('#template').append('<li><a>No templates available</a></li>');
        }
        for (var i = 0; i < picLength; i++) {
            $('#template').append('<li value="' + i + '"><a>' + this.loadedTemplates[i].name + '</a></li>');
        }
    },
    setGlobals: function(that) {
        this.color = that._color;
        this.lineWidth = that._lineWidth;
        this.font = that._font;
        this.fontsize = that._fontsize;
    }
};
