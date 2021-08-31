import React from 'react';

const Notification = ({ noti }) => {
  return (
    <>
      {' '}
      {noti !== '' ? (
        <div style={noti === 'User Already Deleted' ? { color: 'red' } : { color: '#85e25a' }}>
          {noti}
        </div>
      ) : null}
    </>
  );
};

export default Notification;
