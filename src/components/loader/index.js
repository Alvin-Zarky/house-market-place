import React from 'react';
import ReactDOM from 'react-dom';
import './loader.scss';

export default function Loader() {
  return ReactDOM.createPortal((
    <>
    <div className="loading">
      <div className="spinner">
        <div className="spinner-1"></div>
        <div className="spinner-2"></div>
        <div className="spinner-3"></div>
      </div>
    </div>
    </>
  ), document.body);
}
