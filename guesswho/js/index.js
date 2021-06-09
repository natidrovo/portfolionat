const characters = [{
    name: "tim",
    gender: "man",
    hair: "bald",
    beard: false,
    glasses: true,
    skin: "black",
    img: 'tim.svg',
    visibility: true,
  },
  {
    name: "maria",
    gender: "woman",
    hair: "blonde",
    beard: false,
    glasses: true,
    skin: "white",
    img: 'maria.svg',
    visibility: true,
  },
  {
    name: "luca",
    gender: "man",
    hair: "darkbrown",
    beard: false,
    glasses: false,
    skin: "white",
    img: 'luca.svg',
    visibility: true,
  },
  {
    name: "elena",
    gender: "woman",
    hair: "darkbrown",
    beard: false,
    glasses: false,
    skin: "brown",
    img: 'elena.svg',
    visibility: true,
  },
  {
    name: "liza",
    gender: "woman",
    hair: "darkbrown",
    beard: false,
    glasses: false,
    skin: "black",
    img: 'liza.svg',
    visibility: true,
  },
  {
    name: "john",
    gender: "man",
    hair: "brown",
    glasses: true,
    beard: true,
    skin: "white",
    img: 'john.svg',
    visibility: true,
  },
  {
    name: "lucie",
    gender: "woman",
    hair: "red",
    beard: false,
    glasses: true,
    skin: "white",
    img: 'lucie.svg',
    visibility: true,
  },
  {
    name: "marta",
    gender: "woman",
    hair: "blonde",
    glasses: false,
    beard: false,
    skin: "white",
    img: 'marta.svg',
    visibility: true,

  },
  {
    name: "mario",
    gender: "man",
    hair: "bald",
    glasses: false,
    beard: true,
    skin: "white",
    img: 'mario.svg',
    visibility: true,
  },
  {
    name: "chris",
    gender: "man",
    hair: "blonde",
    glasses: true,
    beard: true,
    skin: "white",
    img: 'chris.svg',
    visibility: true,
  },
  {
    name: "peter",
    gender: "man",
    hair: "brown",
    glasses: false,
    beard: true,
    skin: "white",
    img: 'peter.svg',
    visibility: true,
  },
  {
    name: "max",
    gender: "man",
    hair: "blonde",
    glasses: false,
    beard: false,
    skin: "white",
    img: 'max.svg',
    visibility: true,
  },
  {
    name: "pat",
    gender: "man",
    hair: "darkbrown",
    glasses: true,
    beard: false,
    skin: "brown",
    img: 'pat.svg',
    visibility: true,
  },
  {
    name: "rod",
    gender: "man",
    hair: "red",
    glasses: false,
    beard: false,
    skin: "white",
    img: 'rod.svg',
    visibility: true,
  },
  {
    name: "jacob",
    gender: "man",
    hair: "darkbrown",
    glasses: false,
    beard: false,
    skin: "brown",
    img: 'jacob.svg',
    visibility: true,
  },
  {
    name: "selena",
    gender: "woman",
    hair: "red",
    glasses: false,
    beard: false,
    skin: "brown",
    img: 'selena.svg',
    visibility: true,
  },
  {
    name: "lorena",
    gender: "woman",
    hair: "darkbrown",
    glasses: true,
    beard: false,
    skin: "brown",
    img: 'lorena.svg',
    visibility: true,
  },
  {
    name: "natalie",
    gender: "woman",
    hair: "darkbrown",
    glasses: true,
    beard: false,
    skin: "black",
    img: 'natalie.svg',
    visibility: true,
  },
  {
    name: "leo",
    gender: "man",
    hair: "red",
    glasses: true,
    beard: false,
    skin: "white",
    img: 'leo.svg',
    visibility: true,
  },
  {
    name: "mel",
    gender: "woman",
    hair: "blonde",
    glasses: true,
    beard: false,
    skin: "brown",
    img: 'mel.svg',
    visibility: true,
  }
]

const questions = [{
    feature: "gender",
    values: ["man", "woman"],
  },
  {
    feature: "hair",
    values: ["bald", "darkbrown", "blonde", "red", "brown"],
  },
  {
    feature: "glasses",
    values: [true, false],
  },
  {
    feature: "beard",
    values: [true, false],
  },
  {
    feature: "skin",
    values: ["brown", "white", "black"],
  },
];

