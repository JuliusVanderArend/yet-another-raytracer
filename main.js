
var nMaxObjects = 64
var theta = 0
function draw(){
  theta++
  gl_update(globalGl);
  objects[0] = [theta/300-3,0,0,0.5,1,0,0,1]
  objects[1] = [theta/400-2,0,0,0.3,1,0,0,1]
  packObjectArray()
  // console.log(oPos)
}
