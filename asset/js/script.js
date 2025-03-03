// ! Initialize DOM ELEMENT

// container Element
const mainContainer = document.getElementById("main-container");
const menuStartElement = document.getElementById("menu-start");
const menuGameElement = document.getElementById("menu-game");
const menuEndElement = document.getElementById("menu-end");
const storyElement = document.getElementById("story");
const fightContainer = document.getElementById("fight-container");
const previous = document.getElementById("previous");

//  buton Element
const btnStartElement = document.getElementById("btn-start");

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
const fightMenuSkillHero = document.getElementById("fight-menu-skill-hero");

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
              selectedCharacter.stats.hp,
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
      //! create all element START

      // fight div container create and add
      // fightDivContainer = document.createElement('div');
      // menuGameElement.append(fightDivContainer);

      // Life container for both player and add inside fightDivContainer
      // lifeDivContainer = document.createElement('div');
      // fightDivContainer.append(lifeDivContainer);

      // life container player1 = hero
      // heroLifeDivContainer = document.createElement('div')
      // ! create all element END

      // ! add fight class
      // reinitilize backgroundImage Game element container
      menuGameElement.style.backgroundImage = "none";

      // fightContainer show and add Background
      fightContainer.classList.add("show");
      fightContainer.style.backgroundImage =
        "url(" + game.events[game.indexEvent].img[0] + ")";
      // console.log(fightContainer.style.backgroundImage);

      // initialize player
      if (!heroInBattle) {
        heroInBattle = game.hero[0];
      }

      if (!enemy) {
        let findenemy = allCharaters.filter(
          (character) => character.name === game.events[game.indexEvent].text
        );
        enemy = new Character(
          findenemy[0].name,
          findenemy[0].moveSetArray,
          findenemy[0].stats,
          findenemy[0].spritSheet,
          findenemy[0].stats.hp,
          findenemy[0].img
        );
      }

      //NAME AND LIFE HERO
      heroLifeName.innerText =
        heroInBattle.name[0].toUpperCase() + heroInBattle.name.slice(1);
      let heroLifePercentage = heroInBattle.currentHp / heroInBattle.stats.hp;
      heroLifeRemaining.style.width = heroLifePercentage * 200 + "px";
      heroLifeRemaining.style.backgroundColor = lifeColor(heroLifePercentage);

      //NAME AND LIFE ENEMY
      enemyLifeName.innerText =
        enemy.name[0].toUpperCase() + enemy.name.slice(1);
      let enemyLifePercentage = enemy.currentHp / enemy.stats.hp;
      enemyLifeRemaining.style.width = enemyLifePercentage * 200 + "px";
      enemyLifeRemaining.style.backgroundColor = lifeColor(enemyLifePercentage);

      let fightStageHeroImage = document.createElement("img");
      fightStageHero.append(fightStageHeroImage);
      fightStageHeroImage.setAttribute("src", heroInBattle.img);

      let fightStageHeroEnemy = document.createElement("img");
      fightStageEnemy.append(fightStageHeroEnemy);
      fightStageHeroEnemy.setAttribute("src", enemy.img);

      if (fightMenuMessage.innerText === "") {
        fightMenuMessage.innerText = "deathstroke wants to fight";
        fightMenuMessage.classList.add("show");
      } else if (infoFight.length !== 0) {
        infoFight.forEach((info, key) => {
          setTimeout(() => {
            if (typeof info === "string") {
              fightMenuMessage.innerText = info;
              fightMenuMessage.classList.add("show");
            } else {
              console.log(Object.keys(info)[0]);
              if (Object.keys(info)[0] === "hero") {
                enemy.currentHp -= info.hero;
                if(enemy.currentHp <= 0){
                  enemyLifeRemaining.style.width = 0 + "px"
                }else{
                  enemyLifePercentage = enemy.currentHp / enemy.stats.hp;
                enemyLifeRemaining.style.width =
                  enemyLifePercentage * 200 + "px";
                enemyLifeRemaining.style.backgroundColor =
                  lifeColor(enemyLifePercentage);
                }
                
                // infoFight.shift();
                // loadEvent();
              } else {
                heroInBattle.currentHp -= info.enemy;
                if(heroInBattle.currentHp<= 0){
                  heroLifeRemaining.style.width = 0 + "px"
                }
                else{
                  heroLifePercentage =
                  heroInBattle.currentHp / heroInBattle.stats.hp;
                heroLifeRemaining.style.width = heroLifePercentage * 200 + "px";
                heroLifeRemaining.style.backgroundColor =
                  lifeColor(heroLifePercentage);
                }
                
                // infoFight.shift();
                // loadEvent();
              }
            }
            // fightMenuMessage.classList.remove("show");
          }, 1000 * (key));
        });
        setTimeout(() => {
          fightMenuMessage.classList.remove("show");
          infoFight = [];
          console.log(!infoFight);
          if (infoFight.length === 0) {
            fightMenuChoice.classList.add("show");
          }
          loadEvent();
        }, 4000);

        
      }

      fightMenuMessage.addEventListener("click", () => {
        if (infoFight.length !== 0) {
          // fightMenuMessage.classList.remove("show");
          loadEvent();
        } else {
          fightMenuMessage.classList.remove("show");
          fightMenuChoice.classList.add("show");
        }
      });

      fightMenuSkill.addEventListener("click", () => {
        fightMenuChoice.classList.remove("show");
        fightMenuSkillHero.classList.add("show");
        // console.log( heroInBattle.moveSet)
        // for(i=0; i<4; i++){
        if (
          fightMenuSkillHero.childNodes.length !== heroInBattle.moveSet.length
        ) {
          heroInBattle.moveSet.forEach((skill) => {
            // console.log(skill)
            const oneSkill = document.createElement("div");
            fightMenuSkillHero.append(oneSkill);
            oneSkill.classList.add("fight-menu-skill-hero-one");
            // if(heroInBattle.moveSet[i]){
            oneSkill.innerText = skill.name;
            // }
            oneSkill.addEventListener("click", () => {
              infoFight = [
                "hero attack enemy",
                { hero: 150 },
                "enemy attack hero",
                { enemy: 30 },
              ];
              fightMenuSkillHero.classList.remove("show");
              fightMenuBtnPrevious.remove();
              loadEvent();
            });
          });
        }

        // console.log(previous.no);
        if (previous.childNodes.length === 0) {
          fightMenuBtnPrevious = document.createElement("button");
          previous.append(fightMenuBtnPrevious);
          fightMenuBtnPrevious.classList.add("btn-previous");
          fightMenuBtnPrevious.classList.add("btn");
          fightMenuBtnPrevious.innerText = "PREVIOUS";
          fightMenuBtnPrevious.addEventListener("click", () => {
            fightMenuChoice.classList.add("show");
            fightMenuSkillHero.classList.remove("show");
            fightMenuBtnPrevious.remove();
          });
        }
      });
      // if(fightMenuMessage)

      break;
  }
}
