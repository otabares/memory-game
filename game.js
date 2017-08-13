
// used for randomly constructing the backside of cards
CARDS = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]

$(document).ready(function() {
  // flips cards when clicked
  $('.card-wrapper').click(function() {
    $(this).toggleClass('flip');
  });

  // shuffles the backside of cards
  var backDiv = $('.back');
  for (var i = 0; i < backDiv.length; i++) {

    // randomly choose an element from MATCHES
    var c = CARDS[Math.floor(Math.random()*CARDS.length)];
    var cStr = String(c); // card number as a String

    // append element to current div
    var elementToAppend =
    '<p class="card-text ' + 'match' + cStr + '">' + cStr + '</p>'
    backDiv.eq(i).append(elementToAppend);

    // remove match from list of matches remaining
    var cIndex = CARDS.indexOf(c);
    CARDS.splice(cIndex, 1);



  };
});
