// @flow
import * as React from 'react';
import { Component } from 'react-simplified';

import style from './css/text-input.module.css';

class TextInputLight extends Component<{
   onChange: any => mixed,
   className: string,
   placeholder?: string,
   value?: string,
   required: boolean
}> {
   render() {
      return (
         <input
            data-testid="text-input-light"
            className={`${this.props.className} ${style['text-input']} ${style['text-input-light']}`}
            type="text"
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.onChange}
            required={this.props.required}
         />
      );
   }
}

class TextInputDark extends Component<{
   onChange: any => mixed,
   className: string,
   placeholder?: string,
   value?: string,
   required: boolean
}> {
   render() {
      return (
         <input
            data-testid="text-input-dark"
            className={`${this.props.className} ${style['text-input']} ${style['text-input-dark']}`}
            type="text"
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.onChange}
            required={this.props.required}
         />
      );
   }
}

export class TextInput {
   static Light = TextInputLight;
   static Dark = TextInputDark;
}
