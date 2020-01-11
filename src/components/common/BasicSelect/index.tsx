import React from 'react';
import './style.css';

export interface BasicSelectProps {
  label?: string;
  labelClass?: string;
  selectProps: any;
  handleChange?: (value: string) => void;
  validationError?: string;
  options: any[];
  nameKey: string;
  valueKey: string;
}

const BasicSelect = (props: BasicSelectProps) => {
  const { selectProps, handleChange, label, labelClass, validationError, options, nameKey, valueKey } = props;

  const parseInputEvent = (event: any) => {
    if (event.target) {
      const { value } = event.target as HTMLSelectElement;
      if (handleChange)
        handleChange(value);
    }
  }
  return (
    <div className={`basic-select${validationError ? ' basic-select--invalid' : ''}`}>
      {label && <div className={`basic-select__label p-font ${labelClass || ''}`}>{label}</div>}
      <select
        onChange={parseInputEvent}
        className="basic-select__select"
        data-invalid={validationError ? true : false}
        {...selectProps}
      >
        {options.map(optionItem => (<option value={optionItem[valueKey]}>{optionItem[nameKey]}</option>))}
      </select>
      <div className="basic-select__validation-error">{validationError}</div>
    </div>
  )
}

export default BasicSelect;