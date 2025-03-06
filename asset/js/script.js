btnStartElement.addEventListener("click", () => {
  menuStartElement.classList.remove("show");
  menuGameElement.classList.add("show");
  killLife.classList.add("show");
  game = new Game(eventsArray);
  eventsTransition = new EventsTransition();
  eventsTransition.init(menuGameElement);
  game.mainTheme.play();
  game.mainTheme.loop = true;
  console.log((killLife.innerHTML = game.stat()));
  loadEvent();
});

// setInterval(loadEvent(),1000)
// loadEvent();

//Function
function loadEvent() {
  killLife.innerHTML = game.stat();
  if (game.life === 0) {
    eventsTransition.fadeOut();
    menuGameElement.classList.remove("show");
    menuEndElement.classList.add("show");

    btnResetElement.addEventListener("click", () => {
      menuEndElement.classList.remove("show");
      killLife.innerHTML = "";
      game.mainTheme.pause();
      game.mainTheme.currentTime = 0;
      menuStartElement.classList.add("show");

      // loadEvent();
    });
  } else {
    switch (game.events[game.indexEvent].type) {
      // ! Story Event
      case "story":
      case "relax":
        eventsTransition.fadeOut();
        if (game.events[game.indexEvent].type === "relax") {
          game.hpRecovery();
        }
        storyElement.classList.add("story-container");
        // create History Title and Add
        storyTitle = document.createElement("h2");
        storyElement.append(storyTitle);
        storyTitle.innerText = game.events[game.indexEvent].title;

        // create History Text and Add
        storyText = document.createElement("p");
        storyText.classList.add("story-p");
        storyElement.append(storyText);
        // storyText.innerText = game.events[game.indexEvent].text;
        revealingText = new RevealingText(
          storyText,
          game.events[game.indexEvent].text
        );
        revealingText.init();
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

          // remove created element
          if (revealingText.isDone) {
            storyTitle.remove();
            storyText.remove();
            storyNextBtn.remove();
            storyElement.classList.remove("story-container");
            // console.log(game.indexEvent);

            eventsTransition.init(menuGameElement);
            game.indexEvent++;

            loadEvent();
          } else {
            revealingText.warpToDone();
          }
        });
        break;

      //   ! Character Choice Event
      case "character choice":
        eventsTransition.fadeOut();
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
            let selectedhero = new Character(
              characterName,
              selectedCharacter.moveSetArray,
              selectedCharacter.stats,
              selectedCharacter.spritSheet,
              selectedCharacter.stats.hp,
              selectedCharacter.img,
              selectedCharacter.song ? selectedCharacter.song : []
            );
            game.hero.push(selectedhero);
            selectedhero.songName.play();
            storyTitle.remove();
            storyText.remove();
            charactersChoiceContainer.remove();
            storyElement.classList.remove("story-container");
            eventsTransition.init(menuGameElement);
            // console.log(game.indexEvent);
            game.indexEvent++;
            loadEvent();
          });
        }
        break;

      //   ! Character Talking Event
      case "character talking":
        eventsTransition.fadeOut();
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
        // talkP.innerText = game.events[game.indexEvent].text;
        revealingText = new RevealingText(
          talkP,
          game.events[game.indexEvent].text
        );
        revealingText.init();

        //   button next Initialize
        storyNextBtn = document.createElement("button");
        storyNextBtn.classList.add("btn");
        storyNextBtn.classList.add("btn-next");
        talkDiv.append(storyNextBtn);
        storyNextBtn.innerText = "NEXT";

        storyNextBtn.addEventListener("click", () => {
          if (revealingText.isDone) {
            // index Event increase
            game.indexEvent++;
            // remove created element
            menuGameElement.childNodes.length = 0;
            characterDivImg.remove();
            characterImg.remove();
            talkDiv.remove();
            talkP.remove();
            storyNextBtn.remove();
            eventsTransition.init(menuGameElement);
            // console.log(game.indexEvent);
            loadEvent();
          } else {
            revealingText.warpToDone();
          }
        });
        break;

      //   ! Fight Event
      case "fight":
        //! create all element START
        eventsTransition.fadeOut();
        if (game.events[game.indexEvent].song) {
          game.mainTheme.pause();
          battleSong = new Audio(game.events[game.indexEvent].song[0]);
          battleSong.volume = 0.1;
          battleSong.loop = true;
          battleSong.play();
        }

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
        // menuGameElement.style.backgroundImage = "none";

        // fightContainer show and add Background
        fightContainer.classList.add("show");
        figtMenuContainer.classList.add("show");
        fightContainer.style.backgroundImage =
          "url(" + game.events[game.indexEvent].img[0] + ")";
        // console.log(fightContainer.style.backgroundImage);

        // initialize player
        // if (!heroInBattle) {
        //   heroInBattle = game.hero[0];
        // }

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
            findenemy[0].img,
            findenemy[0].song
          );
        }

        let fightStageHeroImage = document.createElement("img");
        let fightStageEnemyImage = document.createElement("img");
        battle = new Battle(
          game.hero,
          enemy,
          heroLifeName,
          enemyLifeName,
          heroLifeRemaining,
          enemyLifeRemaining,
          fightStageHeroImage,
          fightStageEnemyImage,
          fightStageHero
        );

        //NAME AND LIFE HERO
        heroLifeName.innerText =
          battle.currentHero.name[0].toUpperCase() +
          battle.currentHero.name.slice(1);
        battle.updateLifeBar(battle.heroLifeRemaining);
        // let heroLifePercentage = battle.currentHero.currentHp / battle.currentHero.stats.hp;
        // heroLifeRemaining.style.width = battle.heroLifePercentage * 200 + "px";
        // heroLifeRemaining.style.backgroundColor = lifeColor(battle.heroLifePercentage);

        //NAME AND LIFE ENEMY
        enemyLifeName.innerText =
          battle.enemy.name[0].toUpperCase() + battle.enemy.name.slice(1);
        battle.updateLifeBar(battle.enemyLifeRemaining);
        // let enemyLifePercentage = enemy.currentHp / enemy.stats.hp;
        // enemyLifeRemaining.style.width = battle.enemyLifePercentage * 200 + "px";
        // enemyLifeRemaining.style.backgroundColor = lifeColor(battle.enemyLifePercentage);

        fightStageHero.append(fightStageHeroImage);
        fightStageHeroImage.setAttribute("src", battle.currentHero.img);

        fightStageEnemy.append(fightStageEnemyImage);
        fightStageEnemyImage.setAttribute("src", battle.enemy.img);

        fightMenuMessage.innerText = battle.message;
        fightMenuMessage.classList.add("show");

        // else if (infoFight.length !== 0) {
        //   setTimeout(()=> {
        //     fightMenuMessage.innerText = infoFight[0];
        //     fightMenuMessage.classList.add("show");
        //   }, 50)
        //   setTimeout(()=> {
        //           if (Object.keys(infoFight[1])[0] === "hero") {
        //           enemy.currentHp -= infoFight[1].hero;
        //           if (enemy.currentHp <= 0) {
        //             enemyLifeRemaining.style.width = 0 + "px";
        //             fightMenuMessage.innerText = "you defeat the enemy";
        //           }else {
        //                       enemyLifePercentage = enemy.currentHp / enemy.stats.hp;
        //                       enemyLifeRemaining.style.width =
        //                         enemyLifePercentage * 200 + "px";
        //                       enemyLifeRemaining.style.backgroundColor =
        //                         lifeColor(enemyLifePercentage);
        //         }
        //       }else{
        //         heroInBattle.currentHp -= infoFight[1].enemy;
        //           if (heroInBattle.currentHp <= 0) {
        //             heroLifeRemaining.style.width = 0 + "px";
        //           } else {
        //             heroLifePercentage =
        //               heroInBattle.currentHp / heroInBattle.stats.hp;
        //             heroLifeRemaining.style.width =
        //               heroLifePercentage * 200 + "px";
        //             heroLifeRemaining.style.backgroundColor =
        //               lifeColor(heroLifePercentage);
        //           }
        //       }
        //   }, 1000)
        //   setTimeout(()=> {
        //     fightMenuMessage.innerText = infoFight[2];
        //     fightMenuMessage.classList.add("show");
        //   }, 2000)
        //   setTimeout(()=> {
        //     if (Object.keys(infoFight[3])[0] === "hero") {
        //     enemy.currentHp -= infoFight[3].hero;
        //     if (enemy.currentHp <= 0) {
        //       enemyLifeRemaining.style.width = 0 + "px";
        //       fightMenuMessage.innerText = "you defeat the enemy";
        //     }else {
        //                 enemyLifePercentage = enemy.currentHp / enemy.stats.hp;
        //                 enemyLifeRemaining.style.width =
        //                   enemyLifePercentage * 200 + "px";
        //                 enemyLifeRemaining.style.backgroundColor =
        //                   lifeColor(enemyLifePercentage);
        //   }
        // }else{
        //   heroInBattle.currentHp -= infoFight[3].enemy;
        //     if (heroInBattle.currentHp <= 0) {
        //       heroLifeRemaining.style.width = 0 + "px";
        //     } else {
        //       heroLifePercentage =
        //         heroInBattle.currentHp / heroInBattle.stats.hp;
        //       heroLifeRemaining.style.width =
        //         heroLifePercentage * 200 + "px";
        //       heroLifeRemaining.style.backgroundColor =
        //         lifeColor(heroLifePercentage);
        //     }
        // }
        // }, 3000)
        // setTimeout(()=> {
        //   fightMenuMessage.classList.remove("show");
        //   infoFight = [];
        //   fightMenuChoice.classList.add("show");
        // }, 4000)
        // for(let i=0; i< infoFight.length; i++){
        // // infoFight.forEach((info, key) => {
        //   const test = setTimeout(() => {
        //     // console.log(infoFight[i])
        //     if (typeof infoFight[i] === "string") {
        //       fightMenuMessage.innerText = infoFight[i];
        //       fightMenuMessage.classList.add("show");
        //     } else {
        //       // console.log(Object.keys(infoFight[i])[0]);
        //       if (Object.keys(infoFight[i])[0] === "hero") {
        //         enemy.currentHp -= infoFight[i].hero;
        //         if (enemy.currentHp <= 0) {
        //           enemyLifeRemaining.style.width = 0 + "px";
        //           fightMenuMessage.innerText = "you defeat the enemy";

        //         } else {
        //           enemyLifePercentage = enemy.currentHp / enemy.stats.hp;
        //           enemyLifeRemaining.style.width =
        //             enemyLifePercentage * 200 + "px";
        //           enemyLifeRemaining.style.backgroundColor =
        //             lifeColor(enemyLifePercentage);
        //         }

        //         // infoFight.shift();
        //         // loadEvent();
        //       } else {
        //         heroInBattle.currentHp -= infoFight[i].enemy;
        //         if (heroInBattle.currentHp <= 0) {
        //           heroLifeRemaining.style.width = 0 + "px";
        //         } else {
        //           heroLifePercentage =
        //             heroInBattle.currentHp / heroInBattle.stats.hp;
        //           heroLifeRemaining.style.width =
        //             heroLifePercentage * 200 + "px";
        //           heroLifeRemaining.style.backgroundColor =
        //             lifeColor(heroLifePercentage);
        //         }

        //         // infoFight.shift();
        //         // loadEvent();
        //       }
        //     }
        //     // fightMenuMessage.classList.remove("show");
        //   }, 1000 * i);

        //   if (
        //     enemy.currentHp <= 0
        //   ) {

        //     clearTimeout(test)
        //     // break;
        //     setTimeout(() => {
        //       enemyLifeName.remove();
        //       enemyLifeRemaining.remove();
        //       fightStageHeroEnemy.remove();
        //     }, 1000);
        //   }
        // };

        //   setTimeout(() => {
        //     fightMenuMessage.classList.remove("show");
        //     infoFight = [];
        //     // console.log(!infoFight);
        //     if (infoFight.length === 0) {
        //       fightMenuChoice.classList.add("show");
        //     }
        //     loadEvent();
        //   }, 4000);

        // }

        // fightMenuMessage.addEventListener("click", () => {
        // if (infoFight.length !== 0) {
        //   // fightMenuMessage.classList.remove("show");
        //   loadEvent();
        // } else {
        // if (battle.winner) {
        //   fightMenuMessage.innerText = `${battle.winner.name.toUpperCase()} WIN`;
        // }
        setTimeout(() => {
          fightMenuMessage.classList.remove("show");
          fightMenuChoice.classList.add("show");
        }, 1500);

        // }
        // });
        let fightMenuSkillHero = document.createElement(
          "fight-menu-skill-hero"
        );
        figtMenuContainer.append(fightMenuSkillHero);
        fightMenuSkillHero.classList.add("fight-menu-skill-hero");
        fightMenuSkill.addEventListener("click", () => {
          fightMenuChoice.classList.remove("show");
          fightMenuSkillHero.classList.add("show");
          // console.log( heroInBattle.moveSet)
          // for(i=0; i<4; i++){
          // console.log(fightMenuSkillHero.childNodes.length !==
          // battle.currentHero.moveSet.length, fightMenuSkillHero.childNodes.length)
          if (fightMenuSkillHero.childNodes.length === 0) {
            battle.currentHero.moveSet.forEach((skill) => {
              // console.log(skill)
              const oneSkill = document.createElement("button");
              fightMenuSkillHero.append(oneSkill);
              oneSkill.classList.add("fight-menu-skill-hero-one");
              // if(heroInBattle.moveSet[i]){
              oneSkill.innerText = skill.name;
              // }
              oneSkill.addEventListener("click", () => {
                fightMenuSkillHero.classList.remove("show");
                fightMenuBtnPrevious.remove();
                battle.playTurn(skill);
                fightMenuMessage.innerText = battle.message;
                fightMenuMessage.classList.add("show");
                setTimeout(() => {
                  battle.updateLifeBar(battle.heroLifeRemaining);
                  battle.updateLifeBar(battle.enemyLifeRemaining);
                }, 1000);

                setTimeout(() => {
                  if (battle.checkBattle()) {
                    battle.playTurn(skill);
                    fightMenuMessage.innerText = battle.message;
                  } else {
                    fightMenuMessage.classList.add("show");
                    fightMenuChoice.classList.remove("show");
                  }
                }, 2000);
                setTimeout(() => {
                  battle.updateLifeBar(battle.heroLifeRemaining);
                  battle.updateLifeBar(battle.enemyLifeRemaining);
                  if (battle.checkBattle()) {
                    fightMenuMessage.classList.remove("show");
                    fightMenuChoice.classList.add("show");
                  }
                  battle.endTurn();
                }, 3000);

                // console.log(battle.winner)
                setTimeout(() => {
                  if (battle.winner) {
                    if (battleSong) {
                      battleSong.pause();
                      battleSong.currentTime = 0;
                    }
                    if (battle.winner.name === battle.currentHero.name) {
                      fightMenuMessage.innerText = `${battle.winner.name.toUpperCase()} WIN`;
                      battle.currentHero.songName.play();
                      if (battleSong) {
                        setTimeout(() => {
                          game.mainTheme.play();
                        }, 3000);
                      }
                      setTimeout(() => {
                        game.roundWin++;
                        game.indexEvent++;
                        figtMenuContainer.classList.remove("show");
                        fightContainer.classList.remove("show");
                        fightMenuMessage.classList.remove("show");
                        fightMenuChoice.classList.remove("show");
                        fightMenuSkillHero.classList.remove("show");
                        fightMenuSkillHero.remove();
                        fightStageHeroImage.remove();
                        fightStageEnemyImage.remove();
                        eventsTransition.init(menuGameElement);
                        enemy = 0;
                        loadEvent();
                      }, 1000);
                    } else {
                      fightMenuMessage.innerText = `BOUUUH T'ES NUUUUUL`;
                      battle.enemy.songName.play();
                      setTimeout(() => {
                        game.life--;
                        // game.indexEvent++;
                        game.indexEvent++;
                        figtMenuContainer.classList.remove("show");
                        fightContainer.classList.remove("show");
                        fightMenuMessage.classList.remove("show");
                        fightMenuChoice.classList.remove("show");
                        fightMenuSkillHero.classList.remove("show");
                        fightMenuSkillHero.remove();
                        // console.log(fightMenuSkillHero)
                        fightStageHeroImage.remove();
                        fightStageEnemyImage.remove();
                        eventsTransition.init(menuGameElement);
                        // console.log(fightStageHeroImage)
                        enemy = 0;

                        // console.log(fightContainer.classList.contains("show"))
                        // loadEvent();
                      }, 1000);
                      setTimeout(() => {
                        //   // game.life--;
                        loadEvent();
                        //   // console.log(fightContainer.classList.contains("show"))

                        //   // console.log(fightContainer.classList.contains("show"))
                      }, 1007);
                    }
                  }
                }, 3000);
                // console.log(battle.winner);
                // loadEvent();
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
}
