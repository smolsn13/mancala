var turncounter = 0;
var stonesArr = [0,4,4,4,4,4,4,0,4,4,4,4,4,4];
var gameOver = false;
var pitOne = $('#1');
var pitTwo = $('#2');
var pitThree = $('#3');
var pitFour = $('#4');
var pitFive = $('#5');
var pitSix = $('#6');
var pitSeven = $('#7');
var pitEight = $('#8');
var pitNine = $('#9');
var pitTen = $('#10');
var pitEleven = $('#11');
var pitTwelve = $('12');
var pitThirteen = $('13');
var pitFourteen = $('14');


var checkPlayer = function() {
  if (turncounter % 2 === 0) {
    $('.turn').text('Player 2');
    console.log('p2 turn');
  } else {
      $('.turn').text('Player 1');
    console.log('p1 turn');
  }
  turncounter++;
};

function startBoard() {
  console.log("game loaded");
  for (var i = 0; i < stonesArr.length; i++) {
      $('#pit' + i).text('');
      var stones = '';

      for (var j = 0; j < [i]; j++) {
            stones += '<div class="stone"></div>';
        }
      $('#pit' + i).append(stones);
    }
}

var takeTurn = function(elem) {
  var startPos = elem.attr('data-pit');
  var currentPos = startPos;
  var stones = stonesArr[startPos];
  var stonesArr[startPos] = 0;



}


$(document).ready(function() {
  console.log("ready!");
  startBoard();
  checkPlayer();

  $('.rows').on('click', '.pit', function() {
  startBoard();
  checkPlayer();
  takeTurn(this);
  // console.log(this);
  });
});
