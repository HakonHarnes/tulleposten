//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';

import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

import { articleService } from '../../services';
import { Article } from './article';
import { history } from '../../app';

import style from './css/article-list.module.css';

/**
   Used in routes /, /:category, /artikkel/søk/:keyword
   Displays the articles

   @param category: category of articles 
   @param keyword: keyword to be found in articles
 */
export class ArticleList extends Component<{ match: { params: { category: ?string, keyword: ?string } } }> {
   articles: Article[] = [];

   render() {
      return (
         <div className={style.content}>
            {this.articles.map(article => (
               <div className={style['article-wrapper']} key={article.id}>
                  <div className={style['image-wrapper']}>
                     <img src={article.image} onClick={() => history.push('/artikkel/' + article.id)} />
                  </div>
                  <NavLink className={style.title} exact to={'/artikkel/' + article.id}>
                     {article.title}
                  </NavLink>
               </div>
            ))}
         </div>
      );
   }

   //fetches articles to be display on mount 
   mounted(): void {
      articleService
         .getArticles(this.props.match.params.category, this.props.match.params.keyword)
         .then(articles => (this.articles = articles))
         .catch((error: Error) => console.error(error));
   }
}
