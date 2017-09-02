import Point from './../entity/Point'; 

module.exports = {

    /**
     * Objects should have the following properties 
     * x : x position (map pos),
     * y : y position,
     * width: width in blocks
     * height: height in blocks 
     */
    isCollision: function(obj1, obj2) {
        var topLeft = new Point(obj1.x, obj1.y); 
        var topRight = new Point(obj1.x + obj1.width, obj1.y); 
        var bottomLeft = new Point(obj1.x, obj1.y + obj1.height); 
        var bottomRight = new Point(obj1.x + obj1.width, obj1.y + obj1.height); 

        if (isPointInObject(topLeft, obj2) || isPointInObject(topRight, obj2)
            || isPointInObject(bottomLeft, obj2) || isPointInObject(bottomRight, obj2)) {
            
            return true; 

        } else {
            return false; 
        }
    }

}

/**
 * 
 * @param {*} point Point(x,y)
 * @param {*} obj - x,y,width,height 
 */
function isPointInObject(point, obj) {
    var x = point.getX();
    var y = point.getY(); 

    if ( x >= obj.x && x <= (obj.x + obj.width)) {
        if ( y >= obj.y && y <= (obj.y + obj.height)) {
            return true; 
        }
    }

    return false; 

}