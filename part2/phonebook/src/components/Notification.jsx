import React from 'react';

const Notification = ({ noti }) => {
  return (
    <>
      {' '}
      {noti !== '' ? (
        <div style={noti.type === 'error' ? { color: 'red' } : { color: '#85e25a' }}>
          {noti.message}
        </div>
      ) : null}
    </>
  );
};

export default Notification;
