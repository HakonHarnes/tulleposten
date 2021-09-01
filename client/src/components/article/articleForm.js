// @flow
import * as React from 'react';

import { Component } from 'react-simplified';

import { Article } from './article';
import { Button } from '../../widgets/button/button';
import { TextInput } from '../../widgets/textInput/textInput';
import { TextArea } from '../../widgets/textArea/textArea';

import style from './css/article-form.module.css';

/**
   Used by components ArticleEdit and ArticleRegister 
   Displays an article form: 
   - text input for title 
   - text input for author 
   - text input for image url 
   - text input for image caption 
   - text area for article lead 
   - text area for article text 
   - select for category 
   - checkbox for priority 
   - submit button

   @param className:  class used for layout (to avoid wrapping)
   @param article:    the article to be edited (an empty article is passed in when registering)
   @param buttonText: text of button at bottom
   @param onSubmit:   function to run on submit 
 */
export class ArticleForm extends Component<{
   className: string,
   article: Article,
   buttonText: string,
   onSubmit: (article: Article) => mixed
}> {
   form = null;

   render() {
      return (
         <form
            data-testid="article-form"
            className={`${style.form} ${this.props.className}`}
            onSubmit={this.checkForm.bind(this)}
            ref={e => (this.form = e)}
         >
            <TextInput.Light
               className={style.title}
               placeholder="Tittel *"
               value={this.props.article.title}
               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.props.article.title = event.target.value)}
               required={true}
            />
            <TextInput.Light
               className={style.author}
               placeholder="Forfatter"
               value={this.props.article.author}
               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.props.article.author = event.target.value)}
               required={false}
            />
            <TextInput.Light
               className={style.image}
               placeholder="Bilde url *"
               value={this.props.article.image}
               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.props.article.image = event.target.value)}
               required={true}
            />
            <TextInput.Light
               className={style.caption}
               placeholder="Bildetekst"
               value={this.props.article.caption}
               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.props.article.caption = event.target.value)}
               required={false}
            />
            <TextArea.Light
               className={style.lead}
               placeholder="Ingress *"
               value={this.props.article.lead}
               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.props.article.lead = event.target.value)}
               required
            />
            <TextArea.Light
               className={style.text}
               placeholder="Tekst *"
               value={this.props.article.text}
               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.props.article.text = event.target.value)}
               required
            />
            <select
               className={style.category}
               name="category"
               value={this.props.article.category}
               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.props.article.category = event.target.value)}
            >
               <option value="">Kategori *</option>
               <option value="nyheter">Nyheter</option>
               <option value="kultur">Kultur</option>
               <option value="sport">Sport</option>
               <option value="kjendis">Kjendis</option>
            </select>

            <div className={style.priority}>
               <span>Prioriter?</span>
               <input
                  className={style.checkbox}
                  type="checkbox"
                  checked={this.props.article.priority}
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.props.article.priority = event.target.checked)}
               />
            </div>

            <Button.Submit data-testid="form-submit-button" className={style['button-form']}>
               {this.props.buttonText}
            </Button.Submit>
         </form>
      );
   }

   //checks that the form is valid before submitting
   checkForm(e: Event): void {
      e.preventDefault();

      //have to check the category because the first option (w/ value = '') is used as a placeholder
      if (!this.props.article.category) {
         alert('Vennligst velg kategori fra nedtrekksmenyen!');
         return;
      }

      //checks for valid url 
      if (!this.validURL(this.props.article.image)) {
         alert('Vennligst skriv inn en gyldig bildeadresse!');
         return;
      }

      //checks that form is valid 
      if (!this.form || !this.form.checkValidity()) {
         alert('Ugyldig input, vennligst sjekk alle feltene!');
         return;
      }
      
      if (!this.props.article.author) this.props.article.author = 'Anonym';

      this.props.onSubmit(this.props.article);
   }

   validURL(url: string) {
      let pattern = new RegExp(
         '^(https?:\\/\\/)?' + // protocol
         '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
         '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
         '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
         '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
         '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

      return !!pattern.test(url);
   }
}
