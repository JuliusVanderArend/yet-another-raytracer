class Player{
  constructor(x,y,z){
    this.x = x
    this.y = y
    this.z = z
    this.vY = 0.0
    this.moveSpeed = 0.1
    this.fMoveSpeed = 1.0
    this.cMoveSpeed = this.moveSpeed
  }
  update(){
    this.vY += 9.8/60
    if(keyIsDown(87)){
      this.z -=this.cMoveSpeed*cos(-thetaY)
      this.x -=this.cMoveSpeed*sin(-thetaY)
    }
    if(keyIsDown(83)){
      this.z +=this.cMoveSpeed*cos(-thetaY)
      this.x +=this.cMoveSpeed*sin(-thetaY)
    }
    if(keyIsDown(65)){
      thetaY-=0.04
    }
    if(keyIsDown(68)){
      thetaY+=0.04
    }
    if(keyIsDown(81)){
      this.y +=this.cMoveSpeed
    }
    if(keyIsDown(69)){
      this.y -=this.cMoveSpeed
    }
    if(keyIsDown(16)){
      this.cMoveSpeed = this.fMoveSpeed
    }
    else{
      this.cMoveSpeed = this.moveSpeed
    }
    //this.y += this.vY/60
    cPos = [this.x,this.y,this.z]
    // console.log(cPos)
  }
}