import React, { useRef, useEffect } from 'react';

export interface NotificationProps {
  message: string;
  time: number;
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
  return (
    <div ref={ref} className="notification">{props.message}</div>
  )
}

export default Notification
