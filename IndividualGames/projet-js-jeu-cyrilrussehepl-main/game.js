const squareSize = 32;
var gridWidth = 10;
var gridHeight = 20;
var tetriminos = {
   I: [[1, 1, 1, 1]],
   Z: [
      [1, 1, 0],
      [0, 1, 1],
   ],
   S: [
      [0, 1, 1],
      [1, 1, 0],
   ],
   O: [
      [1, 1],
      [1, 1],
   ],
   T: [
      [1, 1, 1],
      [0, 1, 0],
   ],
   L: [
      [1, 1, 1],
      [0, 0, 1],
   ],
   J: [
      [1, 1, 1],
      [1, 0, 0],
   ],
};
var currentPiece;
var grid = [];

var landed = false;

var gameOver = false;
// var controlledPiece;
var interval = 500;
var timer;
var keys = {
   keydownLeft: false,
   keydownRight: false,
   keydownUp: false,
   keydownDown: false,
};

//Init game
var config = {
   type: Phaser.AUTO,
   width: 12 * squareSize,
   height: 22 * squareSize,
   physics: {
      default: "arcade",
      arcade: {
         gravity: { y: 0 },
         debug: false,
      },
   },
   scene: {
      preload: preload,
      create: create,
      update: update,
   },
};
var game = new Phaser.Game(config);

//Preload
function preload() {
   this.load.image("tiles", "Assets/Board/Tilemap32x32.png");
   this.load.tilemapTiledJSON("map", "grille.json");

   this.load.image("I", "Assets/Shapes/I.png");
   this.load.image("L", "Assets/Shapes/L.png");
   this.load.image("J", "Assets/Shapes/J.png");
   this.load.image("O", "Assets/Shapes/O.png");
   this.load.image("S", "Assets/Shapes/S.png");
   this.load.image("T", "Assets/Shapes/T.png");
   this.load.image("Z", "Assets/Shapes/Z.png");
}

//Create
function create() {
   //Create Board from json file
   const map = this.make.tilemap({ key: "map" });
   const tileset = map.addTilesetImage("Tilemap", "tiles");
   var layerBackground = map.createStaticLayer("Background", tileset);
   var layerBorders = map.createDynamicLayer("Borders", tileset);

   //Create Grid
   for (var i = 0; i < gridHeight; i++) {
      grid[i] = [];
      for (var j = 0; j < gridWidth; j++) {
         grid[i][j] = null;
      }
   }
   //Create first piece
   controlledPiece = this.physics.add.group();
   currentPiece = createPiece(this);

   //  Input Events init
   cursors = this.input.keyboard.createCursorKeys();

   // Create event with timer to make piece fall
   timer = this.time.addEvent({
      delay: interval,
      callback: movePiece,
      callbackScope: this,
      loop: true,
   });
}

//Update
function update() {
   // Check if still in game
   if (gameOver) return;

   //Create new piece
   if (landed) {
      setPieceOnGrid();
      currentPiece = createPiece(this);
      if (collision()) {
         gameOver = true;
         timer.remove(false);
      }
      landed = false;
   }

   //Inputs handle
   inputsHandler();
}

function inputsHandler() {
   if (cursors.up.isDown) {
      if (!keys.keydownUp) {
         rotatePiece(1);
         keys.keydownUp = true;
      }
   } else if (cursors.up.isUp) {
      keys.keydownUp = false;
   }

   if (cursors.down.isDown) {
      if (!keys.keydownDown) {
         rotatePiece(-1);
         keys.keydownDown = true;
      }
   } else if (cursors.down.isUp) {
      keys.keydownDown = false;
   }

   if (cursors.right.isDown) {
      if (!keys.keydownRight) {
         translationPiece(1);
         keys.keydownRight = true;
      }
   } else if (cursors.right.isUp) {
      keys.keydownRight = false;
   }

   if (cursors.left.isDown) {
      if (!keys.keydownLeft) {
         translationPiece(-1);
         keys.keydownLeft = true;
      }
   } else if (cursors.left.isUp) {
      keys.keydownLeft = false;
   }
}

