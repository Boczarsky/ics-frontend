import React, { ChangeEvent } from 'react';
import './style.css';
import randomKey from '../../../utils/randomKey';
import { useTranslation } from 'react-i18next';

export interface BasicSelectProps {
  label?: string;
  labelClass?: string;
  selectProps: any;
  handleChange?: (value: any) => void;
  validationError?: string;
  options: any[];
  nameKey: string;
  valueKey: string;
  emptyOption?: boolean;
}

const BasicSelect = (props: BasicSelectProps) => {
  const { selectProps, handleChange, label, labelClass, validationError, options, nameKey, valueKey, emptyOption } = props;

  const handleOnChange = (event: any) => {
    if (event.target) {
      const { value } = event.target as HTMLSelectElement;
      if (handleChange)
        handleChange(value);
    }
  }
  const { t } = useTranslation();
  return (
    <div className={`basic-select${validationError ? ' basic-select--invalid' : ''}`}>
      {label && <div className={`basic-select__label p-font ${labelClass || ''}`}>{t(label)}</div>}
      <select
        onChange={handleOnChange}
        className="basic-select__select"
        data-invalid={validationError ? true : false}
        {...selectProps}
      >
        {emptyOption && <option></option>}
        {options.map(optionItem => (<option key={randomKey()} value={optionItem[valueKey]}>{optionItem[nameKey]}</option>))}
      </select>
      <div className="basic-select__validation-error">{t(validationError || '')}</div>
    </div>
  )
}

export default React.memo(BasicSelect);
