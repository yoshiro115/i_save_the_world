eventsArray = [
  {
    title: "Prologue",
    type: "story",
    text: "You awaken to the blinding light of a hero’s presence, their silhouette framed against a sky torn apart by chaos. Their voice cuts through the air like thunder — urgent, commanding, impossible to ignore. The world stands at the edge of destruction, and you have no choice but to rise. The planet itself has just roared in pain, shaken by a tremor so powerful it split the earth and cracked the sky. Destiny has ripped you from your slumber, and now, whether you are ready or not, you must become the blade that carves a path through the storm.",
    img: ["asset/img/crater.jpg"],
  },
  {
    title: "First Choice",
    type: "character choice",
    text: "The hero stands before you : ",
    img: [
      "asset/img/crater.jpg",
      "asset/img/naruto.png",
      "asset/img/goku.png",
      "asset/img/luffy.png",
    ],
  },
  {
    title: "First talk with the hero",
    type: "character talking",
    text: "Are you hurt? Can you stand? Listen carefully — there’s no time to waste. The planet is breaking apart. Something ancient, something powerful, just woke up beneath us.",
    img: ["asset/img/crater.jpg"],
  },
  {
    title: "first enemy",
    type: "character talking",
    text: "Well, well… looks like my luck just turned, Of all the poor souls still breathing, I get to deal with you two. Don’t take it personally. Someone paid very well to make sure neither of you leave this place alive. Especially you.",
    img: ["asset/img/crater.jpg", "asset/img/deathstroke.png"],
  },
  {
    title: "I'll take care of it",
    type: "character talking",
    text: "Stay back.This one’s mine.You want me.\n Deathstroke?\n Come and try.",
    img: ["asset/img/crater.jpg"],
  },
  {
    title: "First Battle",
    type: "fight",
    text: "deathstroke",
    img: ["asset/img/mapFight1.jpg"],
    song: ["asset/audio/battle_fire_spirit.mp3"]
  },
  {
    title: "Win The First Fight",
    type: "character talking",
    text: "Super Easy like always. I'm so hungry. Let's take a break to regain our strength",
    img: ["asset/img/crater.jpg"],
  },
  {
    title: "First break",
    type: "relax",
    text: "The rest is short-lived, but gets you back on your feet. enjoy it, it won't always be the case.",
    img: ["asset/img/relax.gif",],
  },
  {
    title: "Someone approaching",
    type: "story",
    text: "You awaken to the blinding light of a hero’s presence, their silhouette framed against a sky torn apart by chaos. Their voice cuts through the air like thunder — urgent, commanding, impossible to ignore. The world stands at the edge of destruction, and you have no choice but to rise. The planet itself has just roared in pain, shaken by a tremor so powerful it split the earth and cracked the sky. Destiny has ripped you from your slumber, and now, whether you are ready or not, you must become the blade that carves a path through the storm.Suddenly, the wind shifted. The warm air turned cold, and the ground trembled faintly beneath you. A dark aura began to rise from the horizon.",
    img: ["asset/img/night_desert.jpg"],
  },{
    title: "Stay on guard",
    type:"character talking",
    text: "I feel an evil aura approaching us, stay on guard",
    img: ['asset/img/night_desert.jpg']
  }
  ,{
    title: "Father FIRST TIME",
    type:"character talking",
    text: "Well, these heroes are still alive!So Deathstroke was useless, like all Marvel villains.",
    img: ['asset/img/night_desert.jpg','asset/img/father.png'],
    song: ["asset/audio/zoldyck.mp3"]
  },{
    title: "Father FIRST TIME2",
    type:"character talking",
    text: "Himiko, please don't disappoint me",
    img: ['asset/img/night_desert.jpg','asset/img/father.png'],
    song: ["asset/audio/zoldyck.mp3"]
  },{
    title: "Himiko",
    type:"character talking",
    text: "New blood at last. I think we're gonna have a lot of fun together. I can't wait to be you.",
    img: ['asset/img/night_desert.jpg','asset/img/himiko.png'],
    song: ["asset/audio/zoldyck.mp3"]
  },{
    title: "Father FIRST TIME3",
    type:"character talking",
    text: "Bring me their heads, and we can finally decorate the base.",
    img: ['asset/img/night_desert.jpg','asset/img/father.png'],
    song: ["asset/audio/zoldyck.mp3"]
  },{
    title: "Himiko2",
    type:"character talking",
    text: "Sire, yes sire.\n You're so cute, let me give you a hug",
    img: ['asset/img/night_desert.jpg','asset/img/himiko.png'],
    song: ["asset/audio/zoldyck.mp3"]
  },{
    title: "Stay on guard",
    type:"character talking",
    text: "You really think you have a chance of beating us.",
    img: ['asset/img/night_desert.jpg']
  },{
    title: "Himiko Battle",
    type: "fight",
    text: "himiko",
    img: ["asset/img/mapFight1.jpg"],
    song: ["asset/audio/battle_fire_spirit.mp3"]
  },
];

let events = [];
eventsArray.forEach((event) => {
  objectEvent = new Event(
    event.title,
    event.type,
    event.text ? event.text : "",
    event.img ? event.img : [],
    event.song ? event.song : []
  );
  events.push(objectEvent);
});

