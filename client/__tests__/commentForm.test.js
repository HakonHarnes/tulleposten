//@flow
import * as React from 'react';
import ReactDOM from 'react-dom';

import '@testing-library/jest-dom/extend-expect';

import { render, fireEvent, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { CommentForm } from '../src/components/comment/commentForm';
import { Comment } from '../src/components/comment/comment';

const submitHandler = jest.fn();

afterEach(cleanup);

it('renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render(<CommentForm className="button" buttonText="Publiser kommentar" articleId={1} onSubmit={submitHandler} />, div);
   ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
   const { getByTestId } = render(<CommentForm className="button" buttonText="Publiser kommentar" articleId={1} onSubmit={submitHandler} />);
   expect(getByTestId('comment-form').children.length).toBe(3);
   expect(getByTestId('comment-form').children[0].type).toBe('text');
   expect(getByTestId('comment-form').children[1].type).toBe('textarea');
   expect(getByTestId('comment-form').children[2].type).toBe('submit');
});