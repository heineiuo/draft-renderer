export class Entity {
  /**
   * @param {*} rawEntity
   */
  constructor (rawEntity) {
    this.rawEntity = rawEntity
  }

  getType = () => {
    return this.rawEntity.type
  }

  getData = () => {
    return this.rawEntity.data
  }
}
