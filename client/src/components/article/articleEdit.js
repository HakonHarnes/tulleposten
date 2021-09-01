//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';

import { Component } from 'react-simplified';

import { ArticleForm } from './articleForm';
import { articleService } from '../../services';
import { Article } from './article';
import { history } from '../../app';

import style from './css/article-edit-register.module.css';

/**
   Used in route /artikkel/:id/rediger
   Displays an article form (See component ArticleForm)
   Can edit the article and publish it 

   @param id: id of article 
 */
export class ArticleEdit extends Component<{ match: { params: { id: number } } }> {
   article: Article = new Article();

   render() {
      return (
         <div className={style.container}>
            <h1 className={style['page-title']}>Rediger sak</h1>
            <p className={style['page-subtitle']}>Ønsker du å endre på noe? Her kan du redigere saken!</p>
            <ArticleForm
               className={style['article-form']}
               article={this.article}
               buttonText="Publiser sak"
               onSubmit={article => this.editArticle(article)}
            />
         </div>
      );
   }

   editArticle(article: Article): void {
      articleService
         .updateArticle(article)
         .then(success => {
            alert('Saken ble endret!');
            history.push('/artikkel/' + this.props.match.params.id);
         })
         .catch(error => alert('Teknisk feil - saken ble ikke endret!'));
   }

 //fetches article to be edited on mount 
   mounted(): void {
      articleService
         .getArticle(this.props.match.params.id)
         .then(article => (this.article = article))
         .catch((error: Error) => console.error(error));
   }
}
