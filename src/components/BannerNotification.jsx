import React from 'react';

const BannerNotification = ({ message, type }) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      <div>{message}</div>
    </div>
  );
};

export default BannerNotification;
