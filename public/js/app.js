
// Gamestate, holds the information about the pokemon throughout the session.

var gameState = {
  userPokemon: '',
  rivalPokemon: '',
  pokemonDB: [
    {
      name: 'Charmander',
      type: 'fire',
      hp: 39,
      attack: 52,
      defense: 43,
      level: 1,
      img: "http://www.smogon.com/dex/media/sprites/xy/charmander.gif"
    },
    {
      name: 'Bulbasaur',
      type: 'grass',
      hp: 45,
      attack: 49,
      defense: 40,
      level: 1,
      img: "http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif"
    },
    {
      name: 'Squirtle',
      type: 'water',
      hp: 44,
      attack: 48,
      defense: 65,
      level: 1,
      img: "http://www.smogon.com/dex/media/sprites/xy/squirtle.gif"
    },
    elements: {
      // pokemonsEl represents the elements with the classname "character", within the class "select-screen".

      pokemonsEl: document.querySelector('.select-screen').querySelectorAll('.character')

      // Another way to grab an element, in this case we are selecting the element with the ID "battle-screen".

      battleScreenEl: document.getElementById('battle-screen')

      // var attackBtnsEl is how we are going to grab all of the child elements with the class name "attack" under element with the class name "battle-screen".

      attackBtnsEl: document.getElementById('battle-screen').querySelectorAll('.attack')
    }
  ]
}









// Below should print an array that has a length of 3, which represents our three elements that we are selecting.

// console.log(attackBtnsEl.length);

// We have to declare a variable that will act as our counter, independently of var i, which is a few lines down.

var a = 0;

while (a < attackBtnsEl.length) {
  attackBtnsEl[a].onclick = function() {
    // var attackName selects the data attribute within the child element.
    var attackName =  this.dataset.attack
    // We add "currentUserAttack as an key value to our gameState object above."
    gameState.currentUserAttack = attackName
    
    play(attackName, cpuAttack)
  }
  a++
}

var cpuAttack = function(){
  var attacks = ['rock', 'paper', 'scissors']

  return attacks[randomNumber(0,3)]
}

// calculateInitialHealh is the square root of the pokemon's level, multiplied by the defense, hitpoints, then it is reduced to 80% of its original value.

var calculateInitialHealth = function(user){
  return ((0.20 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp
}

// attackMove represents the player's attack against the CPU.

var attackMove = function(attack, level, stack, critical, enemy, attacker) {
  console.log(enemy.name +"'s health before the attack is " + enemy.health + " points.")
  var attackAmount = ((attack * level ) * (stack + critical))
  // You have to assign a new value to "enemy.health". We can't just use "enemy.health - attackAmount" because that does not change our enemy's health after an attack.
  enemy.health = enemy.health - attackAmount
  checkWinner(enemy, attacker)
  console.log(enemy.name +"'s health after the attack is " + enemy.health + " points.")
}

var checkWinner = function(enemy, attacker) {
  if (enemy.health <= 0) {
    console.log("The winner is " + attacker.name + "!")
  }
  
}

// 

var play = function(userAttack, cpuAttack){
  var currentPokemon = gameState.currentPokemon[0]
  var currentRivalPokemon = gameState.currentRivalPokemon[0]

  switch(userAttack) {
    case 'rock':
      if(cpuAttack() == 'paper'){
        if(currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
          // User Attack
          attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 0.50, currentRivalPokemon, currentPokemon)
          if (currentRivalPokemon.health >= 1) {
            // CPU Attack
            attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 2.00, currentPokemon, currentRivalPokemon)
            console.log("Paper beats rock. The CPU's attack is more effective.")
          }
        }
      }
      if(cpuAttack() == 'scissors'){
        if(currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
          // User Attack
          attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 2.00, currentRivalPokemon, currentPokemon)
          if (currentRivalPokemon.health >= 1) {
            // CPU Attack
            attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 0.50, currentPokemon, currentRivalPokemon)
            console.log("Rock beats scissors. Your attack is more effective.")
          }
        }
      }
      if(cpuAttack() == 'rock'){
        if(currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
          // User Attack
          attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 0.10, currentRivalPokemon, currentPokemon)
          if (currentRivalPokemon.health >= 1) {
            // CPU Attack
            attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 0.10, currentPokemon, currentRivalPokemon)
            console.log("Rock collides with rock. Both of you hit each other, resulting in a draw.")
          }
        }
      }
      // console.log("CPU's attack was " + cpuAttack() + ".")
      // console.log("Your attack was " + userAttack + ".")
      break;
    case 'paper':
        if(cpuAttack() == 'paper'){
            if(currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 0.10, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 0.10, currentPokemon, currentRivalPokemon)
              console.log("Both sheets of paper bend awkardly when they collide, with both of you having terrible paper cuts, resulting in a draw.")
            }
          }
        }
        if(cpuAttack() == 'scissors'){
          if(currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 0.50, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 2.00, currentPokemon, currentRivalPokemon)
              console.log("Your sheet of paper is cut by scissors. The CPU's attack is more effective.")
            }
          }
        }
        if(cpuAttack() == 'rock'){
          if(currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 2.00, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 0.50, currentPokemon, currentRivalPokemon)
              console.log("Paper covers rock. Your attack is more effective.")
            }
          }
        }
        // console.log("CPU's attack was " + cpuAttack() + ".")
        // console.log("Your attack was " + userAttack + ".")
      break;
    case 'scissors':
        if(cpuAttack() == 'paper'){
          if(currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 2.00, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 0.50, currentPokemon, currentRivalPokemon)
              console.log("Scissors cut through the CPU's paper defenses. Your attack is more effective.")
            }
          }
        }
        if(cpuAttack() == 'scissors'){
          if(currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 0.10, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 0.10, currentPokemon, currentRivalPokemon)
              console.log("Your scissors collides clumsily with the CPU's own pair. Resulting in a draw.")
            }
          }
        }
        if(cpuAttack() == 'rock'){
          if(currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 0.50, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 2.00, currentPokemon, currentRivalPokemon)
              console.log("Your scissors are crushed by the CPU's rock. The CPU's attack is more effective.")
            }
          }
        }
        // console.log("CPU's attack was " + cpuAttack() + ".")
        // console.log("Your attack was " + userAttack + ".")
  }
}

