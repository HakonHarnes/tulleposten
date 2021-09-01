//@flow
import * as React from 'react';
import ReactDOM from 'react-dom';

import '@testing-library/jest-dom/extend-expect'

import { render, fireEvent, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer'; 

import { Button } from '../src/widgets/button/button';

const buttonHandler = jest.fn(); 

afterEach(cleanup); 

it('renders without crashing', () => {
   const div = document.createElement('div'); 
   ReactDOM.render(<Button.Neutral className='button' onClick={() => buttonHandler()}>Click me!</Button.Neutral>, div); 
   ReactDOM.unmountComponentAtNode(div);
}); 

it('renders correctly', () => {
   const { getByTestId } = render(<Button.Neutral className='button' onClick={() => buttonHandler()}>Click me!</Button.Neutral>); 
   expect(getByTestId('button-neutral')).toHaveTextContent('Click me!'); 
   expect(getByTestId('button-neutral')).toHaveClass('button'); 
}); 

it('calls onClick function when clicked', () => {
   const { getByTestId } = render(<Button.Neutral className='button' onClick={() => buttonHandler()}>Click me!</Button.Neutral>); 

   expect(buttonHandler).not.toHaveBeenCalled(); 
   fireEvent.click(getByTestId('button-neutral')); 
   expect(buttonHandler).toHaveBeenCalled(); 
});

it('matches snapshot', () => {
   const tree = renderer.create(<Button.Neutral className='button' onClick={() => buttonHandler()}>Click me!</Button.Neutral>).toJSON(); 
   expect(tree).toMatchSnapshot(); 
}); 