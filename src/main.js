import raf from './raf'; 
import rng from './rng'; 
import caveGenerator from './lib/caveGenerator';
import CaveRock from './entity/CaveRock'; 

var canvas = document.querySelector('#game');
var ctx = canvas.getContext('2d');

var rand = rng();

var balls = [];
var colors = [
  '#7FDBFF', '#0074D9', '#01FF70', '#001F3F', '#39CCCC',
  '#3D9970', '#2ECC40', '#FF4136', '#85144B', '#FF851B',
  '#B10DC9', '#FFDC00', '#F012BE',
];

var groundMap = []; 
var caveRocks = []; 

groundMap = caveGenerator.getCaveMap(canvas.width/10, canvas.height/10); 

// create a cave rock for every groundMap with true 
for (var x = 0; x < groundMap.length; x++) {
  for(var y = 0; y < groundMap[0].length; y++) {
    if(groundMap[x][y])
      caveRocks.push(new CaveRock(x*10, y*10)); // because the cave map is in blocks of 10  
  }
}

console.log(groundMap);

raf.start(function(elapsed) {
  // Clear the screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update each balls
  caveRocks.forEach(function(caveRock) {
    // Gravity

    // Handle collision against the canvas's edges

    // Update ball position

    // Render the ball
    ctx.beginPath();

    ctx.closePath();
    caveRock.render(ctx); 
    ctx.fillStyle = '#2ECC40';
    ctx.fill();
  });
});
