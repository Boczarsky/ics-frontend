import React, { useState, useRef } from 'react';
import './style.css';
import { ReactComponent as MenuIcon } from '../../../icons/menu.svg';
import MenuHeader from './MenuHeader';
import useOutsideClick from '../../../utils/useOutsideClick';
import { Link } from 'react-router-dom';

const AppMenu = () => {
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
          <Link to="" className="app-menu__nav-item">My account</Link>
          <Link to="" className="app-menu__nav-item">Promotions</Link>
          <Link to="" className="app-menu__nav-item">News feed</Link>
          <Link to="" className="app-menu__nav-item">Employees</Link>
          <Link to="" className="app-menu__nav-item">Icecream shops</Link>
          <Link to="" className="app-menu__nav-item">Add points</Link>
          <Link to="" className="app-menu__nav-item">Redeem coupon</Link>
          <div className="app-menu__nav-item clickable">Logout</div>
        </div>
      </div>}
    </div>
  );
};

export default AppMenu;
