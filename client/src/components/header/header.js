// @flow
import ReactDOM from 'react-dom';
import * as React from 'react';

import { Component } from 'react-simplified';

import { TextInput } from '../../widgets/textInput/textInput';
import { Button } from '../../widgets/button/button';
import { history } from '../../app';

import style from './css/header.module.css';

//header at the top of the page
export class Header extends Component {
   render() {
      return (
         <div className={style.header}>
            <div className={style.title}>
               <p>Tulleposten - vi publiserer dine saker!</p>
            </div>
            <button className={style.logo} onClick={() => history.push('/')}>
               TP
            </button>
            <Button.Menu className={style.news} onClick={() => history.push('/nyheter')}>
               NYHETER
            </Button.Menu>
            <Button.Menu className={style.culture} onClick={() => history.push('/kultur')}>
               KULTUR
            </Button.Menu>
            <Button.Menu className={style.sport} onClick={() => history.push('/sport')}>
               SPORT
            </Button.Menu>
            <Button.Menu className={style.celeb} onClick={() => history.push('/kjendis')}>
               KJENDIS
            </Button.Menu>
            <Button.Menu className={style.register} onClick={() => history.push('/registrer/ny')}>
               REGISTER SAK
            </Button.Menu>
            <TextInput.Dark className={style.search} placeholder="Søk" onChange={this.search} required={false} />
         </div>
      );
   }

   //searches for keyword in articles
   search = (e: Event): void => {
      if (!(e.target instanceof HTMLInputElement)) return;

      let keyword = e.target.value;

      if (!keyword) history.push('/');
      //go to front page if no keyword
      else history.push('/artikkel/søk/' + keyword); //show results otherwise
   };
}
