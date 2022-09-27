// KroCharon's BlackJack.js

const prompt = require("prompt-sync")();

function getRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

function getRoyal() {
  let preSelect = getRandomInteger(3);

  if (preSelect == 0) {
    royal = "Jack";
  }
  if (preSelect == 1) {
    royal = "Queen";
  }
  if (preSelect == 2) {
    royal = "King";
  }
  return royal;
}

function addToHand(arr) {
  let temp = drawACard();
  arr.push(temp);
}

function aceCheck(arr) {
  let aceFound = false;
  arr.forEach((element) => {
    if (element == "Ace") {
      aceFound = true;
    }
  });
  return aceFound;
}

function lineBreak() {
  console.log("- - - - - - - - - - - - -");
}

function fancyLineBreak() {
  console.log(`~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~`);
}

function playerTurnMsg() {
  fancyLineBreak();
  console.log("Player turn: would you like to hit [1] <or> stay [2]");
}

function dealerTurnMsg() {
  console.log("Dealer turn: would you like to hit [1] <or> stay [2]");
}

function bust() {
  console.log("You went over! BUST!");
}

function playerInfo(arr) {
  let pI = addTotal(arr);
  fancyLineBreak();
  console.log("Player drew: [ " + arr + " ]");
  fancyLineBreak();
  console.log("Player's hand totals: " + "< " + pI + " >");
  return pI;
}

function dealerInfo(arr) {
  let dI = addTotal(arr);
  fancyLineBreak();
  console.log("Dealer drew: [ " + arr[0] + ", {?}" + " ]");
  //fancyLineBreak();
  //console.log("Dealer's hand totals: " + "< " + dI + " >");
  return dI;
}

function drawACard() {
  let preCard = getRandomInteger(14); // 14, 1 for Ace testing
  let finalCard;
  if (preCard == 0) {
    finalCard = "Ace";
  } else if (preCard == 11 || preCard == 12 || preCard == 13) {
    finalCard = getRoyal();
  } else {
    finalCard = preCard;
  }
  return finalCard;
}

function addTotal(arr) {
  // There is a problem with some "Ace" cases. Requires more debugging.
  let total = 0;
  let ac = 0;

  arr.forEach((element) => {
    let count = 0;
    if (element == "Jack" || element == "Queen" || element == "King") {
      count = 10;
    } else if (element == "Ace") {
      count = 11;
      ac++;
    } else {
      count = element;
    }
    total += count;
  });

  // If the total exceeds 21, and you possess and ace, count Ace as a one.
  // Repeat for each Ace detected.
  // For each Ace that you have available,
  // provided you are over 21, you have the ability to
  // instead count it as a 1 (subtract 10)

  if (total > 21 && aceCheck(arr) == true) {
    for (i = 0; i < ac; i++) {
      if (total > 21) {
        total -= 10;
      }
    }
    // If you somehow manage to go over even with the Ace deduction,
    // eg. Jack + Jack + 4 Aces (44 - 40) = 22,
    // display an error and call Bust();

    if (total > 21) {
      bust();
    } else {
      console.log("You would have gone over, but an Ace was counted as one.");
      console.log("You had: " + ac + " total Ace(s)");
    }
  }
  return total;
}

function dealTable(array1, array2) {
  addToHand(array1); // One to Player,
  addToHand(array2); // One to Dealer,
  addToHand(array1); // One to Player,
  addToHand(array2); // One to Dealer.
  return array1, array2;
}

function compareHand(arr1, arr2) {
  if (arr1 > arr2) {
    console.log("<<< PLAYER WINS! >>>");
  } else if (arr2 > arr1) {
    console.log("<<< DEALER WINS! >>>!");
  } else if (arr1 == arr2) {
    console.log("<<< PUSH >>>");
  }
}

function earlyCheck(total) {
  let cont = true;
  if (total == 21) {
    cont = false;
  }
  return cont;
}

function tableSet(arr1, arr2, t1, t2) {
  let totArr = [];
  t1 = playerInfo(arr1);
  t2 = dealerInfo(arr2);
  totArr.push(t1, t2);
  return totArr;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - -
// Incorporate Line Spacing
// - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - -

function blackJack() {
  let gameOngoing = true;
  let keepPlay = true;
  let userCards = [];
  let userTotal;
  let dealerCards = [];
  let dealerTotal;

  let Info;
  let temp = 0;
  let fdi;

  dealTable(userCards, dealerCards);
  Info = tableSet(userCards, dealerCards, userTotal, dealerTotal);

  userTotal = Info[0];
  dealerTotal = Info[1];

  if (earlyCheck(userTotal) == false) {
    // Assuming we instantly compare hands.
    console.log("Player has BLACKJACK");
    compareHand(userTotal, dealerTotal);
    gameOngoing = false;
    keepPlay = false;
  } else if (earlyCheck(dealerTotal) == false) {
    console.log("DEALER has BLACKJACK");
    compareHand(userTotal, dealerTotal);
    gameOngoing = false;
    keepPlay = false;
  } else if (
    earlyCheck(userTotal) == false &&
    earlyCheck(dealerTotal) == false
  ) {
    console.log("PUSH - BOTH PLAYERS HAVE BLACKJACK");
    gameOngoing = false;
    keepPlay = false;
  }

  fancyLineBreak();

  while (keepPlay) {
    playerTurnMsg();
    stat = prompt("HIT [1] | STAY [2] : ");
    if (stat == 1) {
      fancyLineBreak();
      console.log("Player has chosen to [HIT]");
      addToHand(userCards);
      temp = playerInfo(userCards);
      userTotal = temp;
      if (temp == 21) {
        keepPlay = false;
        gameOngoing = false;
        console.log("<<< BLACKJACK! PLAYER WINS! >>>");
      }
      if (temp > 21) {
        keepPlay = false;
        gameOngoing = false;
        bust();
        console.log("<<< DEALER WINS! >>>");
      }
    } else if (stat == 2) {
      fancyLineBreak();
      keepPlay = false;
      console.log("Player has chosen to [STAY]");
      console.log("Player holds: [ " + userCards + " ]"); // Can be put into a function for both Player and Dealer.
      console.log("Value totals: " + "< " + userTotal + " >");
    }
  } // End of player turn.

  fdi = addTotal(dealerCards);
  fancyLineBreak();
  console.log("Dealer drew: [ " + dealerCards + " ]");
  fancyLineBreak();
  console.log("Dealer's hand totals: " + "< " + fdi + " >");

  while (gameOngoing) {
    if (dealerTotal >= 17) {
      // Condition does not need to account for over 21 since first hand held at time of executing.
      console.log("The Dealer chooses to [STAND]");
      compareHand(userTotal, dealerTotal);
      gameOngoing = false;
    } else if (dealerTotal < 17) {
      console.log("The Dealer chooses to [HIT]");
      addToHand(dealerCards);
      console.log("Dealer now holds: " + dealerCards);

      console.log(
        "Dealer's hand totals: " + "< " + addTotal(dealerCards) + " >"
      );

      dealerTotal = addTotal(dealerCards);

      if (addTotal(dealerCards) > 21) {
        bust();
        gameOngoing = false;
      }
    }
  }
}

blackJack();
