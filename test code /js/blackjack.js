
  
var BlackjackGame = function (){

    this.deck = [] 
    this.player = {
      name: "Player",
      id: 'player',
      cards: [],
      sum: 0,
      total: 100
    }
    this.dealer = {
      name: "Dealer",
      id: 'dealer',
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
      this.deck.push({value: i, suit: suit, img: suit + '_' + i.toString()})
      }
      else if(i === 11){
        this.deck.push({value: 10, suit: suit, img: suit + '_' + "J"})
      }
      else if(i === 12){
        this.deck.push({value: 10, suit: suit, img: suit + '_' + "Q"})
      }
      else if(i === 13){
        this.deck.push({value: 10, suit: suit, img: suit + '_' + "K"})
      }
      else if(i === 14){
        this.deck.push({value: 11, suit: suit, img: suit + '_' + "A"})
      }
    }
  }
}


////Give Player two cards face up, give dealer one card face up, one face down. 
//Add sum of cards for both players
//Triggered by Deal Button
BlackjackGame.prototype.deal = function(){
  //Initialize Cards and Sums to [] and 0
  this.reset();
    //Make New Deck
  this.makeDeck();
  //Deal Two Cards One at a Time
  this.dealACard(this.player);
  this.dealACard(this.dealer);
  this.dealACard(this.player);
  this.dealACard(this.dealer);
  //Check Player and Dealer Hands for Blackjack. Respond Accordingly
  this.checkForBlackjack();
  console.log(this.player.sum, this.dealer.sum)
;
}

//Function for Dealing a Card. Who=Player or Dealer. Cards = # of Cards to deal
BlackjackGame.prototype.dealACard= function(person){
  //Randomly choose a card
  var index = Math.floor((Math.random() * this.deck.length));
  person.cards.push(this.deck[index]);
  //Add value of Card to Sum
  person.sum += this.deck[index].value;
   //Remove Card from the Deck
  this.deck.splice(index, 1);
  //Display Card function from main.js.
  displayCard(person, (person.cards.length-1));
// }
}

//Check both hands for blackjack. Display player wins, dealer wins, push. Deal new Hand.
BlackjackGame.prototype.checkForBlackjack = function(){
  //If Player Has Blackjack, Display Player Wins
  if (this.player.sum === 21 && this.dealer.sum < 21){
    showHiddenDealerCard();
    this.winner(this.player, "blackjack");
  }
    //If Dealer Has Blackjack, Display Dealer Wins
  else if(this.player.sum < 21 && this.dealer.sum === 21){
      showHiddenDealerCard();
      this.winner(this.dealer, "blackjack")
  }
   //If Dealer and Player Has Blackjack, Display Push
  else if(this.player.sum ===21 && this.dealer.sum ===21){
    showHiddenDealerCard();
    this.winner('push')
  }
  else{
    console.log("No Blackjack")
  }
}

//Connect to Hit button. Adds a card to Player's Hand, Checks For Bust.
BlackjackGame.prototype.playerHit= function(){
 this.dealACard(this.player);
  //Check for Bust
 this.checkForBust(this.player);
 console.log(this.player.sum)
}

//Adds a card to Dealer's Hand. Check for Bust.
BlackjackGame.prototype.dealerHit= function(){
  this.dealACard(this.dealer);
  //Check for Bust
  this.checkForBust(this.dealer)
  //Else Check Sum of Dealer's Hand with Player's Hand Again
  this.compareSums();
}

BlackjackGame.prototype.checkForBust = function(person){
 //If Dealer Busts, Player Wins
  if(person = this.dealer && this.dealer.sum > 21)
  {
    this.winner(this.player)
    //Show hidden Dealer Card
    showHiddenDealerCard();
    return true
  }
  //If Player Busts, Dealer Wins
  else if(person = this.player && this.player.sum > 21){
     //To Signal Display Change, Return True
    this.winner(this.dealer)
     //Show hidden Dealer Card
     showHiddenDealerCard();
    return true
  }

}

//Initiated by Stand Button
//Check sum of dealer cards against player cards. Initiate proper result.
BlackjackGame.prototype.compareSums = function(){
  //If Dealer Hand is Less Than 17, Hit
    if (this.dealer.sum < 17){
        this.dealerHit();
    }
    //If Dealer Hand is Lesser Than Player Hand and Greater than or equal to 17, Player Wins
    else if(this.player.sum > this.dealer.sum && this.dealer.sum > 16 ){
        return this.winner(this.player);
    } //If Dealer Hand is Greater Than Player Hand and Greater than or equal to 17, Dealer Wins
    else if(this.player.sum < this.dealer.sum && this.dealer.sum > 16 ){
      return this.winner(this.dealer);
    } //If Dealer Hand is Equal to Player Hand and Greater than or equal to 17, Push
    else if(this.player.sum === this.dealer.sum && this.dealer.sum > 16 ){
        return this.winner('push');
    }
  console.log(this.dealer.sum)
}
 
//Result of Player winning
BlackjackGame.prototype.winner = function(person, blackjack){
  //If Push, Display Push
  if(person === 'push'){
    console.log('Push!');
  }
  else if(blackjack === "blackjack"){
    console.log(person.name + " has Blackjack!")
  }
  else{
  //Display winner
  console.log(person.name + " wins!");
}
}

//Reset Sums and Cards for New Hand
BlackjackGame.prototype.reset = function(){
  this.player.sum = 0;
  this.dealer.sum = 0;
  this.player.cards =[];
  this.dealer.cards =[];
  this.deck=[];
  //From main.js, Reset Cards on Display to Empty to Prepare For Next Deal
  resetCards();
}



      
      

