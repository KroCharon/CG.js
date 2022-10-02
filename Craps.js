//KroCharon's Craps.js

// Math.floor rounds down no matter what, so 3.6 => 3
// If we're going for a dice for example, pass 7 instead of 6.

function getRandomInteger(max) {
  return Math.floor(Math.random() * max);
}
function crapsSimulation() {
  rollout = 7; // 6 possible outcomes (for two dice), when floored
  let continuePlay = true;

  let point = 0;
  let once = true;

  while (continuePlay) {
    let roll1 = getRandomInteger(rollout);
    let roll2 = getRandomInteger(rollout);

    if (roll1 == 0) {
      // Don't know how to make math.random exclude zero, so just assume 1
      roll1 += 1;
    }
    if (roll2 == 0) {
      // Don't know how to make math.random exclude zero, so just assume 1
      roll2 += 1;
    }

    let sum = roll1 + roll2;

    console.log("You rolled " + roll1 + " + " + roll2 + " = " + sum);
    // If we rolled once already, 7 dictates a loss.
    if (((sum == 2 || sum == 3 || sum == 12) && once) || (sum == 7 && !once)) {
      console.log("Craps, Better Luck Next Time, You lose");
      continuePlay = false;
    }
    // If we haven't rolled yet, 7 grants a win.
    else if ((sum == 7 && once) || (sum == 11 && once) || sum == point) {
      console.log("Congratulations, You win");
      continuePlay = false;
      // The first time you roll and don't complete the game,
      // set the point, and output once (only).
      // You have no longer rolled once.
    } else {
      if (point == 0) {
        point = sum;
        once = false;
        console.log("Point is (established) set to " + point);
      }
    }
  }
}
// ^^
crapsSimulation();

//                Task 2:
//                This task is required to create Craps, which is a popular dice game played in casinos. You are
//                supposed to write a program to play a variation of the game, as follows:
//              • Roll two dice. (Each roll should produce two random numbers between 1 to 6)
//              • Each die has six faces representing values 1, 2, …, and 6, respectively.
//              • Check the sum of the two dice. If the sum is 2, 3, or 12 (your program should display
//                craps), you lose the game.
//              • If the sum of the two dice is 7 or 11 (your program should display naturals), you win the
//                game.
//              • If the sum of two dice is any value (i.e., 4, 5, 6, 8, 9, or 10), your program should establish
//                a point in the game (meaning store that sum). Continue to roll the dice until the sum is
//                either a 7 or the same point value which was established. If rolled sum is 7, you lose the
//                game. Otherwise, if the rolled sum is equal to established point you win.
//                Your program acts as a single player.
