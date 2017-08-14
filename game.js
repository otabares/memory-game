
// used for randomly constructing the backside of cards
var cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

// used to compare values of two cards
var currentCards = [];

$(document).ready(function() {

  // flips cards when clicked
  $('.card-wrapper').click(function() {

    if (!$(this).hasClass('flip')) {
      $(this).toggleClass('flip');
      currentCards.push($(this).find('p'));
    }

    if (currentCards.length === 2) {
      if (currentCards[0].text() !== currentCards[1].text()) {
        var elem1 = currentCards[0].closest('.card-wrapper');
        var elem2 = currentCards[1].closest('.card-wrapper');

        // elem1.toggleClass('wrong');
        // elem2.toggleClass('wrong');

        setTimeout(function() {
          elem1.toggleClass('flip');
        }, 1000);

        setTimeout(function() {
          elem2.toggleClass('flip');
        }, 1000);

        // setTimeout(function() {
        //   elem1.toggleClass('wrong');
        // }, 1000);
        //
        // setTimeout(function() {
        //   elem2.toggleClass('wrong');
        // }, 1000);

        // elem1.toggleClass('wrong');
        // elem2.toggleClass('wrong');

      }
      // else {
      //   currentCards[0].closest('.card-wrapper').addClass('right');
      //   currentCards[1].closest('.card-wrapper').addClass('right');
      // }

      // reset the array for next comparison
      currentCards = [];
    }


  });

  // $('.card-wrapper').click(function() {
  //
  //     currentCard2 = $(this);
  //     currentCard2.toggleClass('flip');
  //     cardBack2 = currentCard2.children('p');
  //   }
  //
  //   if (cardBack1 && cardBack2) {
  //     if (cardBack1 !=== cardBack2) {
  //       currentCard1.addClass('wrong');
  //       currentCard2.addClass('wrong');
  //       }
  //     }
  // });

  // shuffles the backside of cards
  var backDiv = $('.back');
  for (var i = 0; i < backDiv.length; i++) {

    // randomly choose an element from MATCHES
    var c = cards[Math.floor(Math.random()*cards.length)];
    var cStr = String(c); // card number as a String

    // append element to current div
    var elementToAppend =
    '<p class="card-text ' + 'match' + cStr + '">' + cStr + '</p>'
    backDiv.eq(i).append(elementToAppend);

    // remove match from list of matches remaining
    var cIndex = cards.indexOf(c);
    cards.splice(cIndex, 1);
  };
});