// CHARACTERS INITIALIZE
const allCharaters = [
  {
    name: "naruto",
    img: "asset/img/naruto.png",
    spritSheet: "",
    stats: {
      hp: 350,
      atk: 150,
      def: 100,
      spAtk: 250,
      spdef: 100,
      speed: 250,
      energy: 400,
    },
    moveSetArray: ["Kick","Rasengan"],
    song: ["asset/audio/naruto.mp3"]
  },
  {
    name: "goku",
    img: "asset/img/goku.png",
    spritSheet: "",
    stats: {
      hp: 300,
      atk: 200,
      def: 120,
      spAtk: 200,
      spdef: 120,
      speed: 270,
      energy: 200,
    },
    moveSetArray: ["Kick","Kamehameha"],
    song: ["asset/audio/goku.mp3"]
  },
  {
    name: "luffy",
    img: "asset/img/luffy.png",
    spritSheet: "",
    stats: {
      hp: 400,
      atk: 150,
      def: 180,
      spAtk: 100,
      spdef: 180,
      speed: 200,
      energy: 300,
    },
    moveSetArray: ["Kick","Gatling"],
    song: ["asset/audio/luffy.mp3"]
  },
  {
    name: "deathstroke",
    img: "asset/img/deathstroke.png",
    spritSheet: "",
    stats: {
      hp: 200,
      atk: 300,
      def: 100,
      spAtk: 300,
      spdef: 100,
      speed: 210,
      energy: 300,
    },
    moveSetArray: ["Kick","bullet burst"],
    song: ["asset/audio/deathstroke.mp3"]
  },
  //! A CHANGER CAR BON
  {
    name: "himiko",
    img: "asset/img/himiko.png",
    spritSheet: "",
    stats: {
      hp: 200,
      atk: 300,
      def: 100,
      spAtk: 300,
      spdef: 100,
      speed: 210,
      energy: 300,
    },
    moveSetArray: ["Kick","bullet burst"],
    song: ["asset/audio/deathstroke.mp3"]
  },
];
// CHARACTER END

//  MOVES INITIALIZE
const allMove = [
  {
    name: "Kick",
    description: "kick the enemy",
    power: 30,
    style: "atk",
    cost: 0,
    add: {
      energy: 10,
    },
  },
  {
    name: "Kamehameha",
    description: "Destructive turtle wave",
    power: 70,
    style: "spAtk",
    cost: 150,
    add: {},
    img:{
      sprite:"asset/img/kamehameha.png",
      yMin: 200,
      yMax: 3000,
    },
    position: "y"
  },
  {
    name: "Rasengan",
    description: "The Swirling Orb",
    power: 70,
    style: "spAtk",
    cost: 150,
    add: {},
    img: {
      sprite:"asset/img/rasengan.png",
      xMin: 80,
      xMax: 80*4,
    },
    position: "x"
  },
  {
    name: "Gatling",
    description: " it's a burst of Chewing Jet Pistol ",
    power: 150,
    style: "atk",
    cost: 100,
    add: {},
    img:{
      sprite:"asset/img/gatling.png",
      yMin: 200,
      yMax: 1800,
    },
    position: "y"
  },
  {
    name: "bullet burst",
    description: "a destructive burst of M16",
    power: 80,
    style: "spAtk",
    cost: 100,
    add: {},
  },
];
// MOVE END

// FUNCTION
function lifeColor(lifeDiff) {
  switch (true) {
    case lifeDiff === 1:
      return "rgb(14, 192, 14)";
    case lifeDiff <= 0.1:
      return "red";
    case lifeDiff <= 0.2:
      return "orange";
    case lifeDiff <= 0.49:
      return "yellow";
  }
}

// ! Initialize DOM ELEMENT

// container Element
const mainContainer = document.getElementById("main-container");
const killLife = document.getElementById("Kill-life");
const menuStartElement = document.getElementById("menu-start");
const menuGameElement = document.getElementById("menu-game");
const menuEndElement = document.getElementById("menu-end");
const storyElement = document.getElementById("story");
const fightContainer = document.getElementById("fight-container");
const previous = document.getElementById("previous");

//  buton Element
const btnStartElement = document.getElementById("btn-start");
const btnResetElement = document.getElementById("btn-reset");

// fight Element
const lifeContainer = document.getElementById("life-container");
const heroLifeContainer = document.getElementById("hero-life-container");
const heroLifeName = document.getElementById("hero-life-name");
const heroLifetotal = document.getElementById("hero-life-total");
const heroLifeRemaining = document.getElementById("hero-life-remaining");
const enemyLifeContainer = document.getElementById("enemy-life-container");
const enemyLifeName = document.getElementById("enemy-life-name");
const enemyLifeTotal = document.getElementById("enemy-life-total");
const enemyLifeRemaining = document.getElementById("enemy-life-remaining");
const fightStageContainer = document.getElementById("fight-stage-container");
const fightStageHero = document.getElementById("fight-stage-hero");
const fightStageEnemy = document.getElementById("fight-stage-enemy");
const figtMenuContainer = document.getElementById("fight-menu-container");
const fightMenuMessage = document.getElementById("fight-menu-message");
const fightMenuChoice = document.getElementById("fight-menu-choice");
const fightMenuSkill = document.getElementById("fight-menu-skill");
const fightMenuCharacter = document.getElementById("fight-menu-character");
// const fightMenuSkillHero = document.getElementById("fight-menu-skill-hero");

//initialize some element
let fightMenuBtnPrevious;
let storyTitle;
let storyText;
let storyNextBtn;
let charactersChoiceContainer;
let characterDivImg;
let characterImg;
let heroInBattle;
let enemy;
let infoFight = [];
let battle;
let revealingText;
let eventsTransition
let battleSong;
let heroSong


// GAME INITIALIZE
// game = new Game(eventsArray);
// console.log(game);
