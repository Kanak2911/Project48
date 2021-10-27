var eagle, eagleImg, hunter, hunterImg;
var bullet, bulletImg, bgImg;
var mouse, mouseImg;
var score = 0;
var gameOver;
var gameState = 1;
var gunSound;
var reload, reloadImg;

function preload() {
    eagleImg = loadImage('Eagle1.png');
    hunterImg = loadImage('hunter.png');
    bulletImg = loadImage('Bullet.png');
    bgImg = loadImage('bg.png');
    mouseImg = loadAnimation("m1.png","m2.png","m3.png","m4.png","m5.png");
    gameoverImg = loadImage("deadEagle.png");
    gunSound = loadSound("gun.mp3");
    reloadImg = loadImage("reload.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    eagle = createSprite(windowWidth / 2 - 30, 200);
    eagle.addImage(eagleImg);
    eagle.scale = 0.6
    eagle.debug = false;
    eagle.setCollider("Circle", 0, 0, 55)

    hunter = createSprite(115, windowHeight - 240);
    hunter.addImage(hunterImg);

    gameOver = createSprite( 640, 480, windowWidth, windowHeight);
    gameOver.addImage(gameoverImg);
    gameOver.visible = false;
    gameOver.scale = 0.3

    reload = createSprite(660, 300);
    reload.addImage(reloadImg);
    reload.visible = false;
    reload.scale = 0.4

    mouseGroup = new Group();
    bulletGroup = new Group();
}

function draw() {
    if(gameState === 1){
    background(bgImg);

    if (eagle.y > 60) {
        if (keyDown('up')) {
            eagle.y -= 5;
        }
    }
    if (eagle.y < 585) {
        if (keyDown('down')) {
            eagle.y += 5;
        }
    }

    if(eagle.isTouching(mouseGroup)){
        score = score + 1;
        mouseGroup.destroyEach();
    }

    if(eagle.isTouching(bulletGroup)){
        gameState = 0;
        gameOver.visible = true;
        eagle.visible = false;
        gunSound.play();
        reload.visible = true;
    }

    mice();
    bullets();
}

if(gameState === 0){
    mouseGroup.destroyEach();
    bulletGroup.destroyEach();
    mouseGroup.setVelocityXEach(0);
    bulletGroup.setVelocityXEach(0);

    if(mousePressedOver(reload)){
        reset();
    }
}

    drawSprites();

    fill("red");
    textSize(50);
    text("Score : " + score, 1100, 60);
}

function mice() {
    if (frameCount % 200 === 0) {
        mouse = createSprite(1350, 200, 20, 20);
        mouse.addAnimation("mouse",mouseImg);
        mouse.scale = 0.25;
        mouse.y = Math.round(random(360, 520));
        mouse.velocityX = -4;
        mouseGroup.velocityX = -(7 + score / 100);
        mouse.lifetime = 5000;
        mouseGroup.add(mouse);
        hunter.depth = mouse.depth;
        hunter.depth = hunter.depth + 1;
    }
}

function bullets() {
    if (frameCount % 55 === 0) {
        bullet = createSprite(340, 700, 20, 20);
        bullet.addAnimation("bullet",bulletImg);
        bullet.scale = 0.13;
        bullet.y = Math.round(random(100, 520));
        bullet.velocityX = 18;
        bulletGroup.velocityX = (7 + score / 100);
        bullet.lifetime = 500;
        bulletGroup.add(bullet);
    }
}

function reset(){
    gameState = 1;
    gameOver.visible = false;
    reload.visible = false;
    eagle.visible = true;
    score = 0;
}