/**
 * Cave rock 
 */
function CaveRock(mx, my) {

    var self = this; 

    // Cave rocks don't move so there doesn't need to be an update function 

    // Renders the cave rocks at x/y on the given canvas 
    self.render = function(canvas, x, y, width, height) {

        // The x/y will be different depending on the 
        // current view port, we'll take the x/y as parameters
        canvas.fillRect(x, y, width, height); 
        
    } 

    self.getX = function() { return mx; }; 

    self.getY = function() { return my; }; 

}

module.exports = CaveRock; 