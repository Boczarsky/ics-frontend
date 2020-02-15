import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';

export interface LabeledSectionProps {
  label: string;
  labelClass?: string;
  children: any;
  contentClass?: string;
}

const LabeledSection = (props: LabeledSectionProps) => {
  const {label, children, contentClass, labelClass} = props;
  const { t } = useTranslation();
  return (
    <div className="labeled-section">
      <div className={`labeled-section__label ${labelClass}`}>{t(label)}</div>
      <div className={`labeled-section__content ${contentClass}`}>
        {children}
      </div>
    </div>
  )
}

export default LabeledSection
