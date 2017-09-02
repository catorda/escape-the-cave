/**
 * Entity for the player 
 */

function Spelunker(mx, my) {
    var self = this; 
    var WIDTH = 10;
    var HEIGHT = 15; 

    self.getNewPosition = function(someInput) {
        // based on the input, calculates a new position. 
        // The game needs to decide if this position collides anywhere 

    }

    self.setPosition = function(newX, newY) {
        mx = newX; 
        my = newY; 
    }

    self.render = function(ctx, x, y, width, height) {
        
        ctx.fillStyle = '#ABABAB';
        ctx.fillRect(x, y, width, height); 


    }

    self.getX = function() { return mx; }; 

    self.getY = function() { return my; }; 
}

module.exports = Spelunker;