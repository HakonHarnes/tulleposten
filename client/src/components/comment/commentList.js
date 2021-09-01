//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';

import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

import { commentService } from '../../services';
import { Comment } from './comment';

import style from './css/comment-list.module.css';

/**
   Used by component CommentSection 
   Displays a list of comments for an article: 
   - nickname 
   - text 
   - time published 

   @param className: class used for layout (to avoid wrapping)
   @param comments:  comments to be displayed 
 */
export class CommentList extends Component<{ className: string, comments: Comment[] }> {
   render() {
      return (
         <div className={this.props.className}>
            <div className={style.comments}>
               {this.props.comments.map((comment, i) => (
                  <div key={i} className={style.comment}>
                     <p className={style.nickname}>{comment.nickname}</p>
                     <p className={style.text}>
                        {comment.text.split('\n').map((paragraph, i) => (
                           <span key={i}>
                              {paragraph}
                              <br />
                           </span>
                        ))}
                     </p>
                     <p className={style.published}>{comment.published}</p>
                  </div>
               ))}
            </div>
         </div>
      );
   }
}
