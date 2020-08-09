import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = props => {
  return ReactDOM.createPortal(
    props.show ? <div className="backdrop" onClick={props.clicked}></div> : null,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
