/**
 * Copyright (c) 2018-present, heineiuo.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class Block {
  /**
   * @param {*} rawBlock
   */
  constructor (props) {
    const { rawBlock, contentState } = props
    this.key = rawBlock.key
    this.rawBlock = rawBlock
    this.contentState = contentState
  }

  /**
   * @param {*} rawBlock
   * @returns {number} depth
   */
  getDepth = (rawBlock) => {
    return this.rawBlock.depth
  }

  /**
   * @returns {*} entityRanges
   */
  getEntityRanges = () => {
    return this.rawBlock.entityRanges.map(({ key, offset, length }) => {
      return {
        key,
        length,
        offset,
        entity: this.contentState.getEntity(key)
      }
    })
  }

  /**
   * @returns {string} type
   */
  getType = () => {
    return this.rawBlock.type
  }

  getText = () => {
    return this.rawBlock.text
  }

  getCharacterList = () => { }
}
