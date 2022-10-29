import React, {useState} from 'react';
import {Container, Row, Col} from "reactstrap";
import {Link} from "react-router-dom";
import * as Routes from "../../routes"
import * as Images from "../../constant/image";
import BottomMenu from "../../components/bottom-menu";
import {useForgetPassword} from "../../hook/useResetPass";
import { useContextHook } from '../../hook/useContext';
import Verify from "../verify";
import './for-pass.scss';

export default function ForgetPassword() {

  const [email, setEmail] = useState('');
  const {isPending, resetPassword, error} = useForgetPassword();
  const {emailVerify} = useContextHook()

  const handleReset= async (e) =>{
    e.preventDefault()
    resetPassword(email)
  }

  if(emailVerify){
    return <Verify />
  }

  return (
    <>
    <Container>
      <Row>
        <Col xl="12" lg="12">
          <div className="forget-passwords">
            <div className="contain">
              <div className="image">
                <img src={Images.MESSAGE} alt="forget-password" />
              </div>
              <div className="text-content">
                <p>Enter your email address associated with your account and we'll sent you a link to reset password.</p>
                <form onSubmit={handleReset}>
                  <div className="label">
                    <span>Email :</span>
                  </div>
                  <input required value={email} autoFocus onChange={(e) =>{setEmail(e.target.value)}} type="email" />
                  {!isPending && (
                    <div className="btn-reset">
                      <button>Continue</button>
                    </div>
                  )}
                  {isPending && (
                    <div className="btn-reset">
                      <button className="btn-disabled" disabled>Loading...</button>
                    </div>
                  )}
                </form>
                <div className="link-end">
                  <span>Don't have an account yet!</span> <Link to={Routes.SIGN_UP}>Sign Up</Link>
                </div>
                {error && (
                    <div className="error-message-box">
                      <span>{error}</span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    <BottomMenu />
    </>
  );
}
