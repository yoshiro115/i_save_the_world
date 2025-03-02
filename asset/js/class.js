class Game {
  constructor(events) {
    this.events = events;
  }
  life = 2;
  roundWin = 0;
  indexEvent = 0;
  hero = [];
  item = [];
}

class Event {
  constructor(title, type, text = "", img = "", song = []) {
    this.title = title;
    this.type = type;
    this.text = text;
    this.img = img;
    this.song = song;
  }
}

class Character {
  constructor(name, moveSetArray, stats, spritSheet, currentHp , img = "") {

    this.name = name;
    // Move Set Management
    this.moveSet =[] ;
    moveSetArray.forEach(moveName => {
        let move = allMove.filter(moveObject => moveObject.name === moveName);
        this.moveSet.push(move);
    });
    this.stats = stats;
    this.spritSheet = spritSheet;
    this.currentHp = currentHp;
    this.img = img;
    
    
    
  }
}

// g