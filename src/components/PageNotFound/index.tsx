import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const PageNotFound = () => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <div className="page-not-found">
      <div>{t('Page not found')}</div>
      <div className="back-button" onClick={() => history.push('/')}>{t('Back')}</div>
    </div>
  )
};

export default PageNotFound;
