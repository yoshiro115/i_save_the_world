class RevealingText {
  constructor(element, text) {
    this.element = element;
    this.text = text;
    this.speed = 50;

    this.timeout = null;
    this.isDone = false;
  }

  init() {
    let characters = [];
    this.text.split("").forEach((character) => {
      let span = document.createElement("span");
      span.textContent = character;
      this.element.appendChild(span);

      characters.push({
        span,
        delayAfter: character === " " ? 0 : this.speed,
      });
    });

    this.revealOneCharacter(characters);
  }

  warpToDone(){
    clearTimeout(this.timeout);
    this.isDone = true;
    this.element.querySelectorAll('span').forEach(span => {
        span.classList.add('revealed')
    })
  }

  revealOneCharacter(characterArray) {
    console.log(characterArray);
    const next = characterArray.splice(0, 1)[0];
    next.span.classList.add("revealed");

    if (characterArray.length >= 0) {
      this.timeout = setTimeout(() => {
        if (characterArray.length > 0) {
          this.revealOneCharacter(characterArray);
        } else {
          this.isDone = true;
        }
      }, next.delayAfter);
    }
  }
}