//función para barajar las cartas
class GuessWho {
  constructor(characters) {
    this.characters = characters.map((character) => {
      return {
        ...character
      }
    });
    this.computerCharacters = characters.map((character) => {
      return {
        ...character
      }
    });
    this.characterSelected = '';
    this.characterSelectdByComputer = '';
    this.filters = [];
    this.computerFilters = [];
    this.questions = questions;
  }

  drawCards() {
    let cards = '';
    let cardsSelection = '';
    let cardsAdversary = '';
    this.characters.forEach(pic => {
      //añadir a las cartas del ordena
      cards += `<div class="card ${pic.visibility ? "" : "card-discarded"}" id=${pic.img} style="background: url(img/${pic.img}) no-repeat;background-position: center;background-size: contain"><div class="name-char">${pic.name}</div></div>`;
      cards += `</div>`;
    });
    this.computerCharacters.forEach(pic => {
      cardsAdversary += `<div class="card adversary-card ${pic.visibility ? "" : "card-discarded"}" id=${pic.img} style="background: url(img/${pic.img}) no-repeat;background-position: center;background-size: contain"></div>`;
      cardsAdversary += `</div>`;
    });
    this.characters.forEach(pic => {
      cardsSelection += `<div class="card-selector" id="${pic.name}" onclick="guesswho.chooseYourCharacter('${pic.name}')" style="background: url(img/${pic.img}) no-repeat;background-position: center;background-size: contain"> <div class="name-char">${pic.name}</div></div>`;
      cardsSelection += `</div>`;
    });

    document.querySelector('#cards').innerHTML = cards;
    document.querySelector('#cards-adversary').innerHTML = cardsAdversary;
    document.querySelector('.card-selection-container').innerHTML = cardsSelection;
  }

  start() {
    this.shuffleCards(this.characters)
    this.shuffleCards(this.computerCharacters)
    this.drawCards()
    this.cardsCounter(this.computerCharacters)
  }

  shuffleCards(cards) {
    for (let i = cards.length; i > 0; i--) {
      let random = Math.floor(Math.random() * i--);
      let temp = cards[i];
      cards[i] = cards[random];
      cards[random] = temp;
    }
  }

  startGame() {
    const modalToShow = document.getElementById('welcome');
    modalToShow.classList.add('hidden');
    const mainModal = document.getElementById('cards-selection');
    mainModal.classList.remove('hidden');
    backgroundAudio.play()
  }

  askAQuestion() {
    const modalToShow = document.getElementById('main-guess-box');
    modalToShow.classList.remove('hidden');
  }
  chooseYourCharacter(character) {
    const mainModal = document.getElementById('cards-selection');
    mainModal.classList.add('hidden');
    const cardChar = document.getElementById("card-char");
    const filteredChar = this.characters.find((c) => c.name === character)
    cardChar.innerHTML = `<div class="card" id="${filteredChar.name}" onclick="guesswho.chooseYourCharacter('${filteredChar.name}')" style="background: url(img/${filteredChar.img}) no-repeat;background-position: center;background-size: contain"> <div class="name-char">${filteredChar.name}</div> </div>`;
    document.querySelector('#selected-name-char').innerHTML = filteredChar.name;
    //método find
    this.player = new Player(filteredChar, this.characters);
    let computerCards = this.computerCharacters.filter((c) => c.name !== character);
    const computerChar = computerCards[Math.floor(Math.random() * computerCards.length)]
    //
    const computerSelectedChar = document.getElementById("computer-selected-char");
    computerSelectedChar.innerHTML = `<div class="card" id="${computerChar.name}" onclick="guesswho.chooseYourCharacter('${computerChar.name}')" style="background: url(img/${computerChar.img}) no-repeat;background-position: center;background-size: contain"> <div class="name-char">${computerChar.name}</div> </div>`;
    //
    this.computer = new Computer(computerChar, this.characters)
  }
  computerDiscardAction() {
    this.computerCharacters = this.computerCharacters.map((c) => {
      //every método
      c.visibility = this.computerFilters.every((filter) => {
        return filter.condition ?
          c[filter.key] === filter.value :
          c[filter.key] !== filter.value;
      });
      return c;
    });
    this.drawCards()
    this.cardsCounter(this.computerCharacters)
    if (this.computerCharacters.filter(c => c.visibility === true).length === 1) {
      document.getElementById("you-lose").classList.remove("hidden");
      loser.play()
      backgroundAudio.pause()
    }
  }

