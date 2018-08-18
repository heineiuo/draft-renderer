/**
 * Copyright (c) 2018-present, heineiuo.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import {
  Image,
  Text,
  View
} from 'react-native'

import DraftBlock from './Block'
import Entity from './Entity'

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
    this.customBlockRender = props.customBlockRender
  }

  getEntity = (key) => {
    return new Entity(this.entityMap[key])
  }

  /**
   * @returns {object[]} blocks
   */
  getBlocksAsArray = () => {
    return this.blocks.map(rawBlock => {
      return new DraftBlock(rawBlock, this)
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
          <View style={containerStyle}>
            {pictures.map(picture => {
              return (
                <Image source={[{ uri: picture.uri }]} />
              )
            })}
          </View>
        )
      }
    }

    if (mode === 'summary') {
      const summary = this.getSummary()
      if (this.props.renderSummary) {
        return this.props.renderSummary(summary)
      } else {
        return (
          <View style={containerStyle}>
            <Text
              selectable
              style={this.props.summaryStyle}
            >{summary}...</Text>
          </View>
        )
      }
    }

    const CustomBlock = this.customBlockRender

    return (
      <View style={containerStyle}>
        {this.getBlocksAsArray().map(block => {
          const type = block.getType()
          return (
            <View style={{}} key={block.key}>
              {type === 'atomic' ? <CustomBlock block={this} />
                : <Text
                  selectable
                >{this.getText()}</Text>
                // Text 不支持框选文字
                // TextInput支持但是副作用是可以在文本框内上下滚动，
                // 有人提了scrollEnable的PR，还没merge
                //
                // <TextInput
                //   // selectable
                //   editable={false}
                //   scrollEnabled={false}
                //   multiline
                //   key={this.key}
                //   value={this.getText()}
                // />
              }
            </View>
          )
        })}
      </View>
    )
  }
}
