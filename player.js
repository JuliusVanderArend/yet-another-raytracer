var frame = 0

class Player{
  constructor(x,y,z){
    this.x = x
    this.y = y
    this.z = z
    this.vY = 0.0
    this.vX =0.0
    this.vZ =0.0
    this.moveSpeed = 0.35
    this.fMoveSpeed = 7.0
    this.cMoveSpeed = this.moveSpeed
    this.cindex =0
    this.jumpflag = false
    this.camBounce = 0;
    this.yVelMul = 1.0
  }

  checkIntersects(){
    if(mapArr[4.0*index(Math.floor(this.x)+64,-Math.floor(this.y-1+this.vY/60)-8,Math.floor(this.z)+64)] !=0 ){
      this.vY = 0
    }
    if(mapArr[4.0*index(Math.floor(this.x+this.vX/60)+64,-Math.floor(this.y-2)-8,Math.floor(this.z)+64)] !=0 ||mapArr[4.0*index(Math.floor(this.x+this.vX/60)+64,-Math.floor(this.y-1)-8,Math.floor(this.z)+64)] !=0 ){
      this.vX = 0
    }
    if(mapArr[4.0*index(Math.floor(this.x)+64,-Math.floor(this.y-2)-8,Math.floor(this.z+this.vZ/60)+64)] !=0 ||mapArr[4.0*index(Math.floor(this.x)+64,-Math.floor(this.y-1)-8,Math.floor(this.z+this.vZ/60)+64)] !=0 ){
      this.vZ = 0
    }

if(mapArr[4.0*index(Math.floor(this.x+this.vX/60)+64,-Math.floor(this.y-1)-8,Math.floor(this.z)+64)] !=0 ){
      this.vX = 0
    }
  }

  update(){
    console.log(this.vY)
    frame++
    this.cindex = 4.0*index(Math.floor(this.x)+64,-Math.floor(this.y-1)-8,Math.floor(this.z)+64)
    this.vY += 9.8/60
    if(keyIsDown(87)){
      this.camBounce-=0.2
      this.vZ -=this.cMoveSpeed*cos(-thetaY)
      this.vX -=this.cMoveSpeed*sin(-thetaY)
    }
    if(keyIsDown(83)){
      this.camBounce+=0.2
      this.vZ +=this.cMoveSpeed*cos(-thetaY)
      this.vX +=this.cMoveSpeed*sin(-thetaY)
    }
    if(keyIsDown(65)){
      thetaY-=0.05
    }
    if(keyIsDown(68)){
      thetaY+=0.05
    }
    if(keyIsDown(81)){
      this.y +=this.cMoveSpeed
    }
    if(keyIsDown(69)){
      this.y -=this.cMoveSpeed
    }
    if(keyIsDown(32) && !this.jumpflag){
      this.vY -= 20.0 
      this.yVelMul = 0.55
      this.jumpflag=true
    }
    else if(!keyIsDown(32)){
      this.jumpflag = false
    }
    if(keyIsDown(16)){
      this.cMoveSpeed = this.fMoveSpeed
    }
    else{
      this.cMoveSpeed = this.moveSpeed
    }
    this.checkIntersects()
    this.x += this.vX/60
    this.y += this.vY/60
    this.z += this.vZ/60
    this.vX*=0.95
    this.vZ*=0.95
    this.vY*=this.yVelMul
    this.yVelMul+=0.1
    this.yVelMul = Math.min(this.yVelMul,1.0)
    cPos = [this.x,this.y+Math.sin(this.camBounce)*0.1,this.z]
    // console.log(cPos)
    if( mapArr [this.cindex] != 0){
      console.log(" intersect at " + cPos)
    } 
    // console.log(mapArr[index(Math.floor(this.x)+64,Math.floor(this.y),Math.floor(this.z)+64)])
    // mapArr [cindex] = 255
    // mapArr [cindex+1] = 255
    // mapArr [cindex+2] = 255
    // updateMapTex(globalGl,mapArr);
    // console.log(cindex)
    console.log(this.vX + " "+ this.vY + " " + this.vZ)
  }
}