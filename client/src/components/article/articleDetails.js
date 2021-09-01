//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';

import { Component } from 'react-simplified';

import { articleService, ratingService, commentService } from '../../services';
import { CommentSection } from '../comment/commentSection';
import { Button } from '../../widgets/button/button';
import { RatingComponent } from '../rating/rating';
import { Article } from './article';
import { history } from '../../app';

import style from './css/article-details.module.css';

/**
   Used in route /artikkel/:id
   Displays the articles attributes (e.g. title, image, text... )
   Displays comment section at the bottom of the article 

   @param id: id of article 
 */
export class ArticleDetails extends Component<{ match: { params: { id: number } } }> {
   article: Article = new Article();
   estimatedReadingTime: string = '';

   render() {
      if (!this.article.id) return null;

      return (
         <div className={style.content}>
            <div className={style['image-wrapper']}>
               <img src={this.article.image} />
            </div>
            <p className={style.caption}>{this.article.caption}</p>
            <h1 className={style.title}>{this.article.title}</h1>
            <p className={style.lead}>
               {this.article.lead.split('\n').map((paragraph, i) => (
                  <span key={i}>
                     {paragraph}
                     <br />
                  </span>
               ))}
            </p>
            <div className={style.info}>
               <p className={style['reading-time']}>Lesetid er {this.estimatedReadingTime} min</p>
               <p className={style.author}>Publisert av {this.article.author}</p>
               <p className={style.published}>Publisert {this.article.published}</p>
               <p className={style.edited}>Oppdatert {this.article.edited}</p>
            </div>
            <Button.Neutral
               className={style['button-edit']}
               onClick={() => history.push('/artikkel/' + this.props.match.params.id + '/rediger')}
            >
               Rediger sak
            </Button.Neutral>
            <Button.Danger className={style['button-delete']} onClick={this.removeArticle}>
               Slett sak
            </Button.Danger>
            <RatingComponent className={style.rating} match={this.props.match} />
            <p className={style.text}>
               {this.article.text.split('\n').map((paragraph, i) => (
                  <span key={i}>
                     {paragraph}
                     <br />
                  </span>
               ))}
            </p>
            <CommentSection className={style['comment-section']} match={this.props.match} />
         </div>
      );
   }

   /**
      Deletes the article from the database 
      Need to delete comments and ratings first 
      because of foreign key constraints 
    */
   removeArticle(): void {
      if (!confirm('Er du sikker på at du vil slette saken?')) return;

      commentService
         .deleteComments(this.article)
         .then(success => deleteRatings())
         .catch(error => {
            alert('Feil ved sletting av kommentarer - saken ble ikke slettet');
            return;
         });

      const deleteRatings = () =>
         ratingService
            .deleteRatings(this.article)
            .then(success => deleteArticle())
            .catch(error => {
               alert('Feil ved sletting av vurderinger - saken ble ikke slettet');
               return;
            });

      const deleteArticle = () =>
         articleService
            .deleteArticle(this.article)
            .then(success => {
               alert('Saken ble slettet');
               history.push('/');
            })
            .catch(error => {
               alert('Teknisk feil - saken ble ikke slettet');
               return;
            });
   }

   //estimates the time it takes for the user to read the article 
   estimateReadingTime(): void {
      let wordCount = this.article.text.split(/\s+/).length; 
      let wpm = 200; //words per minute 

      let estimate: number = Math.round(wordCount / wpm);

      this.estimatedReadingTime = estimate > 0 ? '~ ' + estimate : '< 1';
   }

   //fetches article on mount and estimates reading time 
   mounted(): void {
      articleService
         .getArticle(this.props.match.params.id)
         .then(article => {
            this.article = article;
            this.estimateReadingTime();
         })
         .catch((error: Error) => console.error(error));
   }
}
