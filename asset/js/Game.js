class Game {
  constructor(events) {
    this.events = events;
    this.life = 1;
    this.roundWin = 0;
    this.indexEvent = 0;
    this.hero = [];
    this.item = [];
    this.mainTheme = new Audio("asset/audio/Zoltraak.mp3");
    this.mainTheme.volume = 0.05;
  }

  stat() {
    return this.indexEvent >= 0
      ? `<h2>LIFE : ${game.life}</h2><h2>KILL : ${game.roundWin}</h2>`
      : "";
  }
  reset() {
    this.life = 1;
    this.roundWin = 0;
    this.indexEvent = 0;
    this.hero.length = 0;
    this.item.length = 0;
  }

  hpRecovery() {
    this.hero.forEach((oneHero) => {
      oneHero.currentHp = oneHero.stats.hp;
    });
    // console.log(this.hero)
  }
}
