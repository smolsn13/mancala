// var turncounter = 1;
var stonesArr;
var turn = 'p1';
var gameOver = false;
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

// var checkPlayer = function() {  //checks turncounter and updates player turn text
//   if (turncounter % 2 === 0) {
//     $('.turn').text('Player 2');
//     turn = 'p2';
//     // console.log('p2 turn');
//   } else {
//     $('.turn').text('Player 1');
//     turn = 'p1';
//     // console.log('p1 turn');
//   }
//   turncounter++;
// };

function startBoard() {  //sets gameboard when page loads and after each turn
  // console.log("game loaded");

  for (var i = 0; i < stonesArr.length; i++) {

    $('.bin' + i).html('');
    var stones = '';

    for (var j = 0; j < stonesArr[i].currentStones; j++) {
      stones += '<div class="stone"></div>';
      }
    $('.bin' + i).append(stones);
  }
  // console.log('board started');
};

var takeTurn = function(elem) {
  // console.log('turn fired');
  var startPos = parseInt(elem.attr('data-pit'));
  console.log(startPos);

  var nextPos = startPos + 1;
  if (turn === 'p1') {
    if (nextPos === 14) {
      nextPos = 0;
    }
  } else if (turn === 'p2') {
    if (nextPos === 14) {
      nextPos = 1;
    }
  }


  console.log(nextPos);
  var numStones = stonesArr[startPos].currentStones;
  stonesArr[startPos].currentStones = 0;

  for (i = numStones; i > 0; i--){
    if (nextPos === 0) {
      console.log(nextPos)
      if (turn === 'p1') {
        stonesArr[nextPos].currentStones += 1;
        if (nextPos === 13) {
          nextPos = 0;
        } else {
          nextPos++;
        }
      } else {
        if (nextPos === 13) {
          nextPos = 0;
        } else {
          nextPos++;
        }
      }
    } else if (nextPos === 7) {
      console.log(nextPos)
      if (turn === 'p2') {
        stonesArr[nextPos].currentStones += 1;
        if (nextPos === 13) {
          nextPos = 0;
        } else {
          nextPos++;
        }
      } else {
        if (nextPos === 13) {
          nextPos = 0;
        } else {
          nextPos++;
        }
      }
    } else {
      console.log(nextPos)
      stonesArr[nextPos].currentStones += 1;
      if (nextPos === 13) {
        nextPos = 0;
      } else {
        nextPos++;
      }
    }
  }


//need to track ending pit for each move, use that value below for bonus calculation
  nextPos--;
  if (stonesArr[nextPos].currentStones === 1) {
    if (endingSide(startPos, nextPos) && stonesArr[adjacentPit[nextPos]].currentStones !== 0) {  //checks if last stone is dropped in an empty pit, adds extra points for that player
      // console.log("bonus!");
      var bonus = stonesArr[adjacentPit[nextPos]].currentStones + 1;
      if (nextPos >= 1 && nextPos <= 6) {
        stonesArr[7].currentStones += bonus;  //adds to player2 store
      } else if (nextPos >=8 && nextPos <= 13) {
        stonesArr[0].currentStones += bonus;  //adds to player1 store
      }
      stonesArr[nextPos].currentStones = 0;
      stonesArr[adjacentPit[nextPos]].currentStones = 0;  //clears both pits after bonus is distributed
    }
  }
  var goAgain = function() {
    if (turn === 'p1') {
      if (nextPos === 0) {
        turn = 'p1';
        $('.turn').text('Player 1');
      } else {
        turn = 'p2';
        $('.turn').text('Player 2');
      }
    } else if (turn === 'p2') {
      if (nextPos === 7) {
        turn = 'p2';
        $('.turn').text('Player 2');
      } else {
        turn = 'p1';
        $('.turn').text('Player 1');
      }
    }
  };
  goAgain();
};

var endingSide = function(startPit, endPit) {
  return ((startPit >= 1 && startPit <= 6) && (endPit >= 1 && endPit <= 6)) ||
    ((startPit >= 8 && startPit <= 13) && (endPit >= 8 && endPit <= 13));
};

$(document).ready(function() {
  stonesArr = [
    {currentStones: 0, owner: 'p1'},
    {currentStones: 4, owner: 'p2'},
    {currentStones: 4, owner: 'p2'},
    {currentStones: 4, owner: 'p2'},
    {currentStones: 4, owner: 'p2'},
    {currentStones: 4, owner: 'p2'},
    {currentStones: 4, owner: 'p2'},
    {currentStones: 0, owner: 'p2'},
    {currentStones: 4, owner: 'p1'},
    {currentStones: 4, owner: 'p1'},
    {currentStones: 4, owner: 'p1'},
    {currentStones: 4, owner: 'p1'},
    {currentStones: 4, owner: 'p1'},
    {currentStones: 4, owner: 'p1'},
    ];
  // console.log("ready!");
  startBoard();  //sets up the board to begin game
  // checkPlayer();  //checks turncounter for current player turn

  $('.rows').on('click', '.pit', function() {  // click event listener
    takeTurn($(this));  //starts player's turn
    startBoard();
    // checkPlayer();
  });
});
