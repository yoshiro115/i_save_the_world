class BattleEvent {
  constructor(caster, enemy, skillUse) {
    this.caster = caster;
    this.enemy = enemy;
    this.skillUse = skillUse;
  }

  update() {
    let realNameCaster = this.caster.name.replace("_", " ");
    let realNameEnemy = this.enemy.name.replace("_", " ");
    while (realNameCaster.includes("_")) {
      realNameCaster = realNameCaster.replace("_", " ");
    }
    while (realNameEnemy.includes("_")) {
      realNameEnemy = realNameEnemy.replace("_", " ");
    }
    if (this.kill()) {
      this.enemy.currentHp = 0;
      this.endBattle = true;
      return `${realNameCaster} use ${this.skillUse.name} on ${realNameEnemy} and ${realNameEnemy} has been deafeted`;
    } else {
      this.enemy.currentHp -=
        this.skillUse.power * (this.caster.stats[this.skillUse.style] / 100);
      return `${realNameCaster} use ${this.skillUse.name} on ${realNameEnemy}`;
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
