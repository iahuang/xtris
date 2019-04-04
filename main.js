'use strict';
// ^ was really hoping that would fix annoying bugs related to js (by design) not throwing errors when it really should. i was wrong btw


// Extensions

Array.prototype.min = function() {
    return Math.min.apply(null, this);
};
Array.prototype.max = function() {
    return Math.max.apply(null, this);
};

// Graphics initialization

let app = new PIXI.Application({width: 500, height: 500});
PIXI.loader
  .add("tile.png")
  .load(setup);
document.body.appendChild(app.view);

var game = {
    current: null,
    bagIndex: 0,
    bagPattern: ["random"]
};

function nextPiece() {
    var which = bagPattern[bagIndex];
    if (which == "random") {
        
    }
}

class Bag {
    
}

class Tetromino {
    blocks = []; // A collection of comprising Block instances

    // Coordinates on the game board (not the screen)
    tx = 0;
    ty = 0;

    color = 0xffffff;

    get x() {
        return this.tx;
    }
    set x(newx) {
        this.setPos(newx, this.ty);
    }

    get y() {
        return this.ty;
    }
    set y(newy) {
        this.setPos(this.tx, newy);
    }

    constructor (template, color) {
        this.color = color;
        template.forEach((pos)=>{
            let block = new Block(pos[0], pos[1]);
            block.setAlive(true);
            block.setColor(color);
            this.blocks.push(block);
        });
        this.center();
    }
    findCenter () {
        let minx = this.blocks.map(b=>b.x).min();
        let miny = this.blocks.map(b=>b.y).min();
        let maxx = this.blocks.map(b=>b.x).max();
        let maxy = this.blocks.map(b=>b.y).max();
        let cx = Math.floor((maxx-minx)/2);
        let cy = Math.floor((maxy-miny)/2);
        return [cx+minx, cy+miny];
    }
    findExactCenter () {
        let minx = this.blocks.map(b=>b.x).min();
        let miny = this.blocks.map(b=>b.y).min();
        let maxx = this.blocks.map(b=>b.x).max();
        let maxy = this.blocks.map(b=>b.y).max();
        let cx = (maxx-minx)/2;
        let cy = (maxy-miny)/2;
        return [cx+minx, cy+miny];
    }
    center () {
        let center = this.findCenter();
        this.blocks.forEach((block)=>{
            block.x-=center[0];
            block.y-=center[1];
        });
    }
    setPos(x, y) {
        let dx = x-this.tx;
        let dy = y-this.ty;
        this.blocks.forEach((block)=>{
            block.x+=dx;
            block.y+=dy;
        });
        this.tx = x;
        this.ty = y;

    }
    rotateCC () {
        let txOld = this.tx;
        let tyOld = this.ty;
        let c = this.findExactCenter();
        // this.setPos(0,0); // Pop translation
        console.log(c);
        this.x-=c[0];
        this.y-=c[1];

        this.blocks.forEach((block)=>{ // Rotate over the origin (0, 0)
            let x = block.x;
            let y = block.y;
            block.x=-y;
            block.y=x;
        });
        this.setPos(txOld, tyOld); // Push translation
        console.log(this.findExactCenter(), this.x, this.y);
        // let dx = this.x-this.findCenter()[0];
        // let dy = this.y-this.findCenter()[1];
        // this.x+=dx;
        // this.y+=dy;
    }
    rotateC () {
        this.rotateCC();
        this.rotateCC();
        this.rotateCC();
    }
}

class Block {
    sprite = null;
    alive = false;
    color = 0xffffff;
    tx = 0;
    ty = 0;

    get x() {
        return this.tx;
    }
    set x(newx) {
        this.setPos(newx, this.ty);
    }

    get y() {
        return this.ty;
    }
    set y(newy) {
        this.setPos(this.tx, newy);
    }

    constructor (x, y) {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["tile.png"].texture);
        this.sprite.anchor.set(0.5); 
        this.setPos(x,y);
        this.sprite.width = config.tileSize;
        this.sprite.height = config.tileSize;
        this.setAlive(false);
        this.setColor(darktheme.grey)
        app.stage.addChild(this.sprite);
    }
    
    getColor() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
        this.sprite.tint = color;
    }

    setAlive(alive) {
        this.alive = alive;
        if (alive) {
            this.sprite.alpha = 1;
        } else {
            this.sprite.alpha = 0;
        }
    }
    
    setPos(x, y) {
        this.tx = x;
        this.ty = y;
        this.sprite.x = x*config.tileSize;
        this.sprite.y = y*config.tileSize;
    }

    setScreenPos(sx, sy) {
        this.tx = null;
        this.ty = null;
        this.sprite.x = sx;
        this.sprite.y = sy;
    }

    get sx() {
        return this.sprite.x;
    }
    
    get sy() {
        return this.sprite.y;
    }
}

var blocks = {}
function initBoard() {
    for (var y=0;y<config.boardHeight;y++) {
        for (var x=0;x<config.boardWidth;x++) {
            blocks[(x,y)] = new Block(x,y);
        }
    }
}

function setup() {
    app.ticker.add(delta => gameLoop(delta));
    initBoard();
    game.current = new Tetromino(minos.ipiece, darktheme.cyan);
    game.current.setPos(2,2);
}

function gameLoop(delta){

}
