
//BlackjackGame Object
var BlackjackGame = function (){

    this.deck = [] 
    this.player = {
      name: "Player",
      id: 'player',
      cards: [],
      sum: 0,
      total: 200,
      currentBet: 5,
      aces: []
    }
    this.dealer = {
      name: "Dealer",
      id: 'dealer',
      cards: [],
      sum: 0,
      aces: []
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
  var interval = 300;
  var that = this;
  this.dealACard(this.player);
  window.setTimeout(function(){that.dealACard(that.dealer)}, interval)
  window.setTimeout(function(){that.dealACard(that.player)}, interval * 2)
  window.setTimeout(function(){that.dealACard(that.dealer)}, interval * 3)
  // this.dealACard(this.dealer);
  // this.dealACard(this.player);
  // this.dealACard(this.dealer);

  //Display the Sums of the Player's Hand and the Dealer's Hand
  window.setTimeout(function(){displaySums()}, interval * 4.5) 

  //Check Player and Dealer Hands for Blackjack. Respond Accordingly
  window.setTimeout(function(){ that.checkForBlackjack();}, interval * 5)
 
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

  //Add Values to Aces Array to Calculature Sum With Ace
  this.addValuesArray(person, index);
  
  //Adjusts Sum For Aces
  this.aceLogic(person);

  //Remove Card from the Deck
  this.deck.splice(index, 1);
  
  //Display Card function from main.js.
  displayCard(person, (person.cards.length-1));
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

//Check both hands for blackjack. Display player wins, dealer wins, push. Deal new Hand.
BlackjackGame.prototype.checkForBlackjack = function(){
  //If Player Has Blackjack, Display Player Wins
  if (this.player.sum === 21 && this.dealer.sum < 21){
    showHiddenDealerCard();
    //Add Bet and A Half to Player Total
    // this.checkBet('blackjack');
    displayWinner(this.player, "blackjack");
    return true
  }
    //If Dealer Has Blackjack, Display Dealer Wins
  else if(this.player.sum < 21 && this.dealer.sum === 21){
      
    showHiddenDealerCard();
      
    displayWinner(this.dealer, "blackjack")

    return true
  }
   //If Dealer and Player Has Blackjack, Display Push
  else if(this.player.sum ===21 && this.dealer.sum ===21){
    
    showHiddenDealerCard();
    
    displayWinner('push')

    return true
  }
  else{
    console.log("No Blackjack")
  }
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
}


//Check sum of dealer cards against player cards. Initiate proper result.
BlackjackGame.prototype.compareSums = function(){
  //If Dealer Hand is Less Than 17, Hit
    if (this.dealer.sum < 17){
    //  var interval = 700
    //   var that = this
    //   window.setTimeout(function(){that.dealerHit()}, interval)
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
  BlackjackGame.prototype.checkBet= function(person, string){
    if(person === this.player && string === 'blackjack'){
      this.player.total += ((this.player.currentBet) * 2);
      this.player.total += parseFloat(((this.player.currentBet) / 2).toFixed(2));
        displayBets();
        return true
    }
    
    switch(person){
    case this.player:
      this.player.total += ((this.player.currentBet) * 2);
      displayBets();
    break;
    
    case this.dealer:
    displayBets();
      break;
    // Adds A Bet Plus Half A Bet
    case 'push':
      this.player.total += this.player.currentBet
      displayBets();
    }
  }
    
 //Close Bets, Attached to Deal Button
BlackjackGame.prototype.initializeBet = function(){
      if(this.player.total > 0){
      this.player.total -= this.player.currentBet;
        displayBets();
      }
  }

  
BlackjackGame.prototype.addValuesArray = function(who, number){
            who.aces.push(this.deck[number].value)
     
}

//Determines What Value of an Ace Should Be and Adjusts Appropriately
BlackjackGame.prototype.aceLogic = function(person){
      var total = person.aces.reduce(function(total, current){
      return total + current;
  })
     if(person.aces.indexOf(11) !== -1){
      console.log('A!');    
      if(total > 21){
            person.aces[person.aces.indexOf(11)] = 1;
            var lowTotal =person.aces.reduce(function(total, current){
              return total + current;
          })
            person.sum = lowTotal
          }
      }
    }


//Reset Sums and Cards for New Hand
BlackjackGame.prototype.reset = function(){
  this.player.sum = 0;
  this.dealer.sum = 0;
  this.player.cards =[];
  this.dealer.cards =[];
  this.player.aces =[];
  this.dealer.aces =[];
  this.deck=[];
  this.initializeBet();

  //From main.js, Reset Cards on Display to Empty to Prepare For Next Deal
  resetCards();
}



      
      

