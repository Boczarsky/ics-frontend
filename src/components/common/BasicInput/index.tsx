import React from 'react';
import './style.css';

export interface BasicInputProps {
  label?: string;
  inputProps: any;
  handleChange?: (value: string) => void;
  validationError?: string;
}

const BasicInput = (props: BasicInputProps) => {
  const { inputProps, handleChange, label, validationError } = props;

  const parseInputEvent = (event: any) => {
    if (event.target) {
      const { value } = event.target as HTMLInputElement;
      if (handleChange)
        handleChange(value);
    }
  }
  return (
    <div className={`basic-input${validationError ? ' basic-input--invalid' : ''}`}>
      {label && <div className="basic-input__label p-font">{label}</div>}
      <input
        onChange={parseInputEvent}
        className="basic-input__input"
        data-invalid={validationError ? true : false}
        {...inputProps}
      />
      <div className="basic-input__validation-error">{validationError}</div>
    </div>
  )
}

export default React.memo(BasicInput);
