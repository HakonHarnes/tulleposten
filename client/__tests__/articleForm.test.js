//@flow
import * as React from 'react';
import ReactDOM from 'react-dom';

import '@testing-library/jest-dom/extend-expect';

import { render, fireEvent, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { ArticleForm } from '../src/components/article/articleForm';
import { Article } from '../src/components/article/article';

let article: Article = new Article();
article.id = 1;
article.title = 'Flott artikkel';
article.author = 'Vetle';
article.published = '12/12/2019';
article.edited = '12/12/2019';
article.image = 'https://www.guru-utvikling.no/wp-content/uploads/2017/05/Bilde-til-sak-om-bilder-750x365.jpg';
article.caption = 'bildet er kult';
article.lead = 'artikkelen er flott';
article.text = 'fin og flott tekst i artikkelen';
article.category = 'nyheter';
article.priority = false;

const submitHandler = jest.fn();

afterEach(cleanup);

it('renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render(<ArticleForm className="article-form" article={article} buttonText="Rediger sak" onSubmit={submitHandler} />, div);
   ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
   const { getByTestId } = render(<ArticleForm className="article-form" article={article} buttonText="Rediger sak" onSubmit={submitHandler} />);
   expect(getByTestId('article-form').children.length).toBe(9);
   expect(getByTestId('article-form').children[0].type).toBe('text');
   expect(getByTestId('article-form').children[8].type).toBe('submit');
});

it('submits', () => {
   const { getByTestId } = render(<ArticleForm className="article-form" article={article} buttonText="Rediger sak" onSubmit={submitHandler} />);
   
   expect(submitHandler).not.toHaveBeenCalled();
   fireEvent.submit(getByTestId('article-form'));
   expect(submitHandler).toHaveBeenCalled();
});
