//@flow
import React from 'react';
import ReactDOM from 'react-dom';

import { createMemoryHistory } from 'history';
import type { MemoryHistory } from 'history/createMemoryHistory';

import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

import App from '../src/app';

/**
                 --- NOTE --- 
   Rendering the app when the server is not 
   running generates a lot of errors. I therefore 
   temporarily redefine console.error() to prevent 
   cluddering the terminal with server connection errors.
*/
(console: any).error = function() {};

it('renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render(<App />, div);
   ReactDOM.unmountComponentAtNode(div);
});

test('renders at landing page', () => {
   const history: MemoryHistory = createMemoryHistory();

   render(
      <Router history={history}>
         <App />
      </Router>
   );

   expect(history.location.pathname).toBe('/');
});
