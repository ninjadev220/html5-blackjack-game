var blackjack = new BlackjackGame;

//Activates Betting Buttons and Displays Current Bet and Total Values
$(document).ready(function() {
  $("#intro").addClass('intro-container')
  $('#victory').addClass('intro');
  $('#victory').html('<h1>Place Your Bet and Press Deal To Start</h1>');
  
  //Initialize Bet Buttons to Adjust Current Bet Value
  changeBet();
  //Display Bet Value and Total Value
  displayBets();

  //Blocks Hit and Stand Button At Beginning
  buttonsStartDeal();
});


//Run Deal Function, display values of cards, and hide right Dealer-Card when deal button pressed
$('#deal-button').on("click", function(){
    //  Remove Intro Stylings
     $('#victory').removeClass('intro');
     $("#intro").removeClass('intro-container')
     //Set buttons to Appropriate Positions
     buttonsAfterDeal();
    //Deal the Cards 
     blackjack.deal();
   
})

//Initiates Player Hit function when Hit Button Pressed. 
$('#hit-button').on("click", function(){
  blackjack.playerHit();  
})

//Initiates Compare Sums Function when Stand Button Pressed
$('#stand-button').on("click", function(){
  blackjack.compareSums();
  showHiddenDealerCard();
})

//Displays Sum of Player Cards and Value of First Dealer Card
function displaySums(){
document.getElementById('dealer-cards-score').innerHTML = "Dealer: " + blackjack.dealer.cards[0].value
document.getElementById('player-cards-score').innerHTML = "Player: " + blackjack.player.sum
}

//Shows Sums of Player and Dealer Cards and Dealer's Hidden Card after Dealer Flips 
function showHiddenDealerCard(){
  $('#dealer-card1').attr("style", 'background-image: url(\'images/' + blackjack.dealer.cards[1].img + '.png\')')
  
  //Displays Sums of Player and Dealer Cards 
  $('#dealer-cards-score').text("Dealer: " + blackjack.dealer.sum)
  $('#player-cards-score').text("Player: " + blackjack.player.sum)
  }

//Display Winner of Hand
function displayWinner(person, string){
  if(person === 'push'){
    $("#victory").text('PUSH!');
    //Adds currentBet to Total
    blackjack.checkBet(person, string)
  }
  else if(string === "blackjack"){
    $("#victory").text(person.name.toUpperCase() + " HAS BLACKJACK!")
    //
    blackjack.checkBet(person, string)
  }
  else if(string==="bust"){
    $("#victory").text(person.name.toUpperCase() + " BUSTS!");
  }
  else{
  $("#victory").text(person.name.toUpperCase() + " WINS!");
  //Adds current 
  blackjack.checkBet(person, string)
}

  buttonsStartDeal();
  //Block Hit and Stand Buttons, Unblock Deal Button
  endGame();
}

//Make html for each each to be displayed. Person = Dealer Or Player
function displayCard(person, index){
  //Make Tag for Hidden Dealer Card with Image of Back of the Card
  if(person.id === 'dealer' && index === 1){
    var html = '<article id="' + person.id + '-card' + index + '" class="card col-2"'
    html+= ' style="background-image: url(\'images/backofcard.jpeg\')" >'
    html+= '</article>'

  }
  //Make Tag for All Other Cards. Use img property from card object to enter correct data in style tag.
  else{
  var html = '<article id="' + person.id + '-card' + index + '" class="card col-2"'
  html+= ' style="background-image: url(\'images/' + person.cards[index].img + '.png\')" >'
  html+= '</article>'
}
  //Append Tag to Correct Div
  if(person === blackjack.player){
  $('.container-player .row').append(html)
  }
  else if(person === blackjack.dealer){
    $('.container-dealer .row').append(html)
  }
}

//Display Current Bet and Total
function displayBets(){
$('#current-bet').text("Bet: $" + blackjack.player.currentBet);
$('#player-total').text("Total: $" + blackjack.player.total)
}

//Adjust Current Bet and Total By Clicking Betting Buttons
function changeBet(){
  $('#plus-five-button').on('click', function(){
    blackjack.addBet(5);
    displayBets();
  })

  $('#minus-five-button').on('click', function(){
    blackjack.subtractBet(5);
    displayBets();
  })
}
  
//Clear Cards and Text from Display
function resetCards(){
  $('.container-dealer .row').html("");
  $('.container-player .row').html("")
  $('#victory').text("")
}

//Unblock Deal Button and Bet Buttons, Block Hit and Stand Buttons
function buttonsStartDeal(){
  $('#hit-button').addClass('blocked');
  $('#stand-button').addClass('blocked');
  $('#deal-button').removeClass('blocked');
  $('#plus-five-button').removeClass('blocked');
  $('#minus-five-button').removeClass('blocked');
}

//Block Deal Button and Bet Buttons, Unblock Hit and Stand buttons
function buttonsAfterDeal(){
  $('#hit-button').removeClass('blocked');
  $('#stand-button').removeClass('blocked');
  $('#deal-button').addClass('blocked');
  $('#plus-five-button').addClass('blocked');
  $('#minus-five-button').addClass('blocked');
}

function buttonsEnd(){
  $('#deal-button').addClass('blocked');
  $('#plus-five-button').addClass('blocked');
  $('#minus-five-button').addClass('blocked')
}
//Ends Game if Player Has $0
function endGame(){
  if(blackjack.player.total < 5){
    $('#victory').text('GAME OVER')
    buttonsEnd();
    // console.log('yes!')
  }

}

