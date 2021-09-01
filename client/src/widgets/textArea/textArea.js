// @flow
import * as React from 'react';
import { Component } from 'react-simplified';

import style from './css/text-area.module.css';

class TextAreaLight extends Component<{
   onChange: any => mixed,
   className: string,
   placeholder?: string,
   value?: string,
   required: boolean
}> {
   render() {
      return (
         <textarea
            data-testid="text-area-light"
            className={`${this.props.className} ${style['text-area']} ${style['text-area-light']}`}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.onChange}
            required={this.props.required}
         />
      );
   }
}

class TextAreaDark extends Component<{
   onChange: any => mixed,
   className: string,
   placeholder?: string,
   value?: string,
   required: boolean
}> {
   render() {
      return (
         <textarea
            data-testid="text-area-dark"
            className={`${this.props.className} ${style['text-area']} ${style['text-area-dark']}`}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.onChange}
            required={this.props.required}
         />
      );
   }
}

export class TextArea {
   static Light = TextAreaLight;
   static Dark = TextAreaDark;
}
