import React from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import Notification from './Notification';

const NotificationContainer = () => {
  const notifications = useSelector((state: any) => state.notifications.list);
  return (
    <div className="notification-container">
    {notifications.map((notification: any) => {
      return (
        <Notification key={notification.id} type={notification.type} message={notification.message} time={notification.time}/>
      );
    })}
    </div>
  )
};

export default NotificationContainer;
