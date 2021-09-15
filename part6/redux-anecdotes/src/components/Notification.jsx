import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notificationChange } from '../reducers/notificationReducer';

const Notification = () => {
  const notifications = useSelector(({ notifications }) => notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('noti:', notifications);
    if (notifications.notification === 'NONE') return;
    const timer = setTimeout(() => {
      dispatch(notificationChange('NONE'));
    }, notifications.time);
    return () => clearTimeout(timer);
  }, [notifications]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return (
    <div
      style={
        notifications.notification !== 'NONE' ? style : { display: 'none' }
      }
    >
      {notifications.notification}
    </div>
  );
};

export default Notification;