// The "var i = 0;" is our "integer", it functions as a counter that lets us iterate through the functions/elements.

var i = 0;

// Our first loop, that runs on however many elements are within the var "pokemonsEl" (which is an array of HTML elements).

while (i < gameState.elements.pokemonsEl.length ) {

  // Adds a function that is activated when we click on any of the elements that are represented by gameState.elements.pokemonsEl.

  gameState.elements.pokemonsEl[i].onclick = function() {

    // var pokemonName is assigned the pokemon's name from a value within the HTML attribute "data-pokemon".
    
    var pokemonName = this.dataset.pokemon;

    // console.log(pokemonName + ', I choose you!')

    // Declaration of variable player1Img lets us select the img inside the element with the class name "player1".

    var player1Img = document.querySelector('.player1').getElementsByTagName('img')

    // Below variable player2Img lets us select the img inside the element with the class name "player2".

    var player2Img = document.querySelector('.player2').getElementsByTagName('img');

    // We save the pokemon's name to the gamestate with this declaration.

    gameState.userPokemon = pokemonName;

    // The computer assigns a random pokemon to the gameState object with "cpuPick();".

    cpuPick();

    // Changes the screen to the battle screen by changing the position of the background.

    battleScreenEl.classList.toggle('active');

    // From the inside to to the outside: the string at "pokemon.name" is returned if it is equal to the string at "gameState.userPokemon". The returned string at "pokemon.name" via filter(), so a new array is created inside gameState.pokemonDB. This value will be assigned as currentPokemon inside the gameState object.

    gameState.currentPokemon = gameState.pokemonDB.filter(function(pokemon){
      return pokemon.name == gameState.userPokemon
    });

    // This assignment changes the value of the image inside the gameState object.

    player1Img[0].src = gameState.currentPokemon[0].img;

    // The same process is carried out as it was with the currentPokemon inside the gameState object.

    gameState.currentRivalPokemon = gameState.pokemonDB.filter(function(pokemon){
      return pokemon.name == gameState.rivalPokemon
    });

    // Changes values of image.

    player2Img[0].src = gameState.currentRivalPokemon[0].img;

    // By selected currentPokemon[0], instead of just currentPokemon, the health attribute will land inside the array within currentPokemon, instead of "next to" the array of key:value pairs within the currentPokemon object.

    gameState.currentPokemon[0].health = calculateInitialHealth(gameState.currentPokemon)

    // Doing the same thing for the CPU.

    gameState.currentRivalPokemon[0].health = calculateInitialHealth(gameState.currentRivalPokemon)


    console.log(gameState)
  }
  i++
}

// Function randomNumber was a solution that I Stackoverflow'ed to be able to generate a random number.

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Here we are putting parameters into the "randomNumber()" function where the rival could be picked from any of the first, second, or third attributes within the HTML elements that we have selected earlier, which exist as an array.

function cpuPick() {
  gameState.rivalPokemon = gameState.elements.pokemonsEl[randomNumber(0, 3)].dataset.pokemon
}

























  
  
//   var attack = 20;
//   var level = 10;
//   var stack = 1.3;
//   var defense = 39;
  
//   // create a formula for attacks
//   console.log((attack * level ) * stack / 7)
  
  
  
//   // create a formula for health
//   //HP = 0.20 x Sqrt(Pokemon_level) x (HP_base_stat)
//   console.log(((0.20 * Math.sqrt(level)) * defense) * 15)
  
  
  
  
//   // let user choose 1 and then assign a random pokemon to battle thats not the users pokemon
//   // p1 vs p2
  
  
  
  
//   // when one user loses all his health declare a winner
  
  