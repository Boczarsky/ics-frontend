import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';

export interface BasicInputProps {
  label?: string;
  labelClass?: string;
  inputProps: any;
  handleChange?: (value: string) => void;
  validationError?: string;
  textarea?: boolean;
}

const BasicInput = (props: BasicInputProps) => {
  const { inputProps, handleChange, label, labelClass, validationError, textarea } = props;

  const parseInputEvent = (event: any) => {
    if (event.target) {
      const { value } = event.target as HTMLInputElement;
      if (handleChange)
        handleChange(value);
    }
  }
  const { t } = useTranslation();
  return (
    <div className={`basic-input${validationError ? ' basic-input--invalid' : ''}`}>
      {label && <div className={`basic-input__label p-font ${labelClass || ''}`}>{t(label)}</div>}
      {textarea ?
      <textarea
        onChange={parseInputEvent}
        className="basic-input__textarea"
        data-invalid={validationError ? true : false}
        {...inputProps}
      />
      :
      <input
        autoComplete="new-password"
        onChange={parseInputEvent}
        className="basic-input__input"
        data-invalid={validationError ? true : false}
        {...inputProps}
      />}
      <div className="basic-input__validation-error">{t(validationError || '')}</div>
    </div>
  )
}

export default React.memo(BasicInput);
