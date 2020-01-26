import React from 'react';
import AppMenu from '../AppMenu';
import { ReactComponent as BackIcon } from '../../../icons/back.svg';
import './style.css';
import { useHistory } from 'react-router-dom';

export interface AppLayoutProps {
  topbarContent: any;
  children: any;
  returnPath?: string;
  handleBackClick?: () => any;
}

const AppLayout = (props: AppLayoutProps) => {
  const { topbarContent, children, returnPath, handleBackClick } = props;
  const history = useHistory();
  const handleClick = () => {
    if (handleBackClick) {
      handleBackClick();
    } else {
      history.push(returnPath || '/')
    }
  }
  return (
    <div className="app-layout">
      <div className="app-layout__topbar">
        <div className="app-layout__back-button clickable" onClick={handleClick}>
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
