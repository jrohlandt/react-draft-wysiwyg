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

  constructor(props) {
    super(props);

    this.state = {
      defaultFontSize: undefined,
      inputFontSize: 16,
    };
  
    this.getCurrentFontSize = this.getCurrentFontSize.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const editorElm = document.getElementsByClassName('DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const editorStyles = window.getComputedStyle(editorElm[0]);
      let defaultFontSize = editorStyles.getPropertyValue('font-size');
      defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2);
      
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        defaultFontSize,
        inputFontSize: this.getCurrentFontSize(defaultFontSize),
      });
    }
  }

  
  componentDidUpdate(prevProps) {    
    if (prevProps.currentState.fontSize === this.props.currentState.fontSize) return;
    this.setState({ inputFontSize: this.getCurrentFontSize() }); 
  }
  
  getCurrentFontSize(defaultFontSize="") {
    const defaultFS = defaultFontSize ? defaultFontSize : this.state.defaultFontSize;
    const {currentState: {fontSize}, config: {options}} = this.props;
  
    return fontSize || (options && options.indexOf(Number(defaultFS)) >= 0 && defaultFS);
  }

  handleSubmit(e) {
    if (!e.target.value) return;
    this.props.onChange(e.target.value);
  }

  handleBlur(e) {
    this.handleSubmit(e);
  }

  handleChange(e) {
    this.setState({inputFontSize: e.target.value});
  }

  handleKeyUp(e) {
    if (e.key !== 'Enter') return;
    this.handleSubmit(e);
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
      onSpecialFocus,
    } = this.props;

    const currentFontSize = this.getCurrentFontSize();

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
          {
            !currentFontSize
              ? <img src={icon} alt="" />
              : <input 
                  style={{width: '50px', border: 'none', outline: 'none'}}
                  onClick={(e) => {e.stopPropagation();}} // prevent dropdown from expanding
                  onFocus={(e) => { onSpecialFocus('FontSizeWithInput'); }}
                  onBlur={this.handleBlur}
                  onKeyUp={this.handleKeyUp}
                  onChange={this.handleChange}
                  type="text" 
                  value={this.state.inputFontSize} 
                />
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
