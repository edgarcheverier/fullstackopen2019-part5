import React from 'react';

const Notifications = ({ error, message }) => {

  const containerStyles = {
    color: `${error ? 'red' : 'green'}`,
    border: `4px solid ${error ? 'red' : 'green'}`,
    padding: '4px',
    width: '70vw',
    margin: '5px',
    height: '45px',
    fontWeight: 'bold',
  }

  return (
    <div style={containerStyles}>
      <p>
        {message}
      </p>
    </div>
  )
};

export default Notifications;
