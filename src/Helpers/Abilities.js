export default class Abilities {
  constructor () {
    this.abilities = []
  }

  set (abilities) {
    if (!Array.isArray(abilities)) {
      console.error('Abilities must be an array.')
    }
    abilities.forEach(ability => {
      this.abilities.push(ability)
    })
  }

  has (ability) {
    if (!this.abilities) {
      return false
    }
    return this.abilities.includes(ability)
  }
}
