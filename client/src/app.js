// @flow
import ReactDOM from 'react-dom';
import * as React from 'react';

import { HashRouter, Route } from 'react-router-dom';
import { Component } from 'react-simplified';

import { ArticleRegister } from './components/article/articleRegister';
import { ArticleDetails } from './components/article/articleDetails';
import { ArticleList } from './components/article/articleList';
import { ArticleEdit } from './components/article/articleEdit';
import { Livefeed } from './components/livefeed/livefeed';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

import { createHashHistory } from 'history';
export const history = createHashHistory();

import '../css/main.css';

function App() {
   return (
      <HashRouter>
         <div className="container">
            <Header />
            <Livefeed />
            <Route exact path="/" component={ArticleList} />
            <Route exact path="/:category" component={ArticleList} />
            <Route exact path="/artikkel/:id" component={ArticleDetails} />
            <Route exact path="/artikkel/:id/rediger" component={ArticleEdit} />
            <Route exact path="/artikkel/søk/:keyword" component={ArticleList} />
            <Route exact path="/registrer/ny" component={ArticleRegister} />
            <Footer />
         </div>
      </HashRouter>
   );
}

const root = document.querySelector('.root');
if (root) ReactDOM.render(<App />, root);

export default App;
