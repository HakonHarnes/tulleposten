//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';

import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

import { TextInput } from '../../widgets/textInput/textInput';
import { TextArea } from '../../widgets/textArea/textArea';
import { Button } from '../../widgets/button/button';

import { commentService } from '../../services';
import { CommentList } from './commentList';
import { CommentForm } from './commentForm';
import { Comment } from './comment';

import style from './css/comment-section.module.css';

/**
   Used in component ArticleDetails 
   Displays a comment section:
   - Comment main title 
   - Comment form 
   - Comment list 

   @param className: class used for layout (to avoid wrapping)
   @param id:        id of article to get comments from 
 */
export class CommentSection extends Component<{ className: string, match: { params: { id: number } } }> {
   comments: Comment[] = [];

   render() {
      return (
         <div className={`${style.comments} ${this.props.className}`}>
            <div className={style['comment-input']}>
               <h1 className={style['comment-title']}> Kommentarer </h1>
               <CommentForm
                  className={style['comment-form']}
                  buttonText="Publiser kommentar"
                  articleId={this.props.match.params.id}
                  onSubmit={(comment) => this.comments.unshift(comment)}
               />
            </div>
            <CommentList className={style['comment-list']} comments={this.comments} />
         </div>
      );
   }

    //fetches comments to be display on mount 
   mounted(): void {
      commentService
         .getComments(this.props.match.params.id)
         .then(comments => (this.comments = comments))
         .catch((error: Error) => console.error(error));
   }
}
