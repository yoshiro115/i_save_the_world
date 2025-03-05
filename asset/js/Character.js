class Character {
    constructor(name, moveSetArray, stats, spritSheet, currentHp, img = "", song = []) {
      this.name = name;
      // Move Set Management
      this.moveSet = [];
      moveSetArray.forEach((moveName) => {
        let move = allMove.filter((moveObject) => moveObject.name === moveName);
        this.moveSet.push(move[0]);
      });
      this.stats = stats;
      this.spritSheet = spritSheet;
      this.currentHp = currentHp;
      this.img = img;
      this.song = song
      this.songName = new Audio(this.song[0]);
      this.songName.volume = 0.5;
  
    }
  }
  