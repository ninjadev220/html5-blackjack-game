
//BlackjackGame Object
var BlackjackGame = function (){

    this.deck = [] 
    this.player = {
      name: "Player",
      id: 'player',
      cards: [],
      sum: 0,
      total: 200,
      currentBet: 5
    }
    this.dealer = {
      name: "Dealer",
      id: 'dealer',
      cards: [],
      sum: 0
    }
    }

//Function to Make Deck
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
  
  //Display the Sums of the Player's Hand and the Dealer's Hand
  displaySums();

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
    //Add Bet and A Half to Player Total
    this.checkBet('blackjack');
    displayWinner(this.player, "blackjack");
     
  }
    //If Dealer Has Blackjack, Display Dealer Wins
  else if(this.player.sum < 21 && this.dealer.sum === 21){
      showHiddenDealerCard();
      displayWinner(this.dealer, "blackjack")
      buttonsStartDeal();
  }
   //If Dealer and Player Has Blackjack, Display Push
  else if(this.player.sum ===21 && this.dealer.sum ===21){
    showHiddenDealerCard();
    displayWinner('push')
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

 //Display values on the Screen
 displaySums();
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
    // Display Dealer Busts
    displayWinner(this.dealer, "bust")
    //Show hidden Dealer Card
    showHiddenDealerCard();

    //Add Bet To Player
    this.checkBet(this.player)
  }
  //If Player Busts, Dealer Wins  - && this.player.sumLowAce > 21
  else if(person = this.player && this.player.sum > 21){
     //Display Player Busts
    displayWinner(this.player, "bust")
    
    //Show hidden Dealer Card
     showHiddenDealerCard();

     //Subtract Bet From Player
     this.checkBet(this.dealer)
  }

  //if ace in hand and person.cards sum > 21
  // {sum -10}
}

//Initiated by Stand Button
//Check sum of dealer cards against player cards. Initiate proper result.
BlackjackGame.prototype.compareSums = function(){
  //If Dealer Hand is Less Than 17, Hit
    if (this.dealer.sum < 17){
        this.dealerHit();
    }
    //If Dealer Hand is Lesser Than Player Hand and Greater than or equal to 17, Player Wins
    else if(this.player.sum > this.dealer.sum && this.dealer.sum > 16  ){
        return displayWinner(this.player);
    } //If Dealer Hand is Greater Than Player Hand and Greater than or equal to 17, Dealer Wins
    else if(this.player.sum < this.dealer.sum && this.dealer.sum > 16 && this.dealer.sum < 22){
      return displayWinner(this.dealer);
    } //If Dealer Hand is Equal to Player Hand and Greater than or equal to 17, Push
    else if(this.player.sum === this.dealer.sum && this.dealer.sum > 16 ){
        return displayWinner('push');
    }
  console.log(this.dealer.sum)
}

//Add to Current Bet
BlackjackGame.prototype.addBet = function(dollars){
	if( this.player.currentBet + dollars <= this.player.total){
  this.player.currentBet += dollars;
}
else{
  return "You bet more than you have!"
}
}

// Subtract from Current Bet
BlackjackGame.prototype.subtractBet = function(dollars){
	if(this.player.currentBet - dollars >= 5){
  this.player.currentBet -= dollars
}
  else{
    return "Minimum Bet is Five!"
  }
}

  //Checks who won the hand and adds/subtracts Player's total winnings accordingly
  BlackjackGame.prototype.checkBet= function(person){
    switch(person){
    case this.player:
      this.player.total += ((this.player.currentBet) * 2);
      displayBets();
    break;
    
    case this.dealer:
    displayBets();
      break;

    case 'blackjack':
      this.player.total += ((this.player.currentBet) * 2);
      this.player.total += parseFloat(((this.player.currentBet) / 2).toFixed(2));
      displayBets();
      break;

    case 'push':
      this.player.total += this.player.currentBet
      displayBets();
    }
  }

    //Close Bets, Attached to Deal Button
    BlackjackGame.prototype.initializeBet = function(person){
      if(this.player.total > 0){
      this.player.total -= this.player.currentBet;
        displayBets();
      }
  }

// BlackjackGame.prototype.checkForAces = function(person){
//       this.person.cards.forEach(function(card){
//         var index = (card.img.length)-1;  
//         if(card.img.charAt(index) === 'A'){
//             return true
//         }
//         else{
//           return false
//         }
//       })
// }

//Reset Sums and Cards for New Hand
BlackjackGame.prototype.reset = function(){
  this.player.sum = 0;
  this.dealer.sum = 0;
  this.player.cards =[];
  this.dealer.cards =[];
  this.deck=[];
  this.initializeBet();
  //From main.js, Reset Cards on Display to Empty to Prepare For Next Deal
  resetCards();
}




      
      

