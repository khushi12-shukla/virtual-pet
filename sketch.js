var dog, sadDog, happyDog;
var lastFed=0, database;
var feedButton, addButton;
var foods=20;
var foodObject;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  foodObject = new Food()

  database = firebase.database();

  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedButton = createButton("Feed the dog");
  feedButton.position(530,150);
  feedButton.mousePressed(feedDog);

  addButton = createButton("Add food");
  addButton.position(640,150);
  addButton.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  fill("black");
  text("mouseX:" + mouseX,100,50);
  text("mouseY:" + mouseY,100,75);

  fill(255,255,254)
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :"+ lastFed%12 + "PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM", 350,30);
  }else{
    text("last Feed : "+ lastFed + "AM", 350,30);
  }

  foodObject.display();
  drawSprites();
}

//function to read food Stock

//function to update food stock and last fed time
function feedDog(){
  if(foods>0)
  dog.addImage(happyDog);
  foods--;
  foodObject.updateFoodStock(foods)
  lastFeed = hour();
  foodObject.update(lastFeed)
}

//function to add food in stock
function addFoods(){
  foods++;
  foodObject.updateFoodStock(foods)
}