
var nMaxObjects = 64
var theta = 0
var moveSpeed = 0.1
function draw(){
  theta++
  gl_update(globalGl);
  objects[0] = [theta/300-3,0,0,0.5,1,0,0,1]
  objects[1] = [theta/400-2,0,0,0.3,1,0,0,1]
  packObjectArray()
  // console.log(oPos)
  if(keyIsDown(87)){
    cPos[2] -=moveSpeed
  }
  if(keyIsDown(83)){
    cPos[2] +=moveSpeed
  }
    if(keyIsDown(65)){
    cPos[0] -=moveSpeed
  }
  if(keyIsDown(68)){
    cPos[0] +=moveSpeed
  }
  if(keyIsDown(81)){
    cPos[1] +=moveSpeed
  }
  if(keyIsDown(69)){
    cPos[1] -=moveSpeed
  }
}
