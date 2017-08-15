/**
 * Cave rock 
 */
function CaveRock(mx, my) {

    var WIDTH = 10; 
    var HEIGHT = 10; 

    var self = this; 
    self.width = WIDTH;
    self.height = HEIGHT; 

    // Cave rocks don't move so there doesn't need to be an update function 

    // Renders the cave rocks at x/y on the given canvas 
    self.render = function(canvas) {

        canvas.fillRect(mx, my, WIDTH, HEIGHT); 
        
    }

}

module.exports = CaveRock; 