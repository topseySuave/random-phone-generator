
import { render, fireEvent, getAllByTestId, getByTestId, cleanup } from 'react-testing-library';
import React from 'react';
import App from './App';
import Index from '../index';

describe('App test suite', () => {
  const wrapper = render(<App />);
  const { getByText, getByTestId } = wrapper;

  it('renders without crashing', () => {
    expect(JSON.stringify(
      Object.assign({}, Index, { _reactInternalInstance: 'censored' }),
    )).toMatchSnapshot();
  });

  it('Should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should generates numbers when the generate number button is clicked', () => {
    const generateNumberButton = getByText('Generate Numbers');
    fireEvent.click(generateNumberButton);

    const numbersListItem = getByTestId('list-items');
    expect(numbersListItem).toBeTruthy();
  });

  it('Should show the max number when it\'s button is clicked', () => {
    const generateNumberButton = getByText('Generate Numbers');
    fireEvent.click(generateNumberButton);
    const maxButton = getByText('Max');
    const number = getByTestId('number');
    fireEvent.click(maxButton);

    expect(number).toBeTruthy();
  });

  it('Should show the min number when it\'s button is clicked', () => {
    const generateNumberButton = getByText('Generate Numbers');
    fireEvent.click(generateNumberButton);
    const minButton = getByText('Min');
    const number = getByTestId('number');
    fireEvent.click(minButton);

    expect(number).toBeTruthy();
  });
  
  it('Should sort numbers when the sort options are changed ascending order', () => {
    const generateNumberButton = getByText('Generate Numbers');
    fireEvent.click(generateNumberButton);
    const numbersListItem = getByTestId('list-items');

    const selectDropdown = getByTestId('select');
    fireEvent.change(selectDropdown, { target: { value: 'ascending' }})

    expect(numbersListItem).toBeTruthy();
  });
  
  it('Should sort numbers when the sort options are changed descending order', () => {
    const generateNumberButton = getByText('Generate Numbers');
    fireEvent.click(generateNumberButton);
    const numbersListItem = getByTestId('list-items');

    const selectDropdown = getByTestId('select');
    fireEvent.change(selectDropdown, { target: { value: 'descending' }})

    expect(numbersListItem).toBeTruthy();
  });
});
