var blackjack = new BlackjackGame;
$(document).ready(function(){
  flipCard();
})

function flipCard(){
  $('#card1').on('click', function() {
    $('#card1').toggleClass('back');
    $('#card1').toggleClass('front');
  })
}
