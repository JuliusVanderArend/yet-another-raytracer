// Start time
var time0 = (new Date()).getTime() / 1000;
var nMaxObjects = 64
var objects = [] //x,y,z,R,r,g,b,t
var oPos = []
var oCol = []
var cPos = [0,-5,10]
var thetaY = 0;
var mapArr = []
var gridSizeX = 128
var gridSizeY = 64
var gridSizeZ = 128


function initObjectArray(){
    for (var i=0; i< nMaxObjects; i++){
    objects.push([0,0,0,0,0,0,0,0])
  }
  objects[0] = [0,0,0,0.2,1,0,0,1]
}
noise.seed(Math.random());

// function initMapArray(){
//   mapArr = []
//   for(var x=0;x<gridSizeX;x++){
//     for(var y=0;y<gridSizeY;y++){
//       for(var z=0;z<gridSizeZ;z++){
//         var d = 0//Math.sqrt(Math.pow(x-gridSizeX*0.5,2)+Math.pow(y-gridSizeY*0.5,2)+Math.pow(z-gridSizeZ*0.5,2))
//         if(noise.simplex3(x*0.1,y*0.1,z*0.1)<0.04){
//           d=255
//         }
//         mapArr.push(d)
//         mapArr.push(d)
//         mapArr.push(d)
//         mapArr.push(255)
//       }
//     }
//   }
// }

async function initMapArray(){
  mapArr = []
  for(var x=0;x<gridSizeX;x++){
    for(var y=0;y<gridSizeY;y++){
      for(var z=0;z<gridSizeZ;z++){
        mapArr.push(0)
        mapArr.push(0)
        mapArr.push(0)
        mapArr.push(0)
      }
    }
  }
  const data = await loadVox("mars1.ply")
  var lineArr = data.split(/\r\n|\n\r|\n|\r/)
  console.log(lineArr)
  for(line of lineArr){
    var vals = line.split(" ")
    vals = [parseInt(vals[0])+64,parseInt(vals[1])+65,parseInt(vals[2])+56,parseInt(vals[3]),parseInt(vals[4]),parseInt(vals[5])] // breakdown later
    var index = 4*(vals[1]*gridSizeX*gridSizeY - (vals[2]+1)*gridSizeX + vals[0])
    var matIndex = 255;
    if(vals[3]==65 && vals[4]==65 && vals[5]==65){
      matIndex = 254;
    }
    if((vals[3]==172 && vals[4]==81 && vals[5]==36) || (vals[3]==133 && vals[4]==66 && vals[5]==51)||(vals[3]==153 && vals[4]==70 && vals[5]==52) ){
      matIndex = 253;
    }
    //console.log(index)
    mapArr[index] = vals[3]
    mapArr[index+1] = vals[4]
    mapArr[index+2] = vals[5]
    mapArr[index+3] = matIndex //y should be +32??
  }
  bindMapTex(globalGl,mapArr)
  console.log("dune")

}

// function initMapArray(){

//   var mapArr = []
//   var img2 = new Image();
//   img2.src = "tm1_1.png";
//   var canvas2 = document.createElement('canvas');
//   var context2 = canvas2.getContext('2d');
//   img2.onload = function(){
//     context2.drawImage(img2, 0, 0);
//     var img = new Image();
//     img.src = "tm1_0.png";
//     var canvas = document.createElement('canvas');
//     var context = canvas.getContext('2d');
//     img.onload = function(){
//       context.drawImage(img, 0, 0);
//       for(var x=0; x<gridSizeX;x++){
//         for(var y=0; y<gridSizeY;y++){
//           for(var z=gridSizeZ; z>0;z--){
//             var index = x + gridSizeX *(y + gridSizeZ*z)
//             if(y==2){
//               mapArr.push(255)
//               mapArr.push(255)
//               mapArr.push(255)
//               mapArr.push(255)
//             }
//             else if(y==0){
//               var dat2 = context2.getImageData(x, z, 1, 1).data;
//               if(dat2[0]<10){
//                 mapArr.push(255)
//                 mapArr.push(255)
//                 mapArr.push(255)
//                 mapArr.push(255)
//               }
//               else{
//                 mapArr.push(0)
//                 mapArr.push(0)
//                 mapArr.push(0)
//                 mapArr.push(255)
//               }
//             }
//             else{
//               var dat = context.getImageData(x, z, 1, 1).data;
//               if(dat[0]<120){
//                 mapArr.push(255)
//                 mapArr.push(255)
//                 mapArr.push(255)
//                 mapArr.push(255)
//               }
//               else{
//                 mapArr.push(0)
//                 mapArr.push(0)
//                 mapArr.push(0)
//                 mapArr.push(255)
//               }
//             }
            
