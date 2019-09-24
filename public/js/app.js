
// This is the simulated database, an array that holds all of our objects, with all their key-value pairs.

var pokemonsDB = [
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
  ]

// Gamestate, states what pokemon is present.

var gameState = {
  userPokemon: '',
  rivalPokemon: ''
}

// We pokemonsEl represents the elements with the classname "character", within the class "select-screen".

var pokemonsEl = document.querySelector('.select-screen').querySelectorAll('.character');

// This console.log gives us a chance to look at what elements we have selected.

console.log(pokemonsEl);

// Another way to grab an element, in this case we are selecting the element with the ID "battle-screen".

var battleScreenEl = document.getElementById('battle-screen');

var i = 0;

// Our first loop.

while (i < pokemonsEl.length ) {

  // Adds a function that is activated when we click on any of the elements.

  pokemonsEl[i].onclick = function() {
    // var pokemonName is assigned the pokemon's name from a value within the HTML attribute "data-pokemon".
    var pokemonName = this.dataset.pokemon;

    // console.log(pokemonName + ', I choose you!')

    var player1Img = document.querySelector('.player1').getElementsByTagName('img')

    // Above variable lets us select the img inside the element with the class name "player1".

    // Below variable player2Img lets us select the img inside the element with the class name "player2".

    var player2Img = document.querySelector('.player2').getElementsByTagName('img');

    // We save the pokemon's name to the gamestate with this declaration.

    gameState.userPokemon = pokemonName;

    // The computer assigns a random pokemon to the gameState object with "cpuPick();".

    cpuPick();

    // Changes the screen to the battle screen by changing the position of the background.

    battleScreenEl.classList.toggle('active');

    // From the inside to to the outside: the string at "pokemon.name" is returned if it is equal to the string at "gameState.userPokemon". The returned string at "pokemon.name" via filter(), so a new array is created inside pokemonsDB. This value will be assigned as currentPokemon.

    var currentPokemon = pokemonsDB.filter(function(pokemon){
      return pokemon.name == gameState.userPokemon
    });

    // This assignment changes the value of the image.

    player1Img[0].src = currentPokemon[0].img;

    // The same process is carried out as it was with the currentPokemon variable.

    var currentRivalPokemon = pokemonsDB.filter(function(pokemon){
      return pokemon.name == gameState.rivalPokemon
    });

    // Changes values of image.

    player2Img[0].src = currentRivalPokemon[0].img;

    console.log(currentPokemon);
  }
  i++
}

// Function randomNumber was a solution that I Stackoverflow'ed to be able to generate a random number.

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Here we are putting parameters into the "randomNumber()" function where the rival could be picked from any of the first, second, or third attributes within the HTML elements that we have selected earlier, which exist as an array.

function cpuPick() {
  gameState.rivalPokemon = pokemonsEl[randomNumber(0, 3)].dataset.pokemon
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
  
  