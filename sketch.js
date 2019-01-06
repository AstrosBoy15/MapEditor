var tileWidth = 64;
var tiles = [];
var colorPicker = new ColorPicker(0, 0, 1.5);
var selected;

window.addEventListener("contextmenu", function(e) {
	e.preventDefault();
})

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
	background(200);
  for(var i = 0; i < tiles.length; i++) {
    if(!selected || selected != tiles[i]) {
      tiles[i].show();
    }
  }
  if(selected) {
    selected.show();
  }
  //colorPicker.x = mouseX;
  //colorPicker.y = mouseY;
  if(selected) {
    colorPicker.show();
  }
}

function mousePressed() {
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    updateColor();
  }
}

function mouseDragged() {
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    updateColor();
  }
}

function updateColor(){
    var x = floor(mouseX / tileWidth);
    var y = floor(mouseY / tileWidth);

    var canCreateNew = true;

    if (mouseButton == LEFT) {
    if(selected){
      var rgb = colorPicker.update(selected.r, selected.g, selected.b);
      if(rgb) {
        canCreateNew = false;
        selected.setColor(rgb.r, rgb.g, rgb.b, 255);
        return;
      }
    }
      for(var i = 0; i < tiles.length; i++){
        if(tiles[i].x == x && tiles[i].y == y){
          if(selected){
            selected.isSelected = false;
          }
          selected = tiles[i];
          colorPicker.setPosition(selected.x * selected.width + selected.width / 2,
              selected.y * selected.width + selected.width / 2);
          colorPicker.update(selected.r, selected.g, selected.b);
          selected.isSelected = true;
          return;
        }
      }
      if(canCreateNew) {
        var tile = new Tile(x, y, tileWidth);
        if(selected){
          selected.isSelected = false;
        }
        selected = tile;
        colorPicker.setPosition(selected.x * selected.width + selected.width / 2,
            selected.y * selected.width + selected.width / 2);
        selected.isSelected = true;
        tile.setColor(255, 0, 255);
        colorPicker.update(selected.r, selected.g, selected.b);
        tiles.push(tile);
      }
    } else if (mouseButton == RIGHT){
      for(var i = 0; i < tiles.length; i++){
        if(tiles[i].x == x && tiles[i].y == y){
          if(selected){
            selected.isSelected = false;
            selected = undefined;
          } else {
            tiles.splice(i, 1);
          }
          return;
        }
      }
    }
}
