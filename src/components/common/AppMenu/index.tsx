import React, { useState, useRef } from 'react';
import './style.css';
import { ReactComponent as MenuIcon } from '../../../icons/menu.svg';
import MenuHeader from './MenuHeader';
import useOutsideClick from '../../../utils/useOutsideClick';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../reducers/Modals/actions';
import { clearUserData } from '../../../reducers/Auth/actions';
import { generateUrl } from '../UploadImage';
import userType from '../../../enums/userType';
import { useTranslation } from 'react-i18next';

const AppMenu = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const auth = useSelector((state: any) => state.auth);
  const NavItem = (props: {path: string, text: string}) => {
    const { path, text } = props;
    return match.path !== path ? (
      <div className="app-menu__nav-item clickable" onClick={() => history.push(path)}>{t(text)}</div>
    ) : null;
  }
  const [isOpen, setOpen] = useState(false);
  const menu = useRef(null);
  useOutsideClick(menu, () => {
    if (isOpen) {
      setOpen(false);
    }
  });
  const dispatch = useDispatch();
  const handleOpenModal = (modalName: string) => () => {
    dispatch(openModal(modalName));
    setOpen(false);
  }
  const handleLogout = () => {
    dispatch(clearUserData());
    history.push('/login');
  }
  const { t } = useTranslation();
  return (
    <div className="app-menu">
      {!isOpen && <div className="app-menu__icon-wrapper" onClick={() => setOpen(true)}>
        <MenuIcon className="app-menu__icon"/>
      </div>}
      {isOpen && <div className="app-menu__menu-wrapper" ref={menu}>
        <MenuHeader username={auth.login} firstName={auth.firstName} lastName={auth.lastName} avatarUrl={generateUrl(auth.avatarFileName)}/>
        <div className="app-menu__navigation">
          <NavItem path="/" text="Main page"/>
          <NavItem path="/my-account" text="My account"/>
          {[userType.client, userType.manager].includes(auth.userType) && <NavItem path="/promotions" text="Promotions"/>}
          {auth.userType === userType.client && <NavItem path="/news-feed" text="News feed"/>}
          {auth.userType === userType.manager && <NavItem path="/employees" text="Employees"/>}
          <NavItem path="/icecream-shops" text="Icecream shops"/>
          {[userType.employee, userType.manager].includes(auth.userType) && <div className="app-menu__nav-item clickable" onClick={handleOpenModal('addPoints')}>{t('Add points')}</div>}
          {[userType.employee, userType.manager].includes(auth.userType) && <div className="app-menu__nav-item clickable" onClick={handleOpenModal('redeemCoupon')}>{t('Redeem coupon')}</div>}
          <div className="app-menu__nav-item clickable" onClick={handleLogout}>{t('Logout')}</div>
        </div>
      </div>}
    </div>
  );
};

export default AppMenu;
