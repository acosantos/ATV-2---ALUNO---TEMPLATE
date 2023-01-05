var dog;
var position;
var database;

//Declare variável para banco de dados e referência e posição


function preload() {
    backdrop = loadImage("background.jpg");
    dogimg = loadAnimation("dog1.png", "dog2.png", "dog3.png");
    foodimg = loadImage("hotdog.png");
}
function setup() {

    createCanvas(500, 500);


    //Inicialize o banco de dados
    database = firebase.database();

    dog = createSprite(200, 200, 100, 100);

    dog.addAnimation("running", dogimg);
    dog.scale = 0.5;
    food = createSprite(450, 450);
    food.addImage(foodimg);
    food.scale = 0.5;

    database.ref("dog/positions").on("value",(data)=>{
    position = data.val();
    // console.log(position);
    dog.x = position.x;
    dog.y = position.y;
    });

}

function draw() {
    background(backdrop);

    if (keyDown(LEFT_ARROW)) {
        changePosition(-3, 0);
    }
    else if (keyDown(RIGHT_ARROW)) {
        changePosition(3, 0);
    }
    else if (keyDown(UP_ARROW)) {
        changePosition(0, -3);
    }
    else if (keyDown(DOWN_ARROW)) {
        changePosition(0, +3);
    }
    drawSprites();
}

function changePosition(x, y) {
    database.ref("dog/positions").update({
        x: position.x +x,
        y: position.y +y
    })
}