function setPieceOnGrid() {
   for (var i = 0; i < currentPiece.shape.length; i++) {
      for (var j = 0; j < currentPiece.shape[i].length; j++) {
         if (currentPiece.shape[i][j] === 1) {
            grid[currentPiece.y + i][currentPiece.x + j] =
               currentPiece.sprite[i][j];
         }
      }
   }
}

function movePiece() {
   for (var row = 0; row < currentPiece.sprite.length; row++) {
      for (var col = 0; col < currentPiece.sprite[row].length; col++) {
         if (currentPiece.sprite[row][col] == null) continue;
         currentPiece.sprite[row][col].y += squareSize;
      }
   }
   currentPiece.y++;
   if (currentPiece.y + currentPiece.height == gridHeight || collision())
      landed = true;
}

function translationPiece(input) {
   if (
      (currentPiece.x == 0 && input == -1) ||
      (currentPiece.x + currentPiece.shape[0].length == gridWidth && input == 1)
   )
      return;

   for (var row = 0; row < currentPiece.height; row++) {
      currentPiece.sprite[row].forEach((ceil) => {
         if (ceil == null) return;
         ceil.x += input * squareSize;
      });
   }
   currentPiece.x += input;
}

function createPiece(game) {
   var piece = {};
   var pieceKeys = Object.keys(tetriminos);
   piece.name = pieceKeys[Math.floor(Math.random() * pieceKeys.length)];
   piece.shape = tetriminos[piece.name];
   piece.sprite = [];
   piece.x = 4;
   if (piece.name == "I") piece.x = 3;
   piece.y = 0;
   piece.height = piece.shape.length;

   for (var row = 0; row < piece.shape.length; row++) {
      piece.sprite[row] = [];
      for (var col = 0; col < piece.shape[row].length; col++) {
         //Add empty ceil
         if (!piece.shape[row][col]) piece.sprite[row].push(null);
         //Add sprite otherwise
         else {
            piece.sprite[row].push(
               game.add.sprite(
                  (piece.x + 1.5 + col) * squareSize,
                  (piece.y + 1.5 + row) * squareSize,
                  piece.name
               )
            );
         }
      }
   }

   return piece;
}

function rotatePiece(direction) {
   var arrayRowNum = currentPiece.shape.length;
   var arrayColNum = currentPiece.shape[0].length;

   var sprites = currentPiece.sprite;
   currentPiece.sprite = [];

   var newMatrix = Array.from({ length: arrayColNum }, () =>
      Array.from({ length: arrayRowNum }, () => 0)
   );

   if (direction == 1) {
      for (var row = 0; row < arrayColNum; row++) {
         currentPiece.sprite[row] = [];
         for (var col = 0; col < arrayRowNum; col++) {
            newMatrix[row][col] =
               currentPiece.shape[arrayRowNum - col - 1][row];

            currentPiece.sprite[row].push(sprites[arrayRowNum - col - 1][row]);
            if (currentPiece.sprite[row][col] != null) {
               currentPiece.sprite[row][col].x =
                  (currentPiece.x + 1.5 + col) * squareSize;
               currentPiece.sprite[row][col].y =
                  (currentPiece.y + 1.5 + row) * squareSize;
            }
         }
      }
   } else if (direction == -1) {
      for (var row = 0; row < arrayColNum; row++) {
         for (var col = 0; col < arrayRowNum; col++) {
            newMatrix[row][col] =
               currentPiece.shape[col][arrayColNum - row - 1];

            currentPiece.sprite[row].push(sprites[col][arrayColNum - row - 1]);
            if (currentPiece.sprite[row][col] != null) {
               currentPiece.sprite[row][col].x =
                  (currentPiece.x + 1.5 + col) * squareSize;
               currentPiece.sprite[row][col].y =
                  (currentPiece.y + 1.5 + row) * squareSize;
            }
         }
      }
   }
   currentPiece.shape = newMatrix;
   currentPiece.height = arrayColNum;
}

function collision() {
   for (var row = 0; row < currentPiece.height; row++) {
      for (var col = 0; col < currentPiece.sprite[row].length; col++) {
         if (currentPiece.sprite[row][col] == null) continue;

         if (grid[currentPiece.y + row + 1][currentPiece.x + col] != null)
            return true;
      }
   }

   return false;
}

// function checkLines(){
// }
