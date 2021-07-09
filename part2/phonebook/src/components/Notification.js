export const Notification = ({ message }) => {
  if (message === '') {
    return null;
  }

  return (
    message.toLowerCase().includes('error')
      ? <div className="error-message">{message}</div>
      : <div className="success-message">{message}</div>
  )
};