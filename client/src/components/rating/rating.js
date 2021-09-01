//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';

import { Component } from 'react-simplified';
import { ratingService } from '../../services';

import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

import './css/rating.css';

export class Rating {
   id: number;
   value: number;
   articleId: number;
}

/**
   Displays a rating component 
   Posts the rating to the database 

   @param className: class used for layout (avoid wrapping)
   @param id:        id of article to be rated 
 */
export class RatingComponent extends Component<{ className: string, match: { params: { id: number } } }> {
   rating: Rating = new Rating();
   interactive = true;
   message = '';

   render() {
      return (
         <div className={this.props.className}>
            <Rater total={5} rating={this.rating.value} interactive={this.interactive} onRate={e => this.postRating(e.rating)} />
            <p>{this.message}</p>
         </div>
      );
   }

   //posts a rating in the database 
   postRating(value: number): void {
      this.rating.articleId = this.props.match.params.id;
      this.rating.value = value;

      ratingService
         .postRating(this.rating)
         .then(success => {
            this.interactive = false;
            this.message = 'Takk for din tilbakemelding!';
         })
         .catch(error => alert('Teknisk feil - kunne ikke registrere vurdering'));
   }

   //fetches average rating on mount and displays it 
   mounted(): void {
      ratingService
         .getRating(this.props.match.params.id)
         .then(rating => (this.rating = rating))
         .catch(error => console.error(error));
   }
}
