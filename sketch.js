// Find Shortest Path 

// Min and Max Longitude
var minLng = 110;
var maxLng = 155;

// Min and Max Latitude
var minLat = -45;
var maxLat = -10;

var greedySolution = new Greedy();
var aStarSolution = new AStar();

var cnv;
function setup() {
  
  greedySolution.init(4, 218);
  aStarSolution.init(4, 218);
  cnv = createCanvas(600,400);
  cnv.style('display', 'block');
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  // frameRate(10);
}

function windowResized() {
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

function draw() {
  background(0);

  // greedySolution.neighbors.forEach((source,id) => {
  //   stroke(85);
  //   strokeWeight(0.5);
  //   source.forEach(neighbor => {
  //     drawLine(id, neighbor);
  //   });

  //   stroke(255,0,0);
  //   strokeWeight(4);
  //   drawPoint(id);
  // });

  
  // if(!greedySolution.hasFinished) {
  //   stroke(255);
  //   strokeWeight(0.5);
  //   greedySolution.prev.forEach((source, destiny) => {
  //     if (source) {
  //       drawLine(source, destiny);
  //     }
  //   });
  //   greedySolution.step();
  // } else {
  //   stroke(0,255,0);
  //   strokeWeight(0.5);
  //   greedySolution.path.forEach((source,id) => {
  //     if (id < greedySolution.path.length-1) {
  //       drawLine(source, greedySolution.path[id+1]);
  //     }
  //   });
  // }
  greedySolution.draw();
  aStarSolution.draw();
  stroke(0);
  fill(255);
  text(Math.round(frameRate()), 0,height);
}

function drawLine(idSrc, idDst, offset) {
  if ((idSrc < 0 || idSrc >= data.length) || (idDst < 0 || idDst >= data.length)) {
    return
  }
  let citySrc = data[idSrc];
  let cityDst = data[idDst];

  let xSrc = map(citySrc["lng"], minLng, maxLng, offset? width/2 : 0, offset ? width : width/2);
  let ySrc = map(citySrc["lat"], minLat, maxLat, 0, height);
  let xDst = map(cityDst["lng"], minLng, maxLng, offset? width/2 : 0, offset ? width : width/2);
  let yDst = map(cityDst["lat"], minLat, maxLat, 0, height);

  line(xSrc, ySrc, xDst, yDst);
}

function drawPoint(id) {
  let city = data[id];
  
  let x = map(city["lng"], minLng, maxLng, 0, width);
  let y = map(city["lat"], minLat, maxLat, 0, height);

  point(x, y);
}