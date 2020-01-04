import React from 'react';

export interface MenuHeaderProps {
  avatarUrl?: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

const MenuHeader = (props: MenuHeaderProps) => {
  const { avatarUrl, username, firstName, lastName } = props;
  return (
    <div className="menu-header">
      <div className="menu-header__avatar">
        {avatarUrl && <img src={avatarUrl} alt={username}/>}
      </div>
      <div className="menu-header__name-wrapper">
        {(!firstName && !lastName) && <span className="menu-header__name menu-header__name--username">{username}</span>}
        {firstName && <span className="menu-header__name menu-header__name--first-name">{firstName}</span>}
        {lastName && <span className="menu-header__name menu-header__name--last-name">{lastName}</span>}
      </div>
    </div>
  )
}

export default MenuHeader;
