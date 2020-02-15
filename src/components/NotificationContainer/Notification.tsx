import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface NotificationProps {
  message: string;
  time: number;
  type: string;
}

const Notification = (props: NotificationProps) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref) {
      const div: any = ref.current;
      div.classList.add('notification--show');
      setTimeout(() => {
        div.classList.remove('notification--show');
        div.classList.add('notification--hidden');
      }, props.time);
    }
  }, [ref, props.time])
  const { t } = useTranslation();
  return (
    <div ref={ref} className={`notification ${props.type}`}>{t(props.message)}</div>
  )
}

export default Notification
