//@flow
import * as React from 'react';
import ReactDOM from 'react-dom';

import '@testing-library/jest-dom/extend-expect';

import { render, fireEvent, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { TextInput } from '../src/widgets/textInput/textInput';

const changeHandler = jest.fn();

afterEach(cleanup);

it('renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render(<TextInput.Light onChange={changeHandler} className="input" required={false} />, div);
   ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
   const { getByTestId } = render(<TextInput.Light onChange={changeHandler} value="Vetle" className="input" required={true} />);
   expect(getByTestId('text-input-light')).toHaveValue('Vetle');
   expect(getByTestId('text-input-light')).toBeRequired();
   expect(getByTestId('text-input-light')).toHaveClass('input');
});

it('matches snapshot', () => {
   const tree = renderer.create(<TextInput.Light onChange={changeHandler} value="Vetle" className="input" required={false} />).toJSON();
   expect(tree).toMatchSnapshot();
});
