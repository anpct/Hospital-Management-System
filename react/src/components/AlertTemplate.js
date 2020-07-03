import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';


const alertStyle = (type) => {
    let bg ='';
    if(type === "success")
    {
         bg = '#2fde5e';
    }
    else if(type === "info")
    {
         bg = '#ded52f';
    }
    else{
        bg = '#f7254f';
    }
    return(
        {
    backgroundColor: bg,
    color: 'white',
    padding: '10px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    width: '300px',
    boxSizing: 'border-box'
        }
    )
  }
  
  const buttonStyle = {
    marginLeft: '10px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#FFFFFF'
  }


const AlertTemplate = ({ message, options, style, close }) => {
    return (
        <div style={{ ...alertStyle(options.type), ...style }}>
        {options.type === 'info' && <InfoIcon />}
        {options.type === 'success' && <CheckCircleIcon />}
        {options.type === 'error' && <WarningIcon />}
        <span style={{ flex: 2, paddingLeft: 10 }}>{message}</span>
        <button onClick={close} style={buttonStyle}>
          <CloseIcon />
        </button>
      </div>
    )
}

export default AlertTemplate;