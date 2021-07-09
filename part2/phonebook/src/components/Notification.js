export const Notification = ({ message }) => {
  if (message === '') {
    return null;
  }

  return (
    <div className="success-message">
      {message}
    </div>
  )
};