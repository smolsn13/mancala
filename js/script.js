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

function startBoard() {  //sets gameboard when page loads and after each turn

  for (var i = 0; i < stonesArr.length; i++) {

    $('.bin' + i).html('');
    var stones = '';

    for (var j = 0; j < stonesArr[i].currentStones; j++) {
      stones += '<div class="stone"></div>';
      }
    $('.bin' + i).append(stones);
  }
};

var takeTurn = function(elem) { 
  var startPos = parseInt(elem.attr('data-pit'));

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

  var numStones = stonesArr[startPos].currentStones;
  stonesArr[startPos].currentStones = 0;

  for (i = numStones; i > 0; i--){      //logic for moving stones around the board and wrapping at the end of the loop
    if (nextPos === 0) {
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
      stonesArr[nextPos].currentStones += 1;
      if (nextPos === 13) {
        nextPos = 0;
      } else {
        nextPos++;
      }
    }
  }
  nextPos--;
  if (stonesArr[nextPos].currentStones === 1) {
    if (endingSide(startPos, nextPos) && stonesArr[adjacentPit[nextPos]].currentStones !== 0) {  //checks if last stone is dropped in an empty pit, adds extra points for that player
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

  var p1store = stonesArr[0].currentStones;
  var box1 = stonesArr[1].currentStones;
  var box2 = stonesArr[2].currentStones;
  var box3 = stonesArr[3].currentStones;
  var box4 = stonesArr[4].currentStones;
  var box5 = stonesArr[5].currentStones;
  var box6 = stonesArr[6].currentStones;
  var p2store = stonesArr[7].currentStones;
  var box8 = stonesArr[8].currentStones;
  var box9 = stonesArr[9].currentStones;
  var box10 = stonesArr[10].currentStones;
  var box11 = stonesArr[11].currentStones;
  var box12 = stonesArr[12].currentStones;
  var box13 = stonesArr[13].currentStones;

  var checkWinner = function() {  //checks if one row is empty, declares the winner with a modal
    if (box1 === 0 && box2 === 0 && box3 === 0 && box4 === 0 && box5 === 0 && box6 === 0) {
      var jackpot = box8 + box9 + box10 + box11 + box12 + box13;
      p1store += jackpot;
      gameOver = true;
      if (p1store > p2store) {
        swal('We have a winner!', 'Player 1 wins!', 'success');
        startBoard();
      }
    } else if (box8 === 0 && box9 === 0 && box10 === 0 && box11 === 0 && box12 === 0 && box13 === 0) {
        var jackpot = box1 + box2 + box3 + box4 + box5 + box6;
        p2store += jackpot;
        gameOver = true;
        if (p2store > p1store) {
          swal('We have a winner!', 'Player 2 wins!', 'success');
          startBoard();
        }
    }
  }

  var goAgain = function() {   //changes the turn, gives player a second turn as applicable
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
  }
  checkWinner();
  goAgain();
};

var endingSide = function(startPit, endPit) {  //checks if stone started and ended on same side
  return ((startPit >= 1 && startPit <= 6) && (endPit >= 1 && endPit <= 6)) ||
    ((startPit >= 8 && startPit <= 13) && (endPit >= 8 && endPit <= 13));
};

$(document).ready(function() {
  $('#startgame').on('click', function() {   //hides the instructions when Start Game is clicked, shows gameboard
    $('#splash').hide('slow');
    $('#startgame').hide('slow');
    $('.gameboard').css('display', 'flex');
    $('.turncount').css('display', 'block');
  });

  stonesArr = [                        //starting number of stones for each pit
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

  startBoard();  //sets up the board to begin game

  $('.rows').on('click', '.pit', function() {  //activates click for the playable pits
    takeTurn($(this));  //starts player's turn
    startBoard();
  });
});
