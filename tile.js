function Tile(x, y, width){
  this.x = x;
  this.y = y;
  this.width = width;
  this.isSelected = false;

  this.show = function(){
    fill(this.r, this.g, this.b, this.a);
    noStroke();
    if(this.isSelected) {
      strokeWeight(1);
      stroke(0);
    }
    rect(this.x * this.width, this.y * this.width, this.width, this.width);
  }

  this.setColor = function(r, g, b, a){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

}
