//@flow
import * as React from 'react';
import ReactDOM from 'react-dom';

import '@testing-library/jest-dom/extend-expect';

import { render, fireEvent, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { TextArea } from '../src/widgets/textArea/textArea';

const changeHandler = jest.fn();

afterEach(cleanup);

it('renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render(<TextArea.Light onChange={changeHandler} className="area" required={false} />, div);
   ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
   const { getByTestId } = render(<TextArea.Light onChange={changeHandler} value="Vetle" className="area" required={true} />);
   expect(getByTestId('text-area-light')).toHaveValue('Vetle');
   expect(getByTestId('text-area-light')).toBeRequired();
   expect(getByTestId('text-area-light')).toHaveClass('area');
});

it('matches snapshot', () => {
   const tree = renderer.create(<TextArea.Light onChange={changeHandler} value="Vetle" className="area" required={false} />).toJSON();
   expect(tree).toMatchSnapshot();
});
