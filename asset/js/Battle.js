class Battle {
    constructor(
      teamHeros,
      enemy,
      heroLifeName,
      enemyLifeName,
      heroLifeRemaining,
      enemyLifeRemaining
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
      // console.log(lifeBar.id);
      if (!this.endBattle) {
        if (lifeBar.id === "hero-life-remaining") {
          this.heroLifePercentage =
            this.currentHero.currentHp / this.currentHero.stats.hp;
          lifeBar.style.width = this.heroLifePercentage * 200 + "px";
          lifeBar.style.backgroundColor = this.lifeColor(this.heroLifePercentage);
        } else {
          this.enemyLifePercentage = this.enemy.currentHp / this.enemy.stats.hp;
          lifeBar.style.width = this.enemyLifePercentage * 200 + "px";
          lifeBar.style.backgroundColor = this.lifeColor(
            this.enemyLifePercentage
          );
        }
      }
    }
  
    playTurnFirst(skillUse) {
      if (!this.endBattle) {
        if (this.currentHero.stats.speed > this.enemy.stats.speed) {
          this.heroPlay = 1;
          this.message = this.attack(this.currentHero, this.enemy, skillUse);
  
          // console.log(this.attack(this.currentHero, this.enemy, skillUse))
          return this.message;
          // console.log(this.enemy, this.currentHero, skillUse)
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
          return this.message;
        }
      }
    }
    playTurnSecond(skillUse) {
      if (!this.endBattle) {
        if (this.enemyPlay) {
          this.enemyPlay = 0;
          this.turn++;
          this.message = this.attack(this.currentHero, this.enemy, skillUse);
          return this.message;
        } else {
          this.heroPlay = 0;
          this.turn++;
          let randomIndexSkill = Math.ceil(
            Math.random() * this.enemy.moveSet.length - 1
          );
          // console.log(randomIndexSkill)
          // console.log(this.enemy, this.currentHero, skillUse)
          this.message = this.attack(
            this.enemy,
            this.currentHero,
            this.enemy.moveSet[randomIndexSkill]
          );
          return this.message;
        }
      }
    }
  
    checkBattle(){
      if(this.currentHero.currentHp && this.enemy.currentHp){
        return true
      }else{
        if(this.currentHero.currentHp)
        {
          this.winner = this.currentHero
        }else{
          this.winner = this.enemy
        }
        return false;
      }
    }
  
    attack(caster, enemy, skillUse) {
      let casterAttack = new BattleEvent(caster, enemy, skillUse);
      // console.log(casterAttack.update());
      return casterAttack.update();
    }
  }
  