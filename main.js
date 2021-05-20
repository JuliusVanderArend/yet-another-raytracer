

var nMaxObjects = 64
var theta = 0
var moveSpeed = 0.1
var lMx = 0
var lMy = 0
function draw(){
  //console.log(randA)
  theta++
  gl_update(globalGl);
  objects[0] = [theta/300-3,0,0,0.5,1,0,0,1]
  objects[1] = [theta/400-2,0,0,0.3,1,0,0,1]
  packObjectArray()
  if(keyIsDown(87)){
    cPos[2] -=moveSpeed*cos(-thetaY)
    cPos[0] -=moveSpeed*sin(-thetaY)
  }
  if(keyIsDown(83)){
    cPos[2] +=moveSpeed*cos(-thetaY)
    cPos[0] +=moveSpeed*sin(-thetaY)
  }
  if(keyIsDown(65)){
    thetaY-=0.04
  }
  if(keyIsDown(68)){
    thetaY+=0.04
  }
  if(keyIsDown(81)){
    cPos[1] +=moveSpeed
  }
  if(keyIsDown(69)){
    cPos[1] -=moveSpeed
  }
  // thetaY += (lMx-mouseX)/300;
  // lMx = mouseX;
}
