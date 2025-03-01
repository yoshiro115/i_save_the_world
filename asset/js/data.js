eventsArray = [
  {
    title: "Prologue",
    type: "story",
    text: "You awaken to the blinding light of a hero’s presence, their silhouette framed against a sky torn apart by chaos. Their voice cuts through the air like thunder — urgent, commanding, impossible to ignore. The world stands at the edge of destruction, and you have no choice but to rise. The planet itself has just roared in pain, shaken by a tremor so powerful it split the earth and cracked the sky. Destiny has ripped you from your slumber, and now, whether you are ready or not, you must become the blade that carves a path through the storm.",
    img: ["./asset/img/crater.jpg"],
  },
  {
    title: "First Choice",
    type: "character choice",
    text: "The hero stands before you : ",
    img: ["./asset/img/crater.jpg", "./asset/img/naruto.png", "./asset/img/goku.png", "./asset/img/luffy.png"],
  },
  {
    title: "First talk with the hero",
    type: "character talking",
    text: "Are you hurt? Can you stand? Listen carefully — there’s no time to waste. The planet is breaking apart. Something ancient, something powerful, just woke up beneath us.",
    img: ["./asset/img/crater.jpg"],
  }
];

let events = [];
eventsArray.forEach((event) => {
  objectEvent = new Event(
    event.title,
    event.type,
    event.text ? event.text : "",
    event.img ? event.img : [],
    event.son ? event.song : []
  );
  events.push(objectEvent);
});

// CHARACTERS INITIALIZE
const allCharaters = [
    {
        name: "naruto",
        img: "./asset/img/naruto.png",
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
        moveSetArray: ["kick"]
    },
    {
        name: "goku",
        img: "./asset/img/goku.png",
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
        moveSetArray: ["kick"]
    },
    {
        name: "luffy",
        img: "./asset/img/luffy.png",
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
        moveSetArray: ["kick"]
    },
]
// CHARACTER END

//  MOVES INITIALIZE
const allMove = [
    {
        name: "kick",
        description: "kick the enemy",
        power: 30,
        style: "atk",
        cost: 0,
        add: {
            energy: 10,
        }

    },
]
// MOVE END 

// GAME INITIALIZE
game = new Game(eventsArray);
console.log(game);
