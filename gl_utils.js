// Start time
var time0 = (new Date()).getTime() / 1000;
var nMaxObjects = 64
var objects = [] //x,y,z,R,r,g,b,t
var oPos = []
var oCol = []
var cPos = [0.0,0.0,4.0]
// console.log(cPos)
function initObjectArray(){
    for (var i=0; i< nMaxObjects; i++){
    objects.push([0,0,0,0,0,0,0,0])
  }
  objects[0] = [0,0,0,0.2,1,0,0,1]
}
function packObjectArray(){
  oPos = []
  oCol = []
  for(var i=0; i< nMaxObjects; i++){
    oPos.push(objects[i][0])
    oPos.push(objects[i][1])
    oPos.push(objects[i][2])
    oPos.push(objects[i][3])
    oCol.push(objects[i][4])
    oCol.push(objects[i][5])
    oCol.push(objects[i][6])
  }
}
initObjectArray()
packObjectArray()
// console.log(oPos)
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

/**
 * Function that pulls out text content from a DOM element
 * @param id - ID of the DOM element
 * @returns {string}
 */
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

/**
 * Create and attach a shader to gl program
 * @param gl
 * @param program
 * @param type
 * @param src
 */
function addshader(gl, program, type, src) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw "Cannot compile shader:\n\n" + gl.getShaderInfoLog(shader);
    }
    gl.attachShader(program, shader);
}

/**
 * Function that creates and links the gl program with the
 * application's vertex and fragment shader.
 * @param gl
 * @param vertexShader
 * @param fragmentShader
 */
function gl_init(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    var buffer = gl.createBuffer();
    addshader(gl, program, gl.VERTEX_SHADER, vertexShader);
    addshader(gl, program, gl.FRAGMENT_SHADER, fragmentShader);
    gl.linkProgram(program);

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
    gl.pos = gl.getUniformLocation(program,"pos")
    gl.col = gl.getUniformLocation(program,"col")
    gl.cPos = gl.getUniformLocation(program,"cPos")
    gl.randSeed1 = gl.getUniformLocation(program,"randomSeed1")
    gl.randSeed2 = gl.getUniformLocation(program,"randomSeed2")
}

/**
 * This function is called once per frame.
 * @param gl
 */
function gl_update(gl) {
    gl.uniform1f(gl.uTime, (new Date()).getTime() / 1000 - time0);
    gl.uniform1f(gl.randSeed1,Math.random())
    gl.uniform1f(gl.randSeed1,Math.random())
    gl.uniform3f(gl.uCursor,0, 0, 0); 
    gl.uniform4fv(gl.pos,oPos)
    gl.uniform3f(gl.cPos,cPos[0],cPos[1],cPos[2])
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

}

/**
 * Start the
 * @param canvas_id
 * @param vertexShader
 * @param fragmentShader
 */
var globalGl = null

function start_gl(canvas_id, vertexShader, fragmentShader) {
    try {
        var canvas = document.getElementById(canvas_id);
        var gl = canvas.getContext("experimental-webgl");
        console.log(gl)
        globalGl = gl
    } catch (e) {
        throw "Sorry, your browser does not support WebGL.";
    }

    // Catch mouse events that go to the canvas.

    // function setMouse(z) {
    //     var r = event.target.getBoundingClientRect();
    //     gl.cursor.x = (event.clientX - r.left  ) / (r.right - r.left) * 2 - 1;
    //     gl.cursor.y = (event.clientY - r.bottom) / (r.top - r.bottom) * 2 - 1;
    //     if (z !== undefined)
    //         gl.cursor.z = z;
    // }
    // canvas.onmousedown = function(event) { setMouse(1); } // On mouse down, set z to 1.
    // canvas.onmousemove = function(event) { setMouse() ; }
    // canvas.onmouseup   = function(event) { setMouse(0); } // On mouse up  , set z to 0
    // gl.cursor = new Vector3();

    // Initialize gl. Then start the frame loop.
    gl_init(gl, vertexShader, fragmentShader);
    gl_update(gl);
}

// A browser-independent way to call a function after 1/60 second.
requestAnimFrame = (function() {
    return requestAnimationFrame
        || webkitRequestAnimationFrame
        || mozRequestAnimationFrame
        || oRequestAnimationFrame
        || msRequestAnimationFrame
        || function(callback) {
               setTimeout(callback, 1000 / 60);
           }; })();


          
