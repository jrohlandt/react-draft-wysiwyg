/* @flow */

import React, { Component } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from '../../src';

const text = "Some text.";
class BasicControlled extends Component {
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
          editorState={editorState}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          onEditorStateChange={this.onEditorStateChange}
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

export default BasicControlled;