  cardsCounter() {
    const computerFilteredCharacters = this.computerCharacters.filter(c => c.visibility === true).length;
    document.querySelector('#matched-char').innerHTML = computerFilteredCharacters;
    const totalCards= this.computerCharacters.length;
    document.querySelector('#total-char').innerHTML = totalCards;
  }


computerAskQuestion() {
  const randomQuestion =
    this.questions[Math.floor(Math.random() * this.questions.length)];
  const randomValue =
    randomQuestion.values[
      Math.floor(Math.random() * randomQuestion.values.length)
    ];
  this.computerFilters.push({
    key: randomQuestion.feature,
    value: randomValue,
    condition: this.player.guess(randomQuestion.feature, randomValue)
  })
  if(randomQuestion.feature==="hair"||randomQuestion.feature==="skin") {
    document.querySelector('#question-from-computer').innerHTML = `Has the character ${randomValue} ${randomQuestion.feature}?`;
  } else  if (randomQuestion.feature==="gender"){
    document.querySelector('#question-from-computer').innerHTML = `Is the character a ${randomValue}?`;
  }
  else {
    document.querySelector('#question-from-computer').innerHTML = `Does the character wear ${randomQuestion.feature}?`;
  }
  ;
  this.computerDiscardAction()
  console.log(randomQuestion)
}

askMainQuestion(id) {
  if (id === "gender" || id === "hair" || id === "skin") {
    const modalToShow = document.getElementById(`guess-box-${id}`);
    modalToShow.classList.remove('hidden');
    const mainModal = document.getElementById('main-guess-box');
    mainModal.classList.add('hidden')
  } else {

    const modalToShow = document.getElementById(`final-guess-box`);
    modalToShow.classList.remove('hidden');
    const mainModal = document.getElementById('main-guess-box');
    mainModal.classList.add('hidden');
    const computerResponse = this.computer.guess(id, true)
    this.filters.push({
      key: id,
      value: true,
      condition: computerResponse
    });
    document.querySelector('#boolean-answer').innerHTML = computerResponse ? "Yes" : "No";
    document.querySelector('#char-property').innerHTML = `Does the character wear ${id}`;
  }
}

askValueQuestion(id, value) {
  const modalToShow = document.getElementById(`final-guess-box`);
  modalToShow.classList.remove('hidden');
  const mainModal = document.getElementById(`guess-box-${id}`);
  mainModal.classList.add('hidden')
  const computerResponse = this.computer.guess(id, value)
  this.filters.push({
    key: id,
    value: value,
    condition: computerResponse
  });
  document.querySelector('#boolean-answer').innerHTML = computerResponse ? "yes" : "no";
  if (id === "hair" || id === "skin") {
    document.querySelector('#char-property').innerHTML = `Has the character ${value} ${id}`;
  } else {
    document.querySelector('#char-property').innerHTML = `It is a ${value}`;
  }

}



discardChar() {
  this.characters = this.characters.map((c) => {
    //every método
    c.visibility = this.filters.every((filter) => {
      return filter.condition ?
        c[filter.key] === filter.value :
        c[filter.key] !== filter.value;
    });
    return c;
  });
  this.drawCards()
  this.computerAskQuestion()
  const mainModal = document.getElementById(`final-guess-box`);
  mainModal.classList.add("hidden");

  if (this.characters.filter(c => c.visibility === true).length === 1) {
    document.getElementById("you-win").classList.remove("hidden");
    claps.play()
    backgroundAudio.pause()
  }
}
restart() {
  window.location.reload();
}

tryAgain() {
  const mainModal = document.getElementById("you-lose");
  mainModal.classList.add('hidden')
  this.restart()
}

}

class Player {
  constructor(character, deck) {
    this.character = character;
    this.deck = deck;
  }

  // este value pertenece a la caracteristica del persona del jugador contrario


  guess(id, value) {
    return this.character[id] === value
  }

  guessAboutValue(id, value) {
    return this.deck.filter(character => {
      return (character[id] === value);
    });
  }

}

class Computer extends Player {
  constructor(character, deck) {
    super(character, deck);
  }

}
const claps= new Audio("./music/mixkit-small-crowd-ovation-437.wav")

const loser = new Audio ("./music/fail-buzzer-01.mp3")

const backgroundAudio= new Audio("./music/Herb_Alpert_And_The_Tijuana_Brass_Spanish_Flea_Ringtone_(by Fringster.com).mp3")
if (typeof backgroundAudio.loop == 'boolean')
{
  backgroundAudio.loop = true;
}
else
{
  backgroundAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}