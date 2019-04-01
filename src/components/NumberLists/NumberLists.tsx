import * as React from 'react';
import './NumberLists.scss';

interface Props {
  numbers?: number[];
}

const NumberLists = ({ numbers = [] }: Props) => (
  <div className="numberLists" data-testid="list-items">
    <ul>
      {numbers.map((number) => (
        <li key={number} data-testid="number">{number}</li>
      ))}
    </ul>
  </div>
);

export default NumberLists;
