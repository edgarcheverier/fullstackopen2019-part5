import React from 'react';
import PropTypes from 'prop-types';

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

Notifications.propTypes = {
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}

export default Notifications;
