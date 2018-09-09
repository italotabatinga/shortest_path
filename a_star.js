class AStar {
  constructor() {
    // Source and Destiny cities id
    this.srcId = -1;
    this.dstId = -1;

    //Final Path
    this.path = new Array();
    this.finalDistance = 999999999;
    this.hasFinished = false;

    // BFS arrays 
    this.dist = new Array(data.length).fill(999999999); // f Score
    this.realdist = new Array(data.length).fill(999999999); // g Score
    this.prev = new Array(data.length).fill(undefined);
    this.queue = [];
    this.visited = new Array(data.length).fill(false);
    this.neighbors = new Array(data.length);
  }

  init(srcId, dstId) {
    this.srcId = srcId;
    this.dstId = dstId;

    
    this.dist[srcId] = 0 + this.distance(srcId, dstId);
    this.realdist[srcId] = 0;
    this.queue.push(srcId);

    for (let i = 0; i < this.neighbors.length; i++){
      this.neighbors[i] = new Array();
    }
    this.findNeighbors();
  }

  findNeighbors() {
    for(let i = 0; i < data.length; i++) {
      if ((i+1) % 2 == 0) {
        if (i > 0) {
          if (!this.neighbors[i].includes(i+2)) {
            this.neighbors[i].push(i+2);
          }
          if (!this.neighbors[i].includes(i-1)) {
            this.neighbors[i].push(i-1);
          }
          if (i <= data.length-3 && !this.neighbors[i+2].includes(i)) {
            this.neighbors[i+2].push(i);
          }
          if (i <= data.length-3 && !this.neighbors[i+2].includes(i)) {
            this.neighbors[i+2].push(i);
          }
          if (!this.neighbors[i-1].includes(i)) {
            this.neighbors[i-1].push(i);
          }
          if (!this.neighbors[i-1].includes(i)) {
            this.neighbors[i-1].push(i);
          }
        }
      } else {
        if (i > 1) {
          if (!this.neighbors[i].includes(i+1)) {
            this.neighbors[i].push(i+1);
          }
          if (!this.neighbors[i].includes(i-2)) {
            this.neighbors[i].push(i-2);
          }
          if (i <= data.length-2 && !this.neighbors[i+1].includes(i)) {
            this.neighbors[i+1].push(i);
          }
          if (i <= data.length-2 && !this.neighbors[i+1].includes(i)) {
            this.neighbors[i+1].push(i);
          }
          if (!this.neighbors[i-2].includes(i)) {
            this.neighbors[i-2].push(i);
          }
          if (!this.neighbors[i-2].includes(i)) {
            this.neighbors[i-2].push(i);
          }
        }
      }
    }
  }

  // Calculate distance between two points with indexes
  // srcId and dstId on data.json
  // make dstId be this.dstId to calcule Greedy Cost Function
  distance(srcId, dstId) {
    let srcCity = data[srcId];
    let dstCity = data[dstId];
    
    let dlat = srcCity["lat"] - dstCity["lat"];
    let dlng = srcCity["lng"] - dstCity["lng"];

    return Math.sqrt(Math.pow(dlat,2) + Math.pow(dlng,2));
  }

  step() {
    let minHeur = 999999999;
    let minId = -1;
    let queueIndex = -1;
    this.queue.forEach((elem,id) => {
      let dist = this.realdist[elem] + this.distance(elem, this.dstId);
      if(dist < minHeur) {
        minHeur = dist;
        minId = elem;
        queueIndex = id;
      }
    });
    
    this.queue.splice(queueIndex, 1);
    this.visited[minId] = true;

    //TODO: Break Condition
    if(minId == this.dstId) {
      this.hasFinished = true;
      this.shortestPath();
    }

    this.neighbors[minId].forEach(neighbor => {
      if (neighbor < data.length && !this.visited[neighbor]) {
        let temp = this.realdist[minId] + this.distance(minId, neighbor) + this.distance(neighbor, this.dstId);
        if (temp < this.dist[neighbor]) {
          this.realdist[neighbor] = this.realdist[minId] + this.distance(minId, neighbor);
          this.dist[neighbor] = temp;
          this.prev[neighbor] = minId;
        }
        if(!this.queue.includes(neighbor)) {
          this.queue.push(neighbor);
          this.visited[neighbor] = false;
        }
      }
    });
  }

  shortestPath() {
    let currentId = this.dstId;
    while(this.prev[currentId]) {
      this.path.unshift(currentId);
      currentId = this.prev[currentId];
    }
    this.path.unshift(currentId);
    this.finalDistance = this.realdist[this.dstId];
  }

  draw() {
    if(!this.hasFinished) {
      stroke(255);
      strokeWeight(0.5);
      this.prev.forEach((source, destiny) => {
        if (source) {
          drawLine(source, destiny,false);
        }
      });
      this.step();
    } else {
      stroke(0,255,0);
      strokeWeight(0.5);
      this.path.forEach((source,id) => {
        if (id < this.path.length-1) {
          drawLine(source, this.path[id+1], false);
        }
      });
    }
  }
  
  run() {
    while(!this.visited[this.dstId] && this.queue.length > 0){
      // this.sleep(1).then(this.step);
      this.step();
    }
    console.log(this.path);
  }
}