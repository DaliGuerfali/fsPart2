const SuccessNotification = ({ message }) => message !== null ? <div className="success">{message}</div> : null;
const ErrorNotification = ({ message }) => message !== null ? <div className="error">{message}</div> : null;

export { 
    SuccessNotification, 
    ErrorNotification 
}