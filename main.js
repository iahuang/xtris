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

    ox = 0;
    oy = 0;

    template = null;

    rot = 0;

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
        this.template = template;
        this.center();
    }
    findCenter () {
        let minx = this.blocks.map(b=>b.x).min();
        let miny = this.blocks.map(b=>b.y).min();
        let maxx = this.blocks.map(b=>b.x).max();
        let maxy = this.blocks.map(b=>b.y).max();
        console.log("bounding grid",minx,miny,maxx,maxy)
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
        console.log("bounding",minx,miny,maxx,maxy)
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
        this.ox = x;
        this.oy = y;
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
        this.ox = this.tx;
        this.oy = this.ty;
        let txOld = this.tx;
        let tyOld = this.ty;
        this.setPos(0,0); // Pop translation

        this.blocks.forEach((block)=>{ // Rotate over the origin (0, 0)
            let x = block.x;
            let y = block.y;
            block.x=-y;
            block.y=x;
        });

        this.setPos(txOld, tyOld); // Push translation
        // console.log("center",this.findExactCenter());
        // let dx = this.x-this.findExactCenter()[0];
        // let dy = this.y-this.findExactCenter()[1];
        // console.log("delta",dx,dy);
        // console.log("pos",this.x,this.y)
        // this.x+=Math.floor(dx);
        // this.y+=Math.floor(dy);
        // this.tx-=Math.floor(dx);
        // this.ty-=Math.floor(dy);
        console.log("center2",this.findExactCenter());
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
    game.current = new Tetromino(minos.tpiece, darktheme.purple );
    game.current.setPos(2,2);
}

function gameLoop(delta){

}
