var blackjack = new BlackjackGame;

$(document).ready(function(){
  flipCard();
})

//Run Deal Function, display values of cards, and hide right Dealer-Card when deal button pressed
$('#start-button').on("click", function(){
    blackjack.deal();
    displayValues();
    
})

//Initiates Player Hit function when Hit Button Pressed. 
$('#hit-button').on("click", function(){
  blackjack.playerHit();  
  displayValues();
  // displayCardOnBust();
})

//Initiates Compare Sums Function when Stand Button Pressed
$('#stand-button').on("click", function(){
  blackjack.compareSums();
  displayValues();
  //Displays Face Down Dealer Card
  showHiddenDealerCard();
})


function flipCard(){
  $('#card1').on('click', function() {
    $('.dealer-card2').toggleClass('back');
    $('.dealer-card2').toggleClass('front');
  })
}
//Displays Dealer Card if Player Busts or Blackjack
function displayCardOnBust(){
  if(blackjack.checkForBust(blackjack.player) === true){
    $('#dealer-card2').toggleClass('back');
    $('#dealer-card2').toggleClass('front');
  }
}

//Displays Sum of Cards in Hand
function displayValues(){
document.getElementById('player-card-1').innerHTML = "Dealer: " + blackjack.dealer.sum
document.getElementById('dealer-card-1').innerHTML = "Player: " + blackjack.player.sum
}

//Make html for each to be displayed
function displayCard(person, index){
  //Make Tag for Right Dealer Card with Image of Back of the Card
  //Make Tag for All Other Cards. Use img property from card object to enter correct data in style tag.
  if(person.id === 'dealer' && index === 1){
    var html = '<article id="' + person.id + '-card' + index + '" class="' + person.id + '-card back"'
    html+= '</article>'
  }
  else{
  var html = '<article id="' + person.id + '-card' + index + '" class="' + person.id + '-card front"'
  html+= ' style="background-image: url(\'images/' + person.cards[index].img + '.png\')"'
  html+= '</article>'}

  
  //Append Tag to Correct Div
  if(person === blackjack.player){
  $('.container-player').append(html)
  }
  else if(person === blackjack.dealer ){
    $('.container-dealer').append(html)
  }
}
  
  //Clear Cards from Display
function resetCards(){
  $('.container-dealer').html("");
  $('.container-player').html("")
}

function showHiddenDealerCard(){
$('#dealer-card1').attr("style", 'background-image: url(\'images/' + blackjack.dealer.cards[1].img + '.png\')')
}

  //wikipedia link format
  //url(\'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Playing_card_' + blackjack.player.cards[0].img+ '.svg/200px-Playing_card_' + blackjack.player.cards[0].img  + '.svg.png) >'


