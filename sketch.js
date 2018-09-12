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
var selSrc;
var selDst;
var button;

var x;
var y;
function setup() {
  // Initiate Search Algorithms 
  greedySolution.init(4, 218);
  aStarSolution.init(4, 218);
  // Canvas
  cnv = createCanvas(600,400);
  cnv.style('display', 'block');
  x = (windowWidth - width) / 2;
  y = (windowHeight - height) / 2;
  cnv.position(x, y);
  //Selectors
  selSrc = initSelector(width-45-300,height);
  selSrc.value('Alice Springs')
  selDst = initSelector(width-45-150,height);
  selDst.value('Yulara')
  //Button to Run with Selector's cities
  button = createButton('Run!').position(x+width-45,y+height);
  button.mousePressed(runSearch);
  // frameRate(10);
}

function initSelector(xpos,ypos) {
  selector = createSelect();
  selector.position(x+xpos,y+ypos);
  for(let id = 0; id < data.length; id++) {
    selector.option(data[id]["city"]);
  }
  return selector;
}

function runSearch() {
  function searchByCity(city) {
    for(let i = 0; i < data.length; i++) {
      if(data[i]["city"] == city)
        return i;
    }
    return -1;
  }

  let idSrc = searchByCity(selSrc.value());
  let idDst = searchByCity(selDst.value());

  greedySolution = new Greedy();
  aStarSolution = new AStar();
  greedySolution.init(idSrc, idDst);
  aStarSolution.init(idSrc, idDst);
}

function windowResized() {
  x = (windowWidth - width) / 2;
  y = (windowHeight - height) / 2;
  cnv.position(x, y);

  selSrc.position(x+width-45-300,y+height);
  selDst.position(x+width-45-150,y+height);
  button.position(x+width-45,y+height);
}

function draw() {
  background(0);

  drawCities();
  greedySolution.draw();
  aStarSolution.draw();
  stroke(0);
  fill(255);
  text("A* Solution",0,10);
  text("Final Distance: " + aStarSolution.finalDistance, 0,20);
  text("Steps: "+aStarSolution.numSteps, 0,30);
  text("Greedy Solution",width/2,10);
  text("Final Distance: " + greedySolution.finalDistance, width/2,20);
  text("Steps: "+greedySolution.numSteps, width/2,30);
  text("FPS " + Math.round(frameRate()), 0,height);
}

function drawCities() {
  stroke(100);
  strokeWeight(4);
  fill(100);
  for(let id = 0; id < data.length; id++) {
    drawPoint(id, true);
    drawPoint(id, false);
  }
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

function drawPoint(id, offset) {
  let city = data[id];
  
  let x = map(city["lng"], minLng, maxLng, offset? width/2 : 0, offset ? width : width/2);
  let y = map(city["lat"], minLat, maxLat, 0, height);

  point(x, y);
}