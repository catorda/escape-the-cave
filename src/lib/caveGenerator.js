
const defaultOptions = {
    initChance: 0.39,
    numOfSteps: 4,
    deathLimit: 3, 
    birthLimit: 4 
}
var rng = require('./../rng');

var rand = rng(554784);

exports.getCaveMap = function(width, height, opts) {
    var cellmap = []; 

    var options = Object.assign({}, defaultOptions, opts); 

    cellmap = initializeMap(width, height, options.initChance); 

    for(var i=0; i < options.numOfSteps; i++) {
        cellmap = doSimulationStep(cellmap, options.deathLimit, options.birthLimit); 
    }

    return cellmap; 
}

/**
 * Returns 2D array of true (being there's a wall or something) or false 
 * (walkable tile)
 * @param {*} width 
 * @param {*} height 
 * @param {*} initChance 
 */
function initializeMap(width, height, initChance) {
    var newMap = []; 
    for (var i=0; i < width; i++) {
        newMap[i] = []; 
        for (var y=0; y < height; y++) {
            var random = rand.float(); 
            if(rand.float() < initChance) {
                newMap[i][y] = true;
            } else {
                newMap[i][y] = false; 
            }
        }
    }

    return newMap; 
}

function getAliveNeighbors(map, x, y) {
    var count = 0; 
    for(var i=-1; i<2; i ++) {
        for(var j=-1; j<2; j++) {
            var neighbor_x = x+i; 
            var neighbor_y = y+j; 

            // if we're looking at the middle point 
            if(i ==0 && j ==0) {
                continue; // do nothing 
            } else if (neighbor_x < 0 || 
                neighbor_y < 0 ||
                neighbor_x >= map.length ||
                neighbor_y >= map[0].length) {
                    count = count + 1; 
            } else if (map[neighbor_x][neighbor_y]) {
                count = count + 1; 
            } 
        }
    }

    return count; 
}

function doSimulationStep(oldMap, deathLimit, birthLimit) {
    var newMap = []; 

    // loop over each row and column of the map 
    for(var x=0; x < oldMap.length; x++) {
        newMap[x] = []; 
        for(var y=0; y < oldMap[0].length; y++) {
            var neighbors = getAliveNeighbors(oldMap, x, y); 

            // the new value is based on our simulation rules 
            // First if a cell is alive but has too few neighbors, kill it 
            if (oldMap[x][y]) {
                if(neighbors < deathLimit) {
                    newMap[x][y] = false; 
                } else {
                    newMap[x][y] = true; 
                }
            } else {
                if(neighbors > birthLimit) {
                    newMap[x][y] = true; 
                } else {
                    newMap[x][y] = false; 
                }
            }
        }
    }

    return newMap; 
}