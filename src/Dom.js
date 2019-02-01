/**
 * Copyright (c) 2018-present, heineiuo.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

import { Block } from './Block'
import { Entity } from './Entity'

export class DraftView extends React.Component {
  static defaultProps = {
    mode: 'full', // pictures, summary
    containerStyle: {}
  }

  /**
   * @param {*} rawContentState
   */
  constructor (props) {
    super(props)
    const { entityMap, blocks } = props.rawContentState
    this.entityMap = entityMap
    this.blocks = blocks
  }

  getEntity = (key) => {
    return new Entity(this.entityMap[key])
  }

  /**
   * @returns {object[]} blocks
   */
  getBlocksAsArray = () => {
    return this.blocks.map(rawBlock => {
      return new Block({ rawBlock, contentState: this })
    })
  }

  getSummary = () => {
    const blockLength = this.blocks.length
    let index = 0
    let text = ''
    let nextText = ''
    while (index < blockLength) {
      nextText = this.blocks[index].text
      if (text.length + nextText.length > 100) break
      text += nextText
      index++
    }
    return text + nextText.substr(0, 100 - text.length)
  }

  render () {
    const { mode, containerStyle } = this.props
    if (mode === 'pictures') {
      const pictures = this.getPictures()
      if (this.props.renderPictures) {
        return this.props.renderPictures(pictures)
      } else {
        return (
          <div style={containerStyle}>
            {pictures.map(picture => {
              return (
                <img src={picture.uri} />
              )
            })}
          </div>
        )
      }
    }

    if (mode === 'summary') {
      const summary = this.getSummary()
      if (this.props.renderSummary) {
        return this.props.renderSummary(summary)
      } else {
        return (
          <div style={containerStyle}>
            <p
              style={this.props.summaryStyle}
            >{summary}...</p>
          </div>
        )
      }
    }

    const CustomBlock = this.props.customBlockRender

    return (
      <div style={containerStyle}>
        {this.getBlocksAsArray().map(block => {
          const type = block.getType()
          return (
            <div key={block.key}>
              {type.indexOf('atomic') === 0 ? <CustomBlock block={block} />
                : <p>{block.getText()}</p>
              }
            </div>
          )
        })}
      </div>
    )
  }
}
