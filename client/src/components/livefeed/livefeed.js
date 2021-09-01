// @flow
import ReactDOM from 'react-dom';
import * as React from 'react';

import Marquee from 'react-double-marquee';
import { Component } from 'react-simplified';

import { livefeedService } from '../../services';
import { Article } from '../article/article';
import { history } from '../../app';

import style from './css/livefeed.module.css';

/**
   Livefeed at the top of the page 
   Fetches the most recents articles 
   every 10 seconds 
 */
export class Livefeed extends Component {
   articles: Article[] = [];
   interval = null;

   render() {
      return (
         <div className={style.livefeed}>
            <div className={style.dot} onClick={() => history.push('/')}></div>
            <div className={style.news}>
               <Marquee delay={0} childMargin={0}>
                  {this.articles.map(article => (
                     <span key={article.id} className={style['news-item']} onClick={() => history.push('/artikkel/' + article.id)}>
                        <b>{article.published}:</b> {article.title}
                     </span>
                  ))}
               </Marquee>
            </div>
         </div>
      );
   }

   //fetches articles on mount and starts polling
   mounted(): void {
      this.getArticles();
      this.interval = setInterval(() => this.getArticles(), 10000);
   }

   //fetches the articles from the database
   getArticles(): void {
      livefeedService
         .getArticles()
         .then(articles => {
            if (JSON.stringify(this.articles) != JSON.stringify(articles)) this.articles = articles;
         })
         .catch(error => console.error(error));
   }
}
