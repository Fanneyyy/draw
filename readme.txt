WEPO - Vefforritun 2
---------------------

    ASSIGNMENT 1
---------------------

INTRODUCTION
The assignment was to write a drawing application, using JavaSvript and HTML 5.

SUPPORT
The application was developed for the latest Google Chrome Browser. It uses JavaScript classes which were introduced in ECMAScript 6 and can only run on browsers that support that feature. Support: Chrome 42.0, Firefox 45, Edge 13, Safari 9.0. Not supported: IE and Opera.

FUNCTIONALITY
Draw onto a canvas using pen tool, rectangle tool, oval tool, text tool or a template.
The color of the shape can be chosen with the color picker, the linewidth using the slider and for the text tool it's possible to change the font size with the slider and the font type using a dropdown box.

A select tool can be used to select and move an object. After being selected the object stays selected and while the object is selected it is possible to choose a new color and press change fill color or stroke color to change those values of the current shape. For shapes the line width can be changed by using the slider when the shape is selected but for text the user can use the font size slider to change it. The user can also change the font width the dropdown menu while the text is selected.
Templates can be moved but not edited.
Selected object can also been moved to front or to the back relative to other shapes by using the indicated buttons. Although if moved, shapes will appear on top.

Adding a shape can be undone or redone, and the board can be cleared using the indicated buttons. The clear action can also be undone.

The user can create a new empty canvas to start a new project. The arrow buttons in the lower corners are used to move between boards. The right arrow automatically creates a new board when if the end is reached.

The user can save his projects by inputing a project name and pressing save icon. The projects can then be loaded by pressing the load icon dropdown. Similarly the user can save a template of shapes by inputing a name and press the save icon next to it. The user can then view all templates in the template dropdown and add them to their canvas.
If no name is entered for either the project, the project will automatically receive a title 'Untitled'.

IMPLEMENTATION
Default values:
Tool: pen, Linewidth: 2px, Font size: 16px, Font: Arial, color: blue. Shapes are drawn using stroke but it's possible to add fill with the select tool.
When drawing we decided to force a mouse up event when the user draws out of bounds so it's not necessary to press down again when the mouse reenters the canvas. We feel that it gives a better user experience.

SPECIAL THANKS
Death to the Stock Photo:
http://join.deathtothestockphoto.com/
Provided the background image

AUTHORS
Fanney Sigurðardóttir - fanney14
Kristinn Þorri Þrastarson - kristinnt14