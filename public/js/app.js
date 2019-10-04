
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
    }
  ],
  elements: {
    // pokemonsEl represents the elements with the classname "character", within the class "select-screen".

    pokemonsEl: document.querySelector('.select-screen').querySelectorAll('.character'),

    // Another way to grab an element, in this case we are selecting the element with the ID "battle-screen".

    battleScreenEl: document.getElementById('battle-screen'),

    // attackBtnsEl is how we are going to grab all of the child elements with the class name "attack" under element with the class name "battle-screen".

    attackBtnsEl: document.getElementById('battle-screen').querySelectorAll('.attack'),

    // Property that represents Game Over Screen.

    gameOverScreenEl : document.querySelector(".game-over-screen"),

    // Property that represents the select screen.

    selectionScreenEl : document.querySelector(".select-screen"),

    // Property that represents the image that is displayed of the winning Pokemon on the Game Over Screen.pokemon-portrait

    winnerPictureEl : document.querySelector(".pokemon-portrait").getElementsByTagName("img"),

    // Property that represents the text inside the "Pokemon Wins" Box

    innerWinnerBoxTextEl : document.querySelector(".inner-win"),

    yesBtnEl : document.querySelector(".yesBtn"),

    noBtnEl : document.querySelector(".noBtn"),

    //  Select Element for Player-chosen Pokemon

    playerPokemonNameEl : document.querySelector(".playerVsCpuArena").querySelector(".player1").querySelector(".name"),

    //  Select Element for CPU-chosen Pokemon

    cpuPokemonNameEl : document.querySelector(".playerVsCpuArena").querySelector(".player2").querySelector(".name"),

    // So we can have additional functionallity for "No I don't, button"

    questionPhrasebox : document.querySelector(".dialogue-box").querySelector(".question"),
  },
  init: function () {

    // We have to have a while loop to iterate over our elements for the game-over-page.

    var j = 0;

    

    // The "var i = 0;" is our "integer", it functions as a counter that lets us iterate through the functions/elements.

    var i = 0;

    // Our first loop, that runs on however many elements are within the var "pokemonsEl" (which is an array of HTML elements).

    while (i < gameState.elements.pokemonsEl.length) {

      // Adds a function that is activated when we click on any of the elements that are represented by gameState.elements.pokemonsEl.

      gameState.elements.pokemonsEl[i].onclick = function () {

        // var pokemonName is assigned the pokemon's name from a value within the HTML attribute "data-pokemon".

        var pokemonName = this.dataset.pokemon;

        // console.log(pokemonName + ', I choose you!')

        gameState.elements.playerPokemonNameEl.innerHTML = pokemonName

        // Declaration of variable player1Img lets us select the img inside the element with the class name "player1".

        gameState.elements.player1Img = document.querySelector(".player1").getElementsByTagName("img");

        // Below variable player2Img lets us select the img inside the element with the class name "player2".

        gameState.elements.player2Img = document.querySelector(".player2").getElementsByTagName("img");

        // We save the pokemon's name to the gamestate with this declaration.

        gameState.userPokemon = pokemonName;

        // The computer assigns a random pokemon to the property "cpuPick()" within the gameState object.

        gameState.cpuPick();

        // Changes the screen to the battle screen by changing the position of the background.

        gameState.elements.battleScreenEl.classList.toggle("active");

        // From the inside to to the outside: the string at "pokemon.name" is returned if it is equal to the string at "gameState.userPokemon". The returned string at "pokemon.name" via filter(), so a new array is created inside gameState.pokemonDB. This value will be assigned as currentPokemon inside the gameState object.

        gameState.currentPokemon = gameState.pokemonDB.filter(function (pokemon) {
          return pokemon.name == gameState.userPokemon
        })

        // This assignment changes the value of the image inside the gameState object.

        gameState.elements.player1Img[0].src = gameState.currentPokemon[0].img

        // The same process is carried out as it was with the currentPokemon inside the gameState object.

        gameState.currentRivalPokemon = gameState.pokemonDB.filter(function (pokemon) {
          return pokemon.name == gameState.rivalPokemon
        })

        // Changes values of image.

        gameState.elements.player2Img[0].src = gameState.currentRivalPokemon[0].img

        // By selected currentPokemon[0], instead of just currentPokemon, the health attribute will land inside the array within currentPokemon, instead of "next to" the array of key:value pairs within the currentPokemon object.

        gameState.currentPokemon[0].health = gameState.calculateInitialHealth(gameState.currentPokemon)

        gameState.currentPokemon[0].originalHealth = gameState.calculateInitialHealth(gameState.currentPokemon)

        // Doing the same thing for the CPU.

        gameState.currentRivalPokemon[0].health = gameState.calculateInitialHealth(gameState.currentRivalPokemon)

        gameState.currentRivalPokemon[0].originalHealth = gameState.calculateInitialHealth(gameState.currentRivalPokemon)

        gameState.elements.selectionScreenEl.classList.add("inactive")

        gameState.elements.battleScreenEl.classList.add("active")

        console.log(gameState)
      }
      i++
    }

    // We have to declare a variable that will act as our counter, independently of var i.

    var a = 0;

    while (a < gameState.elements.attackBtnsEl.length) {
      gameState.elements.attackBtnsEl[a].onclick = function () {
        // var attackName selects the data attribute within the child element.
        var attackName = this.dataset.attack
        // We add "currentUserAttack as an key value to our gameState object above."
        gameState.currentUserAttack = attackName

        gameState.play(attackName, gameState.cpuAttack())
      }
      a++
    }
  },
  cpuAttack: function () {
    var attacks = ['rock', 'paper', 'scissors']

    return attacks[gameState.randomNumber(0, 3)]
  },

  // calculateInitialHealh is the square root of the pokemon's level, multiplied by the defense, hitpoints, then it is reduced to 80% of its original value.

  calculateInitialHealth: function (user) {
    return ((0.20 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp
  },

  // attackMove represents the player's attack against the CPU.

  attackMove: function (attack, level, stack, critical, enemy, attacker) {
    console.log(enemy.name + "'s health before the attack is " + enemy.health + " points.")
    var attackAmount = ((attack * level) * (stack + critical))
    // You have to assign a new value to "enemy.health". We can't just use "enemy.health - attackAmount" because that does not change our enemy's health after an attack.
    enemy.health = enemy.health - attackAmount


    var userHP = document.querySelector('.player1').querySelector('.health-bar').querySelector('.inside')
    var cpuHP = document.querySelector('.player2').querySelector('.health-bar').querySelector('.inside')

    if (enemy.owner == 'user') {
      var minusPercent = ((enemy.health * 100) / enemy.originalHealth)
      userHP.style.width = ((minusPercent) < 0 ? 0 : minusPercent) + '%'
    } else {
      var minusPercent = ((enemy.health * 100) / enemy.originalHealth)
      cpuHP.style.width = ((minusPercent) < 0 ? 0 : minusPercent) + '%'
    }
    

    gameState.checkWinner(enemy, attacker)
    console.log(enemy.name + "'s health after the attack is " + enemy.health + " points.")
  },

  checkWinner: function (enemy, attacker) {
    if (enemy.health <= 0) {
      console.log("The winner is " + attacker.name + "!")
      gameState.elements.selectionScreenEl.classList.add("inactive")
      gameState.elements.battleScreenEl.classList.remove("active")
      gameState.elements.battleScreenEl.classList.add("game-over")
      gameState.elements.gameOverScreenEl.classList.add("active")
      if (attacker.name == "Charmander") {
        console.log("Charmander Won")
        gameState.elements.innerWinnerBoxTextEl.innerHTML = attacker.name + " wins!"
        gameState.elements.winnerPictureEl[0].src = "http://www.smogon.com/dex/media/sprites/xy/charmander.gif"
      } else if (attacker.name == "Squirtle") {
        console.log("Squirtle Won")
        gameState.elements.innerWinnerBoxTextEl.innerHTML = attacker.name + " wins!"
        gameState.elements.winnerPictureEl[0].src = "http://www.smogon.com/dex/media/sprites/xy/squirtle.gif"
      } else if (attacker.name == "Bulbasaur") {
        console.log("Bulbasaur Won")
        gameState.elements.innerWinnerBoxTextEl.innerHTML = attacker.name + " wins!"
        gameState.elements.winnerPictureEl[0].src = "http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif"
      } else {
        console.log("It's broken.")
      }
    }
  },
  // Property randomNumber was a solution that I Stackoverflow'ed to be able to generate a random number.

  randomNumber: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  },

  // Here we are putting parameters into the "randomNumber()" function where the rival could be picked from any of the first, second, or third attributes within the HTML elements that we have selected earlier, which exist as an array.

  cpuPick: function () {
    // This loop runs to prevent the CPU from picking the same pokemon as the player.
    do {
      gameState.rivalPokemon = gameState.elements.pokemonsEl[gameState.randomNumber(0, 3)].dataset.pokemon
      console.log("CPU tried to choose: " + gameState.rivalPokemon + ".")
      gameState.elements.cpuPokemonNameEl.innerHTML = gameState.rivalPokemon
    }
    while (
      gameState.userPokemon == gameState.rivalPokemon
    )
  },
  play: function (userAttack, cpuAttack) {
    var currentPokemon = gameState.currentPokemon[0]
    var currentRivalPokemon = gameState.currentRivalPokemon[0]
    currentPokemon.owner = 'user'
    currentRivalPokemon.owner = 'cpu'

    switch (userAttack) {
      case 'rock':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 0.50, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 2.00, currentPokemon, currentRivalPokemon)
              console.log("Paper beats rock. The CPU's attack is more effective.")
            }
          }
        }
        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 2.00, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 0.50, currentPokemon, currentRivalPokemon)
              console.log("Rock beats scissors. Your attack is more effective.")
            }
          }
        }
        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 0.10, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 0.10, currentPokemon, currentRivalPokemon)
              console.log("Rock collides with rock. Both of you hit each other, resulting in a draw.")
            }
          }
        }
        // console.log("CPU's attack was " + cpuAttack + ".")
        // console.log("Your attack was " + userAttack + ".")
        break;
      case 'paper':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 0.10, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 0.10, currentPokemon, currentRivalPokemon)
              console.log("Both sheets of paper bend awkardly when they collide, with both of you having terrible paper cuts, resulting in a draw.")
            }
          }
        }
        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 0.50, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 2.00, currentPokemon, currentRivalPokemon)
              console.log("Your sheet of paper is cut by scissors. The CPU's attack is more effective.")
            }
          }
        }
        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 2.00, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 0.50, currentPokemon, currentRivalPokemon)
              console.log("Paper covers rock. Your attack is more effective.")
            }
          }
        }
        // console.log("CPU's attack was " + cpuAttack + ".")
        // console.log("Your attack was " + userAttack + ".")
        break;
      case 'scissors':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 2.00, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 0.50, currentPokemon, currentRivalPokemon)
              console.log("Scissors cut through the CPU's paper defenses. Your attack is more effective.")
            }
          }
        }
        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 0.10, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 0.10, currentPokemon, currentRivalPokemon)
              console.log("Your scissors collides clumsily with the CPU's own pair. Resulting in a draw.")
            }
          }
        }
        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // User Attack
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, 0.80, 0.50, currentRivalPokemon, currentPokemon)
            if (currentRivalPokemon.health >= 1) {
              // CPU Attack
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.80, 2.00, currentPokemon, currentRivalPokemon)
              console.log("Your scissors are crushed by the CPU's rock. The CPU's attack is more effective.")
            }
          }
        }
      console.log("CPU's attack was " + cpuAttack + ".")
      console.log("Your attack was " + userAttack + ".")
    }
  }
};
gameState.init()

gameState.elements.yesBtnEl.onclick = function () {
  console.log("I work!")
  location.reload();
}

gameState.elements.noBtnEl.onclick = function () {
  console.log("Thank you for playing!")
  // gameState.elements.questionPhrasebox.innerHTML = "Where would you like to go?"
  // gameState.elements.yesBtnEl.style.width = "292px"
  // gameState.elements.yesBtnEl.innerHTML = "Portfolio"
  gameState.elements.noBtnEl.innerHTML = "Thank you for playing!"
  gameState.elements.yesBtnEl.classList.add("in-active")
}