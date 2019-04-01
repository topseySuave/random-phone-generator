import * as React from 'react';
import './Button.scss';

interface Props {
  handleClick?: any;
  placeholder?: string;
};

const Button = ({ placeholder, handleClick }: Props) => {
  return (
    <button onClick={handleClick}>
      {placeholder}
    </button>
  );
};

export default Button;
