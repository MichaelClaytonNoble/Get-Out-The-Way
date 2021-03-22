// Return a randomly oriented vector with the given length.
const Util = {
  randomVec(length, cDeg) {
    let deg = 2 * Math.PI * Math.random();
    // if(cDeg){
    //   let dDeg = cDeg * 0.01745;
    //   let min = (cDeg - 10)*0.01745; 
    //   let max = (cDeg + 10) *0.01745;
    //   deg = max * Math.random() + min;
    //   console.log("ddeg", dDeg);
    // }
    console.log('deg', deg); 

    return [(Util.scale([Math.sin(deg), Math.cos(deg)], length)) , deg];
  },
  random45Vec(length) {
    const degs = [0.7853981634, 2.35619,3.92699,5.49779] 
    const deg = degs[Math.floor(Math.random()*degs.length)];
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

export default Util; 