// @flow
import * as React from 'react';
import { Component } from 'react-simplified';

import style from './css/button.module.css';

//button used for forms 
class ButtonSubmit extends Component<{ className: string, children?: React.Node }> {
   render() {
      return (
         <button data-testid="button-submit" type="submit" className={`${this.props.className} ${style.button} ${style['button-submit']}`}>
            {this.props.children}
         </button>
      );
   }
}

//neutral button used for navigation
class ButtonNeutral extends Component<{ onClick: () => mixed, className?: string, children?: React.Node }> {
   alerts: { id: number, text: React.Node, type: string }[] = [];

   render() {
      return (
         <button
            data-testid="button-neutral"
            type="button"
            className={`${this.props.className ? this.props.className : ''} ${style.button} ${style['button-neutral']}`}
            onClick={this.props.onClick}
         >
            {this.props.children}
         </button>
      );
   }
}

//danger button used for deleting 
class ButtonDanger extends Component<{ onClick: () => mixed, className: string, children?: React.Node }> {
   render() {
      return (
         <button
            data-testid="button-danger"
            type="button"
            className={`${this.props.className} ${style.button} ${style['button-danger']}`}
            onClick={this.props.onClick}
         >
            {this.props.children}
         </button>
      );
   }
}

//menu button used in header 
class ButtonMenu extends Component<{ onClick: () => mixed, className: string, children?: React.Node }> {
   render() {
      return (
         <button
            data-testid="button-menu"
            type="button"
            alt=""
            className={`${this.props.className} ${style.button} ${style['button-menu']}`}
            onClick={this.props.onClick}
         >
            {this.props.children}
         </button>
      );
   }
}

export class Button {
   static Neutral = ButtonNeutral;
   static Submit = ButtonSubmit;
   static Danger = ButtonDanger;
   static Menu = ButtonMenu;
}
