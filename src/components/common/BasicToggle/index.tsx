import React from 'react';
import './style.css';

export interface BasicToggleProps {
  value: boolean;
  handleToggle: (initialState: boolean) => any;
}

const BasicToggle = (props: BasicToggleProps) => {
  const {handleToggle, value} = props;

  return (
    <div className={`basic-toggle${' basic-toggle' + (value ? '--on' : '--off')}`} onClick={() => handleToggle(!value)}>
      <div className="basic-toggle__dot"/>
    </div>
  )
}

export default BasicToggle;
