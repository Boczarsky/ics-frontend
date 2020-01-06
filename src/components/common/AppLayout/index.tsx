import React from 'react';
import AppMenu from '../AppMenu';
import { ReactComponent as BackIcon } from '../../../icons/back.svg';
import './style.css';
import { useHistory } from 'react-router-dom';

export interface AppLayoutProps {
  topbarContent: any;
  children: any;
}

const AppLayout = (props: AppLayoutProps) => {
  const { topbarContent, children } = props;
  const history = useHistory();
  return (
    <div className="app-layout">
      <div className="app-layout__topbar">
        <div className="app-layout__back-button clickable" onClick={() => history.push('/')}>
          <BackIcon className="app-layout__back-icon"/>
        </div>
        <div className="app-layout__topbar-content-wrapper">
          {topbarContent}
        </div>
        <div className="app-layout__menu-wrapper">
          <div className="app-layout__menu">
            <AppMenu/>
          </div>
        </div>
      </div>
  <div className="app-layout__content">{children}</div>
    </div>
  )
};

export default AppLayout;
