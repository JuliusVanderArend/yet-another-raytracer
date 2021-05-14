
var nMaxObjects = 64
var theta = 0
function draw(){
  theta++
  gl_update(globalGl);
  objects[0] = [0.0,0.0,-2.0,0.5,0.0,1.0,0.0,1.0]
  objects[1] = [0.0,0.0,-theta/100,0.1,1.0,0.0,0.0,1.0]
  packObjectArray()
  // console.log(oPos)
}
