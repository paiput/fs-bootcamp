import PropTypes from 'prop-types';

const Notification = ({ msg, type }) => {
  const style = {
    border: type === 'success' ? '2px solid green' : '2px solid red',
    color: type === 'success' ? 'green' : 'red',
    padding: '1rem'
  };

  return (
    <div className='notification'>
      <p style={style}>{msg}</p>
    </div>
  );
};

Notification.propTypes = {
  msg: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default Notification;