const Notification = ({ msg, type }) => {
  const style = {
    border: type === 'success' ? '2px solid green' : '2px solid red',
    color: type === 'success' ? 'green' : 'red',
    padding: '1rem' 
  };
  
  return (
    <div>
      <p style={style}>{msg}</p>
    </div>
  );
};

export default Notification;