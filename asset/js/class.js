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
  constructor(title, type, text = [], img = [], son = []) {
    this.title = title;
    this.type = type;
    this.text = text;
    this.img = img;
    this.son = son;
  }
}

class Character {
  constructor(name, img, moveSet, stats) {
    this.name;
    this.img;
    this.moveSet, this.stats;
  }
}

// g