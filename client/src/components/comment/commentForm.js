//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';

import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

import { TextInput } from '../../widgets/textInput/textInput';
import { TextArea } from '../../widgets/textArea/textArea';
import { Button } from '../../widgets/button/button';
import { commentService } from '../../services';
import { Comment } from './comment';

import style from './css/comment-form.module.css';

/**
   Used by component CommentSection
   Displays a comment form: 
   - input field for nickname 
   - text area for text 
   - submit button

   @param className:  class used for layout (to avoid wrapping)
   @param buttonText: text of button at bottom
   @param articleId:  article of id
   @param onSubmit:   function to run on submit 
 */
export class CommentForm extends Component<{
   className: string,
   buttonText: string,
   articleId: number,
   onSubmit: (comment: Comment) => mixed
}> {
   comment: Comment = new Comment();
   form = null;

   render() {
      return (
         <form
            data-testid="comment-form"
            className={`${style.form} ${this.props.className}`}
            onSubmit={this.postComment.bind(this)}
            ref={e => (this.form = e)}
         >
            <TextInput.Light
               className={style.nickname}
               placeholder="Brukernavn"
               value={this.comment.nickname}
               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.comment.nickname = event.target.value)}
               required={true}
            />
            <TextArea.Light
               className={style.text}
               placeholder="Si din mening..."
               value={this.comment.text}
               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.comment.text = event.target.value)}
               required
            />
            <Button.Submit data-testid="form-submit-button" className={style['button-form']}>
               {this.props.buttonText}
            </Button.Submit>
         </form>
      );
   }

   //post a comment to the database
   postComment(e: Event): void {
      e.preventDefault();

      if (!this.form || !this.form.checkValidity()) {
         alert('Ugyldig input!');
         return;
      }

      this.comment.nickname = this.capitalizeFirstLetter(this.comment.nickname);

      //post comment in database
      commentService
         .postComment(this.comment)
         .then(success => {
            this.comment.published = 'akkurat nå';

            //returns a copy of the comment
            this.props.onSubmit(JSON.parse(JSON.stringify(this.comment)));

            //clears input fields
            this.comment.nickname = '';
            this.comment.text = '';
         })
         .catch(error => alert('Teknisk feil - kommentaren ble ikke publisert'));
   }

   mounted(): void {
      this.comment.articleId = this.props.articleId;
   }

   capitalizeFirstLetter(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1);
   }
}
