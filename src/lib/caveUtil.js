import Point from '../entity/Point'; 

module.exports = {

    /**
     * 
     */    
    getStartingSpaces: function(currentCave2dArray, options) {
        const defaultOptions = {
            emptyTopSpace: 2, 
            emptyLeftSpace: 3,
            emptyRightSpace: 4,
            emptyBottomSpace: 2 
        }

        let startingSpaces = []; 

        options = Object.assign({}, defaultOptions, options); 

        for(var x = 0; x < currentCave2dArray.length; x++) {

            for(var y = 0; y < currentCave2dArray[0].length; y++) {
                if (allRequiredSpacesEmpty(new Point(x, y), currentCave2dArray, options.emptyTopSpace, options.emptyLeftSpace,
                        options.emptyRightSpace, options.emptyBottomSpace)) {
                            startingSpaces.push(new Point(x, y)); 
                        }
            }
        }

        return startingSpaces; 

    }

}

function allRequiredSpacesEmpty(currentPoint, cave, top, left, right, bottom) {
    // true means there is a rock there 
    if(cave[currentPoint.x][currentPoint.y])
        return false; 

    // check the top to bottom 
    var topY = currentPoint.y - top; 
    var bottomY = currentPoint.y + bottom; 
    
    // check left to right 
    var leftX = currentPoint.x - left; 
    var rightX = currentPoint.x + right; 

    // If it's on the border, return false 
    if(topY < 0 || leftX < 0 || bottomY >= cave[0].length || rightX >= cave.length)
        return false; 

    // check the whole bounding box 
    for (var x = leftX; x <= rightX; x++) {
        for(var y = topY; y <= bottomY; y++) {
            if(cave[x][y])
                return false; 
        }
    }

    return true; 

}