//           }
//         }
//       }
//     console.log(mapArr)
//     bindMapTex(globalGl,mapArr)
//     }
//   }
// }


initMapArray()


function createSolidTexture(gl, r, g, b, a) {
    var data = new Uint8Array([r, g, b, a]);
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    return texture;
}

// Define a general purpose 3D vector object.
function Vector3() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
}

Vector3.prototype = {
    set : function(x,y,z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
};

//
// Initialize a texture and load an image.
// When the image finished loading copy it into the texture.
//
function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.onload = function() {
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);
    console.log("dirt nMap bound")
    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;
  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

function getStringFromDOMElement(id) {
    var node = document.getElementById(id);

    // Recurse and get all text in the node
    var recurseThroughDOMNode = function recurseThroughDOMNode(childNode, textContext) {
        if (childNode) {
            if (childNode.nodeType === 3) {
                textContext += childNode.textContent;
            }
            return recurseThroughDOMNode(childNode.nextSibling, textContext);
        } else {
            return textContext;
        }
    };
    return recurseThroughDOMNode(node.firstChild, '');
}

function addshader(gl, program, type, src) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw "Cannot compile shader:\n\n" + gl.getShaderInfoLog(shader);
    }
    gl.attachShader(program, shader);
}

function gl_init(gl, vertexShader, fragmentShader,fragmentShader2) {
    var program = gl.createProgram();
    var buffer = gl.createBuffer();
    addshader(gl, program, gl.VERTEX_SHADER, vertexShader);
    addshader(gl, program, gl.FRAGMENT_SHADER, fragmentShader);
    gl.linkProgram(program);

    var program2 = gl.createProgram();
    addshader(gl, program, gl.VERTEX_SHADER, vertexShader);
    addshader(gl, program, gl.FRAGMENT_SHADER, fragmentShader);
    gl.linkProgram(program2);

    if (! gl.getProgramParameter(program, gl.LINK_STATUS))
        throw "Could not link the shader program!";
    gl.useProgram(program);

    // Create a square as a strip of two triangles.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1,1,
            0,1,
            1,0,
            -1,-1,
            0,1,
            -1,0]),
        gl.STATIC_DRAW
    );

    gl.aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(gl.aPosition);
    gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.uTime = gl.getUniformLocation(program, "uTime");
    gl.uCursor = gl.getUniformLocation(program, "uCursor");
    gl.cPos = gl.getUniformLocation(program,"cPos")
    gl.randSeed = gl.getUniformLocation(program,"randSeed")
    gl.thetaY =  gl.getUniformLocation(program,"thetaY")
    gl.map = gl.getUniformLocation(program,"map")
    gl.dirtNormal = gl.getUniformLocation(program,"dirtNormal")
    console.log(gl.getUniformLocation(program,"map"))

    var dirtNmap = loadTexture(gl,"ujkifdady_2K_Normal.jpg")
}

function bindMapTex(gl,map){
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_3D, texture);
  console.log(map)
  gl.texImage3D(gl.TEXTURE_3D,0,gl.RGBA,gridSizeX,gridSizeY,gridSizeZ,0,gl.RGBA,gl.UNSIGNED_BYTE,
            new Uint8Array(map));
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
}
 
function gl_update(gl) {
    gl.uniform1f(gl.uTime, (new Date()).getTime() / 1000 - time0);
    gl.uniform1f(gl.randSeed,Math.random())
    gl.uniform1f(gl.thetaY,thetaY)
    gl.uniform3f(gl.uCursor,0, 0, 0); 
    gl.uniform3f(gl.cPos,cPos[0],cPos[1],cPos[2])
    gl.uniform1i(gl.map, 0);
    gl.uniform1i(gl.dirtNormal, 1);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    // console.log(gl.map)

}

var globalGl = null

function start_gl(canvas_id, vertexShader, fragmentShader,fragmentShader2) {
    try {
        var canvas = document.getElementById(canvas_id);
        var gl = canvas.getContext("webgl2",{
          antialias: false,
          failIfMajorPerformanceCaveat: true,
          powerPreference : "high-performance"})
        console.log(gl)
        globalGl = gl
    } catch (e) {
        throw "Sorry, your browser does not support WebGL.";
    }


    // Initialize gl. Then start the frame loop.
    gl_init(gl, vertexShader, fragmentShader,fragmentShader2);
    gl_update(gl);
}


          
