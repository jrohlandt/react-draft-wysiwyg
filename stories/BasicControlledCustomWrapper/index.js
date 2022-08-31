/* @flow */

import React, { Component } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from '../../src';

const CustomWrapper = ({children}) => {
  return <div 
    tabIndex="0"
    onBlur={() => console.log("blur")}
    style={{border: 'solid thick red'}}>
    {children}
  </div>
}
const text = "Some text.";
class BasicControlledCustomWrapper extends Component {
  state = {
    // editorState: EditorState.createEmpty(),
    editorState: EditorState.createWithContent(ContentState.createFromText(text)),

  };

  onEditorStateChange: Function = editorState => {
    this.setState({
      editorState,
    });
  };



  render() {
    const { editorState } = this.state;
    return (
      <div className="rdw-storybook-root">
        <Editor
          CustomEditorWrapper={CustomWrapper}
          editorState={editorState}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: false, onTextAlignChanged: (style) => console.log('onTextAlignChanged', style) },
            link: { inDropdown: true },
            history: { inDropdown: true },
            fontFamily: {
              options: ['Ubuntu', 'Arial'],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              justatest: 'just a test value',
              onFontFamilyChanged: (newFont) => { console.log('onFontFamilyChanged', newFont); }
            },
            fontSize: {
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              onFontSizeChanged: (fontSize) => { console.log('onFontSizeChanged', fontSize); }
            },
            inline: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                // "monospace",
                // "superscript",
                // "subscript",
              ],
              // bold: { icon: bold, className: undefined },
              // italic: { icon: italic, className: undefined },
              // underline: { icon: underline, className: undefined },
              // strikethrough: { icon: strikethrough, className: undefined },
              // monospace: { icon: monospace, className: undefined },
              // superscript: { icon: superscript, className: undefined },
              // subscript: { icon: subscript, className: undefined },
              onInlineChanged: (val) => {
                console.log('onInlineChanged', val);
              },
            },
            colorPicker: { 
              component: undefined, 
              onColorPickerChanged: (style, color) => {console.log('onColorPickerChanged', style, color); }
            },
          }}
        />
      </div>
    );
  }
}


export default BasicControlledCustomWrapper;
