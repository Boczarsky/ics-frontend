import React, { useState, useRef } from 'react';
import './style.css';
import { ReactComponent as MenuIcon } from '../../../icons/menu.svg';
import MenuHeader from './MenuHeader';
import useOutsideClick from '../../../utils/useOutsideClick';
import { useRouteMatch, useHistory } from 'react-router-dom';

const AppMenu = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const NavItem = (props: {path: string, text: string}) => {
    const { path, text } = props;
    return match.path !== path ? (
      <div className="app-menu__nav-item clickable" onClick={() => history.push(path)}>{text}</div>
    ) : null;
  }
  const [isOpen, setOpen] = useState(false);
  const menu = useRef(null);
  useOutsideClick(menu, () => {
    if (isOpen) {
      setOpen(false);
    }
  });
  return (
    <div className="app-menu">
      {!isOpen && <div className="app-menu__icon-wrapper" onClick={() => setOpen(true)}>
        <MenuIcon className="app-menu__icon"/>
      </div>}
      {isOpen && <div className="app-menu__menu-wrapper" ref={menu}>
        <MenuHeader username="Admin" firstName="Adam" lastName="Dminowicz"/>
        <div className="app-menu__navigation">
          <NavItem path="/" text="Main page"/>
          <NavItem path="/my-account" text="My account"/>
          <NavItem path="/promotions" text="Promotions"/>
          <NavItem path="/news-feed" text="News feed"/>
          <NavItem path="/employees" text="Employees"/>
          <NavItem path="/icecream-shops" text="Icecream shops"/>
          <div className="app-menu__nav-item clickable">Add points</div>
          <div className="app-menu__nav-item clickable">Redeem coupon</div>
          <div className="app-menu__nav-item clickable">Logout</div>
        </div>
      </div>}
    </div>
  );
};

export default AppMenu;
