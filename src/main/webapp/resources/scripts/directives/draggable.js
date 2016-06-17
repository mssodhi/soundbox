'use strict';

angular.module('app').directive('draggable', ['$document', function($document) {
    return {
        link: function(scope, element) {
            var startX = 0, startY = 0, x = 0, y = 0;

            element.css({
                position: 'relative',
                border: '1px solid red',
                backgroundColor: 'lightgrey',
                cursor: 'pointer'
            });

            element.on('mousedown', function(e) {
                // Prevent default dragging of selected content
                e.preventDefault();
                startX = e.pageX - x;
                startY = e.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(e) {
                y = e.pageY - startY;
                x = e.pageX - startX;
                element.css({
                    top: y + 'px',
                    left:  x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        }
    };
}]);