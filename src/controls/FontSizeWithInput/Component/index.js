/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import './styles.css';

export default class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentState: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    defaultFontSize: undefined,
    inputFontSize: 16,
  };

  componentDidMount(): void {
    const editorElm = document.getElementsByClassName('DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const editorStyles = window.getComputedStyle(editorElm[0]);
      let defaultFontSize = editorStyles.getPropertyValue('font-size');
      defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2);
      
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        defaultFontSize,
        inputFontSize: this.props.currentState.fontSize || (this.props.config.options && this.props.config.options.indexOf(Number(defaultFontSize)) >= 0 && defaultFontSize)
      });
    }
  }

  componentDidUpdate(prevProps) {    
    if (prevProps.currentState.fontSize !== this.props.currentState.fontSize) {
      this.setState({
        inputFontSize: this.props.currentState.fontSize
      });
    }
  }

  render() {
    const {
      config: { icon, className, dropdownClassName, options, title },
      onChange,
      expanded,
      doCollapse,
      onExpandEvent,
      doExpand,
      translations,
    } = this.props;

    let { currentState: { fontSize: currentFontSize } } = this.props;
    let defaultFontSize = Number(this.state.defaultFontSize);
    currentFontSize = currentFontSize || (options && options.indexOf(defaultFontSize) >= 0 && defaultFontSize);

    return (
      <div className="rdw-fontsize-wrapper" aria-label="rdw-font-size-control">
        <Dropdown
          className={classNames('rdw-fontsize-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title || translations['components.controls.fontsize.fontsize']}
        >
          {currentFontSize 
            ? <input 
                onClick={(e) => {e.stopPropagation();}} // prevent dropdown from expanding
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    this.props.onChange(e.target.value);
                    doCollapse();
                  }
                }}
                onChange={(e) => { this.setState({inputFontSize: e.target.value})}}
                type="text" 
                value={this.state.inputFontSize} 
              />                      
            : <img src={icon} alt="" />
          }
          {
            options.map((size, index) =>
              (<DropdownOption
                className="rdw-fontsize-option"
                active={currentFontSize === size}
                value={size}
                key={index}
              >
                {size}
              </DropdownOption>),
            )
          }
        </Dropdown>
      </div>
    );
  }
}
