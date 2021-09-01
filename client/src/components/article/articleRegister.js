//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';

import { Component } from 'react-simplified';

import { articleService } from '../../services';
import { ArticleForm } from './articleForm';
import { Article } from './article';
import { history } from '../../app';

import style from './css/article-edit-register.module.css';

/**
   Used in route /registrer/ny
   Displays an article form
   Displays an article form (See component ArticleForm)
   Can enter attributes for an article an publish it
 */
export class ArticleRegister extends Component {
   article: Article = new Article();
   form = null;

   render() {
      return (
         <div className={style.container}>
            <h1 className={style['page-title']}>Registrer sak</h1>
            <p className={style['page-subtitle']}> Har du noe på hjertet? Her kan du registrere din sak!</p>
            <ArticleForm
               className={style['article-form']}
               article={this.article}
               buttonText="Publiser sak"
               onSubmit={article => this.registerArticle(article)}
            />
         </div>
      );
   }

   //register an article in the database
   registerArticle(article: Article): void {
      articleService
         .postArticle(article)
         .then(sucess => {
            alert('Saken ble publisert');
            history.push('/');
         })
         .catch(error => alert('Teknisk feil - saken ble ikke publisert'));
   }
}
