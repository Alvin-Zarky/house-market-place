import React from 'react';
import * as Images from "../../constant/image";
import * as Routes from "../../routes";
import * as Types from "../../constant/actionType";
import { useContextHook } from '../../hook/useContext';
import { Link } from 'react-router-dom';
import './verify.scss';

export default function Verify() {

  const {dispatch} = useContextHook();
  const handleSubmit= () =>{
    dispatch({ type: Types.SUCCESS_VERIFY })
  }

  return (
    <>
      <div className="verify-message">
        <div className="image">
          <img src={Images.MESSAGE} alt="verify" />
        </div>
        <div className="text-verify">
          <span>Reset Password URL has been sent ot your email</span>
          <p>Login to upir email account and click on the link provided to reset your password</p>
        </div>
        <div className="btn-ok">
          <Link to={Routes.SIGN_IN}>
            <button onClick={handleSubmit}>Ok</button>
          </Link>
        </div>
      </div>
    </>
  );
}
