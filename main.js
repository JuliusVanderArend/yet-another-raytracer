

var nMaxObjects = 64
var theta = 0
var moveSpeed = 0.09
var lMx = 0
var lMy = 0
var player  = new Player(0,-5,10)
function draw(){
  //console.log(randA)
  theta++
  player.update()
  gl_update(globalGl);
  objects[0] = [theta/300-3,0,0,0.5,1,0,0,1]
  objects[1] = [theta/400-2,0,0,0.3,1,0,0,1]
  //packObjectArray()

  // thetaY += (lMx-mouseX)/300;
  // lMx = mouseX;
}
