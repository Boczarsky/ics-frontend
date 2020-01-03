import React from 'react';
import './style.css';

export interface LabeledSectionProps {
  label: string;
  labelClass?: string;
  children: any;
  contentClass?: string;
}

const LabeledSection = (props: LabeledSectionProps) => {
  const {label, children, contentClass, labelClass} = props;
  return (
    <div className="labeled-section">
      <div className={`labeled-section__label ${labelClass}`}>{label}</div>
      <div className={`labeled-section__content ${contentClass}`}>
        {children}
      </div>
    </div>
  )
}

export default LabeledSection
