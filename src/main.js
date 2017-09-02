import raf from './raf'; 
import rng from './rng'; 
import caveGenerator from './lib/caveGenerator';
import CaveRock from './entity/CaveRock'; 
import caveUtil from './lib/caveUtil'; 
import Spelunker from './entity/Spelunker'; 
import InputHandler from './lib/inputHandler'; 
import collisionUtil from './lib/collisionUtil'; 

var canvas = document.querySelector('#game');
var ctx = canvas.getContext('2d');

var BLOCK_WIDTH = 25; 
var BLOCK_HEIGHT = 25;
var PLAYER_HEIGHT = 40; 
var MAP_WIDTH = 80; 
var MAP_HEIGHT = 60; 
var VIEW_WIDTH_BLOCKS = 32; 
var VIEW_HEIGHT_BLOCKS = 24; 

var rand = rng(21340889);

var colors = [
  '#7FDBFF', '#0074D9', '#01FF70', '#001F3F', '#39CCCC',
  '#3D9970', '#2ECC40', '#FF4136', '#85144B', '#FF851B',
  '#B10DC9', '#FFDC00', '#F012BE',
];

var groundMap = []; 
var caveRocks = [];
var caveRocksMap = {}; // x-y : caveRock  
var player = new Spelunker(); 
var inputHandler = new InputHandler(document); 

// variables to hold the current x/y coordinates in view 
var topX = 0; 
var topY = 0; 

/** INITIALIZATION  */

groundMap = caveGenerator.getCaveMap(MAP_WIDTH, MAP_HEIGHT); 

// create a cave rock for every groundMap with true 
for (var x = 0; x < groundMap.length; x++) {
  for(var y = 0; y < groundMap[0].length; y++) {
    if(groundMap[x][y])
      caveRocksMap[x + '-' + y] = new CaveRock(x, y); 
  }
}

var potentialStartingPoints = caveUtil.getStartingSpaces(groundMap); 
var startingSpace = potentialStartingPoints[rand.range(0, potentialStartingPoints.length -1)]; 
player.setPosition(startingSpace.x, startingSpace.y); 
topX = startingSpace.x - (VIEW_WIDTH_BLOCKS/2); 
topY = startingSpace.y - (VIEW_HEIGHT_BLOCKS/2);  
console.log(caveRocksMap); 
console.log(groundMap);



/** END INITIALIZATION */

raf.start(function(elapsed) {

  // Limit the topx/y to the boundaries 
  if (topX < 0) topX = 0; 
  else if (topX > MAP_WIDTH - VIEW_WIDTH_BLOCKS) topX = MAP_WIDTH - VIEW_WIDTH_BLOCKS; 

  if(topY < 0) topY = 0; 
  else if (topY > MAP_HEIGHT - VIEW_HEIGHT_BLOCKS) topY = MAP_HEIGHT - VIEW_HEIGHT_BLOCKS; 

  updateEntities(); 

  // Clear the screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 

  // Update each balls
  Object.keys(caveRocksMap).forEach(function(caveRockKey) {
    var caveRock = caveRocksMap[caveRockKey]; 

    if(isXYInViewPort(caveRock.getX(), caveRock.getY())) {
      

    // Gravity

    // Handle collision against the canvas's edges

    // Update ball position

    // Render the ball
    ctx.beginPath();
    
        ctx.closePath();
        caveRock.render(ctx, getCanvasX(caveRock.getX()), getCanvasY(caveRock.getY()), BLOCK_WIDTH, BLOCK_HEIGHT); 
        ctx.fillStyle = '#2ECC40';
        ctx.fill();
    }
    
  });

  player.render(ctx, getCanvasX(player.getX()), getCanvasY(player.getY()), BLOCK_WIDTH, PLAYER_HEIGHT); 
});

function updateEntities() {

  // Update player position 
  var INCREMENT_PLAYER_POS = .25; 
  var newX = player.getX()
  var newY = player.getY(); 
  if(inputHandler.up()) {
    newY = newY - INCREMENT_PLAYER_POS; 
  } else if (inputHandler.down()) {
    newY = newY + INCREMENT_PLAYER_POS; 
  } else if (inputHandler.left()) {
    newX = newX - INCREMENT_PLAYER_POS; 
  } else if (inputHandler.right()) {
    newX = newX + INCREMENT_PLAYER_POS; 
  }

  // Check that the new position is valid 
  // console.log('new position ' + newX + ' ' + newY);
  console.log(caveRocksMap[newX + '-' + newY]);
  var rockCollision; 
  var playerObjCol = {
    x: newX, 
    y: newY,
    width: BLOCK_WIDTH,
    height: PLAYER_HEIGHT
  }; 

  // Check rocks around the player 
  var roundX = Math.floor(newX);
  var roundY = Math.floor(newY); 
  for (let rockX = roundX - 2; rockX <= roundX +1; rockX++) {
    for (let rockY = roundY -1; rockY <= roundY + 3; rockY++) {
      if(caveRocksMap[rockX + '-' + rockY]) {
       let rock = caveRocksMap[rockX + '-' + rockY]; 
       var rockObjCol = {
         x: rock.getX(),
         y: rock.getY(), 
         width: BLOCK_WIDTH,
         height: BLOCK_HEIGHT
       }; 
       
       if (collisionUtil.isCollision(playerObjCol, rockObjCol)) {
          rockCollision = true; 
          break; 
       }
      }
    }
    if (rockCollision) break; 
  }

  if (!rockCollision && 
      (newX > 0 && newX < MAP_WIDTH) &&
      (newY > 0 && newY < MAP_HEIGHT)) {
        player.setPosition(newX, newY); 
      }

}

function isXYInViewPort(x, y) {
  if (x <= (topX + VIEW_WIDTH_BLOCKS) && x >= topX) {

    if ( y <= (topY + VIEW_HEIGHT_BLOCKS) && y >= topY) {
      return true; 
    }

  }

  return false; 
}

function getCanvasX(x) {
  var realX = x - topX; 
  return realX * BLOCK_WIDTH; 
}

function getCanvasY(y) {
  var realY = y - topY;
  return realY * BLOCK_HEIGHT; 
}

function resetAll() {

}

function resetMap() {
  caveRocksMap = {}; 
 
  groundMap = caveGenerator.getCaveMap(MAP_WIDTH, MAP_HEIGHT); 

  // create a cave rock for every groundMap with true 
  for (var x = 0; x < groundMap.length; x++) {
    for(var y = 0; y < groundMap[0].length; y++) {
      if(groundMap[x][y]) {
        caveRocksMap[x + '-' + y] = new CaveRock(x, y); 
      }
        // caveRocks.push(new CaveRock(x, y)); 
    }
  }

  var potentialStartingPoints = caveUtil.getStartingSpaces(groundMap); 
  var startingSpace = potentialStartingPoints[rand.range(0, potentialStartingPoints.length -1)]; 
  player.setPosition(startingSpace.x, startingSpace.y); 
  topX = startingSpace.x - (VIEW_WIDTH_BLOCKS/2); 
  topY = startingSpace.y - (VIEW_HEIGHT_BLOCKS/2);  
}

document.getElementById("resetMapButton").addEventListener("click", resetMap); 