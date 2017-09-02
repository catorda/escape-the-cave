
function InputHandler(domEle) {

    var keyDownPressed = false; 
    var keyUpPressed = false; 
    var keyLeftPressed = false; 
    var keyRightPressed = false; 
    var self = this; 

    function init() {
        domEle.addEventListener('keydown', function(e) {
            var keyCode = e.keyCode; 
            if (keyCode === 40 || keyCode === 83) {
                keyDownPressed = true; 
            } else if (keyCode === 38 || keyCode === 87) {
                keyUpPressed = true; 
            } else if (keyCode === 37 || keyCode === 65) {
                keyLeftPressed = true; 
            } else if (keyCode === 39 || keyCode === 68) {
                keyRightPressed = true; 
            }
        }); 

        domEle.addEventListener('keyup', function(e) {
            var keyCode = e.keyCode; 
            if (keyCode === 40 || keyCode === 83) {
                keyDownPressed = false; 
            } else if (keyCode === 38 || keyCode === 87) {
                keyUpPressed = false; 
            } else if (keyCode === 37 || keyCode === 65) {
                keyLeftPressed = false; 
            } else if (keyCode === 39 || keyCode === 68) {
                keyRightPressed = false; 
            } 
        }); 
    }

    self.down = function() { return keyDownPressed; }
    self.up = function() { return keyUpPressed; }
    self.left = function() { return keyLeftPressed; }
    self.right = function() { return keyRightPressed; } 


    init(); 

}

module.exports = InputHandler; 