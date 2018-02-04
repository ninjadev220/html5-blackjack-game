window.onload = function(){
  
  document.getElementById('start-button').onclick = function(){
  alert("Hello World");}
}

var BlackjackGame = function (){
    this.total = 100
    this.deck = [] 
    this.player = {
      cards: [],
      sum: 0
    }
    this.dealer = {
      cards: [],
      sum: 0
    }
    }


//Try forEach, map, etc.
  BlackjackGame.prototype.makeDeck = function(){
    var suit = 'heart'
    
    for(j=0; j<4; j++){
    if (j===1){
      suit ='diamond';
    }
    else if(j===2){
      suit = 'spade'
    }
    else if(j===3){
      suit = 'club'
    }

    for(i=2; i < 16; i++){
      if (i < 11){
      this.deck.push({value: i.toString(), suit: suit})
      }
      else if(i === 11){
        this.deck.push({value: 'Jack', suit: suit})
      }
      else if(i === 12){
        this.deck.push({value: 'Queen', suit: suit})
      }
      else if(i === 13){
        this.deck.push({value: 'King', suit: suit})
      }
      else if(i === 14){
        this.deck.push({value: 'Ace', suit: suit})
      }
    }
  }
  
}

////Give Player two cards face up, give dealer one card face up, one face down. 
//Add sum of cards for both players
BlackjackGame.prototype.deal = function(){
  dealCards(this.player, 2);
  dealCards(this.dealer, 2);
  console.log(this.player, this.dealer);
}

//Function for Dealing a Card. Who=Player or Dealer. Cards = # of Cards to deal
BlackjackGame.prototype.dealCards = function(who , numberOfCards){
  for(i=0; i< numberOfCards; i++){
  var index = Math.floor((Math.random() * this.deck.length));
  who.cards.push(this.deck[index]);
  this.deck.splice(index, 1);
}
}

//Check both hands for blackjack. Display player wins, dealer wins, push. Deal new Hand.
BlackjackGame.prototype.checkForBlackjack = function(){}

//Connect to Hit button. Adds a card to this.player.cards
BlackjackGame.prototype.playerHit= function(){}

//Connect to Stand button. Trigger check Sums and Flip Over Dealer Card.
BlackjackGame.prototype.playerStand = function(){}


BlackjackGame.prototype.dealerHit= function(){}

//Connect to Stand button. Trigger check Sums and Flip Over Dealer Card.
BlackjackGame.prototype.dealerStand = function(){}

//Check for bust
BlackjackGame.prototype.checkForBust = function(){}

//Check sum of cards in hand
BlackjackGame.prototype.checkSums = function(){}

//Result of Player winning
BlackjackGame.prototype.playerWins = function(){}

//Result of Dealer Winning
BlackjackGame.prototype.dealerWins = function(){}


document.getElementById('player-card-1').innerHTML="7"
      
      

