/* Coded by Oto Tabares */


/***********************
    Global Variables
***********************/

// for randomly constructing back of cards
var cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
var currentCards = []; // for comparing values of two cards
var correctMatches = 0;
var startTimer = true;
var totalMoves = 0;
var starsLeft = 3;
var secondsElapsed = 0;
var minsElapsed = 0;

/***********************
    Main Logic
***********************/

$(document).ready(function() {
  shuffleCards();
  playGame();
  restarting();
  setInterval(function() {
    timingFn();
  }, 1000);
});

function playGame() {
  $('.card-wrapper').click(function() {
    if (startTimer) {
      setInterval(function() {
        secondsElapsed++;
      }, 1000);
      startTimer = false;
    }
    if (!$(this).hasClass('flip')) {
      $(this).toggleClass('flip');
      currentCards.push($(this).find('p'));
    }
    if (currentCards.length === 2) {
      totalMoves += 1;
      $('.moves-counter').html('<p>' + String(totalMoves) + ' Moves</p>');
      compareCards();
    }
    updateStars();
    winning();
  });
}

/***********************
    Helper Functions
***********************/

function shuffleCards() {
  /* Randomly assign content to the back of cards. */

  // shuffles the backside of cards
  var backDiv = $('.back');
  for (var i = 0; i < backDiv.length; i++) {

    // randomly choose an element from MATCHES
    var c = cards[Math.floor(Math.random() * cards.length)];
    var cStr = String(c); // card number as a String

    // append element to current div (back of card)
    var elementToAppend =
    '<p class="card-text ' + 'match' + cStr + '">' + cStr + '</p>'
    backDiv.eq(i).append(elementToAppend);

    // remove match from those remaining in MATCHES
    var cIndex = cards.indexOf(c);
    cards.splice(cIndex, 1);
  }
}

function compareCards() {
  /* Compares the back of two clicked cards.
  If the cards match, leave the cards flipped.
  If the cards do not match, flip the cards back. */

  var elem1 = currentCards[0].closest('.card-wrapper');
  var elem2 = currentCards[1].closest('.card-wrapper');
  if (currentCards[0].text() !== currentCards[1].text()) {

    setTimeout(function() {
      elem1.toggleClass('flip');
    }, 400);

    setTimeout(function() {
      elem2.toggleClass('flip');
    }, 400);

  } else {
    elem1.children('.back').addClass('right');
    elem2.children('.back').addClass('right');
    correctMatches += 1;
  }
  // reset the array for next comparison
  currentCards = [];
}

function winning() {
  if (correctMatches === 8) {
    setTimeout(function() {
      $('.game').toggle();
    }, 400);
    setTimeout(function() {
      $('.won').toggle();
    }, 400);
    $('.results').text('With ' + totalMoves + ' moves and ' +
      starsLeft + ' stars.');
    $('.time-elapsed').text(
      'It took you ' + minsElapsed + ' minutes and ' +
      secondsElapsed + ' seconds!');
    clearInterval(secondsElapsed);
  }
}

function restarting() {
  $('.again-button').click(function(){
    location.reload();
  });

  $('.restart').click(function(){
    location.reload();
  });
}

function updateStars() {
  if (totalMoves > 12) {
    starsLeft = 2;
    $('.stars').html(
      '<img src="images/star.png" alt="star">' +
      '<img src="images/star.png" alt="star">' +
      '<img src="images/star_outline.png" alt="star">');
  }
  if (totalMoves > 16) {
    starsLeft = 1;
    $('.stars').html(
      '<img src="images/star.png" alt="star">' +
      '<img src="images/star_outline.png" alt="star">' +
      '<img src="images/star_outline.png" alt="star">');
  }
  if (totalMoves > 20) {
    starsLeft = 0;
    $('.stars').html(
      '<img src="images/star_outline.png" alt="star">' +
      '<img src="images/star_outline.png" alt="star">' +
      '<img src="images/star_outline.png" alt="star">');
  }
}

function timingFn() {
  var secStr = ''
  var minStr = ''

  if (secondsElapsed === 60) {
    minsElapsed++;
    secondsElapsed = 0;
  }

  // create a seconds string
  if (secondsElapsed < 10) {
    secStr = '0' + String(secondsElapsed);
  } else {
    secStr = String(secondsElapsed);
  }

  // create a minutes string
  if (minsElapsed < 10) {
    minStr = '0' + String(minsElapsed);
  } else {
    minStr = String(minsElapsed);
  }

  $('.timer p').text(minStr + ':' + secStr);
}
