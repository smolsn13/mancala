var turncounter = 1;
var stonesArr;
// var gameOver = false;
var adjacentPit = {
  '1': 13,
  '2': 12,
  '3': 11,
  '4': 10,
  '5': 9,
  '6': 8,
  '8': 6,
  '9': 5,
  '10': 4,
  '11': 3,
  '12': 2,
  '13': 1
};

var checkPlayer = function() {  //checks turncounter and updates player turn text
  if (turncounter % 2 === 0) {
    $('.turn').text('Player 2');
    // console.log('p2 turn');
  } else {
    $('.turn').text('Player 1');
    // console.log('p1 turn');
  }
  turncounter++;
};

function startBoard() {  //sets gameboard when page loads and after each turn
  // console.log("game loaded");
  for (var i = 0; i < stonesArr.length; i++) {
    $('.bin' + i).html('');
    var stones = '';

    for (var j = 0; j < stonesArr[i]; j++) {
      stones += '<div class="stone"></div>';
      }
    $('.bin' + i).append(stones);
  }
  // console.log('board started');
};

var takeTurn = function(elem) {
  // console.log('turn fired');
  var startPos = elem.attr('data-pit');
  // console.log(startPos);
  var currentPos = startPos;
  // console.log(currentPos);
  var numStones = stonesArr[startPos];
  // console.log(numStones);
  stonesArr[startPos] = 0;
  // console.log(stonesArr[startPos]);

  for (var i = 0; i < numStones; ) {
    var pit = ++currentPos % stonesArr.length;
    // console.log(pit);
    // console.log(typeof pit);
    var stones = stonesArr[pit];
    stones++;
    i++;
    stonesArr[pit] = stones;
    // console.log(stonesArr[pit]);
  }
    if (i == numStones) {
      if (stones == 1) {
        if (endingSide(startPos, pit) && stonesArr[adjacentPit[pit]] !== 0) {  //checks if last stone is dropped in an empty pit, adds extra points for that player
          // console.log("bonus!");
          var bonus = stonesArr[adjacentPit[pit]] + 1;
          if (pit >= 1 && pit <= 6) {
            stonesArr[7] += bonus;  //adds to player2 store
          } else if (pit >=8 && pit <= 13) {
            stonesArr[0] += bonus;  //adds to player1 store
          }
          stonesArr[pit] = 0;
          stonesArr[adjacentPit[pit]] = 0;  //clears both pits after bonus is distributed
        }
      }
    }
};

var endingSide = function(startPit, endPit) {  //
  return ((startPit >= 1 && startPit <= 6) && (endPit >= 1 && endPit <= 6)) ||
    ((startPit >= 8 && startPit <= 13) && (endPit >= 8 && endPit <= 13));
};

$(document).ready(function() {
  stonesArr = [0,4,4,4,4,4,4,0,4,4,4,4,4,4]; //sets initial number of stones in each pit
  // console.log("ready!");
  startBoard();  //sets up the board to begin game
  checkPlayer();  //checks turncounter for current player turn

  $('.rows').on('click', '.pit', function() {  // click event listener
  takeTurn($(this));  //starts player's turn
  startBoard();
  checkPlayer();

  });
});
