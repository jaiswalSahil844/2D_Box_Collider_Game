let paintbox = document.getElementById("paintbox")
let context = paintbox.getContext("2d")

let playerSpeed = 5

class Box {
    constructor(size, color){
        this.size = size
        this.color = color
        this.x = 0
        this.y = 0
    }
}

class Player extends Box{
    constructor(){
        super(50, 'blue')
        this.x = 0
        this.y = 250
        this.speed = 0
    }
    move(){
        this.x += this.speed
    }
}

class Enemy extends Box{
    constructor(speed){
        super(50, 'red')
        this.speed = speed
    }
    move(){
        this.y += this.speed
        if(this.y + this.size > 500){
            this.speed = - (Math.abs(this.speed))
        }
        if(this.y < 0){
            this.speed =  (Math.abs(this.speed)) 
        }
    }
}

let player = new Player()
let e1 = new Enemy(4)
let e2 = new Enemy(8)
let e3 = new Enemy(12)

e1.x = 100
e2.x = 233
e3.x = 366

function isColided(box1, box2){

    if(box1.x < box2.x + box2.size && box1.x + box2.size > box2.x && box1.y < box2.y + box2.size && box1.y + box2.size > box2.y ){
        return true
    }
    return false
    
}

function drawBox(box){
    context.fillStyle = box.color
    context.fillRect(box.x, box.y, box.size, box.size)
}

paintbox.addEventListener('mousedown', () => {
    player.speed = playerSpeed
})

paintbox.addEventListener('mouseup', () => {
    player.speed = 0
})

setInterval( () => {
    playerSpeed = 5 + parseInt(Math.random() * 10)
    player.y = 100 + (Math.random()*300)
}, 2000)

function gameLoop(){

    context.clearRect(0, 0, 500, 500)
    e1.move()
    e2.move()
    e3.move()
    player.move()

    if(isColided(e1, player) || isColided(e2, player) || isColided(e3, player)){
        player.x = 0
        window.alert('Game Over')
    }

    if(player.x + player.size >= 500){
        window.alert('Game Win')
        player.x = 0
    }
    drawBox(player)
    drawBox(e1)
    drawBox(e2)
    drawBox(e3)
    window.requestAnimationFrame(gameLoop)
}

gameLoop()