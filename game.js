/* Coded by Oto Tabares */


/***********************
    Global Variables
***********************/

// for randomly constructing back of cards
var cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
// for comparing values of two cards
var currentCards = [];


/***********************
    Document Ready
***********************/

$(document).ready(function() {
  shuffleCards();

  $('.card-wrapper').click(function() {

    // flips card on click if it is not already flipped and adds
    // the card's content to an array for comparison purposes
    if (!$(this).hasClass('flip')) {
      if ($(this).hasClass('wrong')) {
        $(this).toggleClass('wrong')
      }
      $(this).toggleClass('flip');
      currentCards.push($(this).find('p'));
    }


    // compares the cards in the array when there are two
    if (currentCards.length === 2) {
      compareCards();
    }
  });
});


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
    elem1.toggleClass('wrong');
    elem2.toggleClass('wrong');

    setTimeout(function() {
      elem1.toggleClass('flip');
    }, 400);

    setTimeout(function() {
      elem2.toggleClass('flip');
    }, 400);

  } else {
    // elem1.children('.back').css('background-color', '#2ce6c1');
    // elem2.children('.back').css('background-color', '#2ce6c1');

    setTimeout(function() {
      elem1.addClass('right');
    }, 200);

    setTimeout(function() {
      elem2.addClass('right');
    }, 200);
  }

  // reset the array for next comparison
  currentCards = [];


}
