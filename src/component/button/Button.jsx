import React from 'react';

import './button.scss';

const Button = (props) => {
  return (
      <button className={`btn ${props.className}`}
              onClick={props.onClick}
      >
        {props.children}
      </button>
  );
};

export default Button;

export const OutlineButton = (props) => (
    <Button className={`btn btn-outline ${props.className}`}
            onClick={props.onClick}        
    >
      {props.children}
    </Button>
);