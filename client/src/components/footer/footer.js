// @flow
import ReactDOM from 'react-dom';
import * as React from 'react';

import { Component } from 'react-simplified';

import style from './css/footer.module.css';

//footer at bottom of page 
export class Footer extends Component {
   render() {
      return (
         <div className={style.footer}>
            <h2>Tulleposten</h2>
            <p>Håkon Harnes 2019 ©</p>
         </div>
      );
   }
}
