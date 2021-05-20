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
          onSpecialFocus={(name) => {
            console.log(`SpecialFocus: ${name}`);
          }}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
      </div>
    );
  }
}


export default BasicControlledCustomWrapper;
