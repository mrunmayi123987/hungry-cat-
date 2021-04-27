class Box{

constructor(x,y){
 var option = {
 'restitution':0.1

 }
 this.image=loadImage("images/brickimage_10.png");
this.x=x;
this.y=y;
this.width=50;
this.height=50;

 
this.body= Bodies.rectangle(x,y,50,50,option);



World.add(world,this.body);

}

display(){

    var pos =15;
imageMode(CENTER);
image(this.image,this.x,this.y,this.width,this.height);
 

}
 

}



