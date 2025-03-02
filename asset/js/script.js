// ! Initialize DOM ELEMENT

// container Element
const menuStartElement = document.getElementById("menu-start");
const menuGameElement = document.getElementById("menu-game");
const menuEndElement = document.getElementById("menu-end");
const storyElement = document.getElementById("story");

//  buton Element
const btnStartElement = document.getElementById("btn-start");

//initialize some element
let storyTitle;
let storyText;
let storyNextBtn;
let charactersChoiceContainer;
let characterDivImg;
let characterImg;

// Event
btnStartElement.addEventListener("click", () => {
  menuStartElement.classList.remove("show");
  menuGameElement.classList.add("show");
});

// setInterval(loadEvent(),1000)
loadEvent();

//Function
function loadEvent() {
  switch (game.events[game.indexEvent].type) {

    // ! Story Event
    case "story":
      storyElement.classList.add("story-container");
      // create History Title and Add
      storyTitle = document.createElement("h2");
      storyElement.append(storyTitle);
      storyTitle.innerText = game.events[game.indexEvent].title;

      // create History Text and Add
      storyText = document.createElement("p");
      storyText.classList.add("story-p");
      storyElement.append(storyText);
      storyText.innerText = game.events[game.indexEvent].text;

      // add History Background
      menuGameElement.style.backgroundImage =
        "url(" + game.events[game.indexEvent].img[0] + ")";

      // add next button
      storyNextBtn = document.createElement("button");
      storyNextBtn.classList.add("btn");
      storyNextBtn.classList.add("btn-next");
      storyElement.append(storyNextBtn);
      storyNextBtn.innerText = "NEXT";
      //event Next button
      storyNextBtn.addEventListener("click", () => {
        // storyElement.classList.remove("story-container");
        // index Event increase
        game.indexEvent++;
        // remove created element
        storyTitle.remove();
        storyText.remove();
        storyNextBtn.remove();
        storyElement.classList.remove("story-container");
        // console.log(game.indexEvent);
        loadEvent();
      });
      break;

    //   ! Character Choice Event
    case "character choice":
      storyElement.classList.add("story-container");
      // create History Title and Add
      storyTitle = document.createElement("h2");
      storyElement.append(storyTitle);
      storyTitle.innerText = game.events[game.indexEvent].title;

      // create History Text and Add
      storyText = document.createElement("p");
      storyText.classList.add("character-choice-p");
      storyElement.append(storyText);
      storyText.innerText = game.events[game.indexEvent].text;

      // add History Background
      menuGameElement.style.backgroundImage =
        "url(" + game.events[game.indexEvent].img[0] + ")";

      //create div Choice charactere add
      charactersChoiceContainer = document.createElement("div");
      charactersChoiceContainer.classList.add("characters-choice-container");
      storyElement.append(charactersChoiceContainer);
      for (i = 1; i < game.events[game.indexEvent].img.length; i++) {
        const characterChoiceDiv = document.createElement("div");
        charactersChoiceContainer.append(characterChoiceDiv);
        const characterChoiceImg = document.createElement("img");
        // console.log(characterChoiceImg.getAttribute("src"));
        characterChoiceImg.setAttribute(
          "src",
          game.events[game.indexEvent].img[i]
        );
        characterChoiceDiv.append(characterChoiceImg);
        characterChoiceImg.addEventListener("click", () => {
          game.indexEvent++;
          //characterName = urlImage cut all before the last "/" and cut the last 4 letters (.png)
          let characterName = characterChoiceImg
            .getAttribute("src")
            .substring(
              characterChoiceImg.getAttribute("src").lastIndexOf("/") + 1
            )
            .slice(0, -4);
          //   console.log(characterName);
          let selectedCharacter = allCharaters.filter(
            (character) => character.name === characterName
          )[0];
          //   console.log(selectedCharacter);
          game.hero.push(
            new Character(
              characterName,
              selectedCharacter.moveSetArray,
              selectedCharacter.stats,
              selectedCharacter.spritSheet,
              selectedCharacter.img
            )
          );
          storyTitle.remove();
          storyText.remove();
          charactersChoiceContainer.remove();
          storyElement.classList.remove("story-container");
          //   console.log(game.hero);
          loadEvent();
        });
      }
      break;

    //   ! Character Talking Event
    case "character talking":
      //   Div container Character Talking initialize
      characterDivImg = document.createElement("div");
      menuGameElement.append(characterDivImg);
      characterDivImg.classList.add("character-img");

      //   img Character Talking initialize
      characterImg = document.createElement("img");
      characterDivImg.append(characterImg);
      characterImg.setAttribute(
        "src",
        game.events[game.indexEvent].img[1]
          ? game.events[game.indexEvent].img[1]
          : game.hero[0].img
      );

      //   div Talk Initialize
      talkDiv = document.createElement("div");
      menuGameElement.append(talkDiv);
      talkDiv.classList.add("talking-div");

      // p talk Initialize
      talkP = document.createElement("p");
      talkDiv.append(talkP);
      talkP.innerText = game.events[game.indexEvent].text;

      //   button next Initialize
      storyNextBtn = document.createElement("button");
      storyNextBtn.classList.add("btn");
      storyNextBtn.classList.add("btn-next");
      talkDiv.append(storyNextBtn);
      storyNextBtn.innerText = "NEXT";

      storyNextBtn.addEventListener("click", () => {
        // index Event increase
        game.indexEvent++;
        // remove created element
        characterDivImg.remove();
        characterImg.remove();
        talkDiv.remove();
        talkP.remove();
        storyNextBtn.remove();
        // console.log(game.indexEvent);
        loadEvent();
      });
      break;

    //   ! Fight Event
      case "fight":

  }
}
