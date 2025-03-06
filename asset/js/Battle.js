class Battle {
  constructor(
    teamHeros,
    enemy,
    heroLifeName,
    enemyLifeName,
    heroLifeRemaining,
    enemyLifeRemaining,
    fightStageHeroImage,
    fightStageEnemyImage,
    fightStageHero
  ) {
    this.teamHeros = teamHeros;
    this.enemy = enemy;
    this.currentHero = teamHeros[0];
    this.turn = 1;
    this.heroPlay = 0;
    this.enemyPlay = 0;
    this.heroLifePercentage =
      this.currentHero.currentHp / this.currentHero.stats.hp;
    this.enemyLifePercentage = this.enemy.currentHp / this.enemy.stats.hp;
    this.message = `${this.enemy.name} wants to fight`;
    this.heroLifeName = heroLifeName;
    this.enemyLifeName = enemyLifeName;
    this.heroLifeRemaining = heroLifeRemaining;
    this.enemyLifeRemaining = enemyLifeRemaining;
    this.fightStageHeroImage = fightStageHeroImage;
    this.fightStageEnemyImage = fightStageEnemyImage;
    this.fightStageHero = fightStageHero;
    this.endBattle = false;
    this.winner;
  }
  lifeColor(lifeDiff) {
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

  updateLifeBar(lifeBar) {
    if (!this.endBattle) {
      if (lifeBar.id === "hero-life-remaining") {
        this.heroLifePercentage =
          this.currentHero.currentHp / this.currentHero.stats.hp;
        lifeBar.style.width = this.heroLifePercentage * 250 + "px";
        lifeBar.style.backgroundColor = this.lifeColor(this.heroLifePercentage);
      } else {
        this.enemyLifePercentage = this.enemy.currentHp / this.enemy.stats.hp;
        lifeBar.style.width = this.enemyLifePercentage * 250 + "px";
        lifeBar.style.backgroundColor = this.lifeColor(
          this.enemyLifePercentage
        );
      }
    }
  }

  async blink(img) {
    img.classList.add("damage-blink");
    await this.wait(500);
    img.classList.remove("damage-blink");
  }
  async skillAnimationY(skillUse){
    const skillImage = document.createElement("div");
    this.fightStageHero.append(skillImage);
    skillImage.classList.add(skillUse.name);
    skillImage.style.background = "url(" + skillUse.img.sprite + ") 0px 0px";
    let positionSprite = skillUse.img.yMin;
    const skillGif = setInterval(() => {
      if (positionSprite <= skillUse.img.yMax) {
        skillImage.style.backgroundPosition = `0px -${positionSprite}px`;
        positionSprite += skillUse.img.yMin;
      } else {
        positionSprite = skillUse.img.yMax - skillUse.img.yMin;
        skillImage.style.backgroundPosition = `0px -${
          positionSprite
        }px`;
        
      }
    }, 40);
    // console.log(skillGif)
    await this.wait(1200)
    clearInterval(skillGif)
    skillImage.remove();
  }
  async skillAnimationX(skillUse) {
    const skillImage = document.createElement("div");
    this.fightStageHero.append(skillImage);
    skillImage.classList.add(skillUse.name);
    skillImage.style.background = "url(" + skillUse.img.sprite + ") 0px 0px";
    let positionSprite = skillUse.img.xMin;
    let leftPositionImg = 100;
    
    const skillGif = setInterval(() => {
      if (positionSprite <= skillUse.img.xMax) {
        skillImage.style.backgroundPosition = `-${positionSprite}px 0px`;
        positionSprite += skillUse.img.xMin;
      } else {
        positionSprite = skillUse.img.xMax - skillUse.img.xMin;
        skillImage.style.backgroundPositionX = `${
          positionSprite
        }px 0px`;
        
      }
      if (leftPositionImg < 650) {
        
        leftPositionImg += 50;
        skillImage.style.left = leftPositionImg + "px";
      }
    }, 100);
    // console.log(skillGif)
    await this.wait(1100)
    clearInterval(skillGif)
    skillImage.remove();
  }

  async playTurn(skillUse) {
    if (!this.endBattle) {
      if (
        (this.currentHero.stats.speed > this.enemy.stats.speed &&
          this.heroPlay === 0) ||
        this.enemyPlay === 1
      ) {
        this.heroPlay = 1;
        this.message = this.attack(this.currentHero, this.enemy, skillUse);
        if(skillUse.position === "x") await this.skillAnimationX(skillUse);
        if(skillUse.position === "y") await this.skillAnimationY(skillUse);
        await this.blink(this.fightStageEnemyImage);
        // console.log(this.message)
        
      } else {
        this.enemyPlay = 1;
        let randomIndexSkill = Math.ceil(
          Math.random() * this.enemy.moveSet.length - 1
        );
        this.message = this.attack(
          this.enemy,
          this.currentHero,
          this.enemy.moveSet[randomIndexSkill]
        );
        this.blink(this.fightStageHeroImage);
        
      }
    }
  }
  endTurn() {
    this.enemyPlay = 0;
    this.heroPlay = 0;
    this.turn++;
  }

  checkBattle() {
    if (this.currentHero.currentHp && this.enemy.currentHp) {
      return true;
    } else {
      if (this.currentHero.currentHp) {
        this.winner = this.currentHero;
      } else {
        this.winner = this.enemy;
      }
      return false;
    }
  }

  attack(caster, enemy, skillUse) {
    let casterAttack = new BattleEvent(caster, enemy, skillUse);
    // console.log(casterAttack.update());
    return casterAttack.update();
  }

  wait(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
}
