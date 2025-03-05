class BattleEvent {
    constructor(caster, enemy, skillUse) {
      this.caster = caster;
      this.enemy = enemy;
      this.skillUse = skillUse;
    }
  
    update() {
      if (this.kill()) {
        this.enemy.currentHp = 0;
        this.endBattle = true;
        return `${this.caster.name} use ${this.skillUse.name} on ${this.enemy.name} and ${this.enemy.name} has been deafeted`;
      } else {
        this.enemy.currentHp -=
          this.skillUse.power * (this.caster.stats[this.skillUse.style] / 100);
        return `${this.caster.name} use ${this.skillUse.name} on ${this.enemy.name}`;
      }
    }
  
    kill() {
      // console.log(this.enemy.currentHp -
      //   this.skillUse.power * (this.caster.stats[this.skillUse.style] / 100))
      if (
        this.enemy.currentHp -
          this.skillUse.power * (this.caster.stats[this.skillUse.style] / 100) <=
        0
      ) {
        return true;
      } else {
        return false;
      }
    }
  }