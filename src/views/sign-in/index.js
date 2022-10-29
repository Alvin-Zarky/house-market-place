import React,{useState} from 'react';
import {Container} from "reactstrap";
import { Link } from 'react-router-dom';
import {AiOutlineCaretRight} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {BsFacebook} from "react-icons/bs";
import BottomMenu from '../../components/bottom-menu';
import { useSignIn } from '../../hook/useSignIn';
import * as Routes from "../../routes";
import './sign-in.scss';

export default function SignIn() {
  
  const [email, setEmail]= useState('')
  const [password, setPassword] = useState('')
  const {signInWithGoogle, signInWithFacebook, signInWithEmail, isLoading, error} = useSignIn()
  
  const handleSignIn = (e) =>{
    e.preventDefault()
    signInWithEmail(email, password)
  }

  return (
    <>
      <Container fluid>
        <Container>
          <div className="contain-page">
            <h1>Welcome Back!</h1>
            <form onSubmit={handleSignIn}>
              <div className="email">
                <div><span>Email :</span></div>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} required placeholder="Email" />
              </div>
              <div className="password">
                <div><span>Password :</span></div>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} required placeholder="Password" />
              </div>
              <div className="forget-password">
                <Link to={Routes.FORGET_PASSWORD}>
                  Forget password
                </Link>
              </div>
              <div className="errr-message">
                {error && (
                  <span>{error}</span>
                )}
              </div>
              {!isLoading && (
                <button className="sign-in">
                {/* {!isLoading && <span>Sign In</span>}
                {isLoading && <span>Signing In...</span>} */}
                <span>Sign In</span>
                <div className="pointer-sign">
                  <AiOutlineCaretRight />
                </div>
              </button>
              )}
              {isLoading && (
                <button className="sign-in">
                {/* {!isLoading && <span>Sign In</span>}
                {isLoading && <span>Signing In...</span>} */}
                <span>Signing In...</span>
                <div className="pointer-sign">
                  <AiOutlineCaretRight />
                </div>
              </button>
              )}
            </form>
            <div className="process-sign-in">
              <span>Sign in with</span>
              <div className="icon">
                <div className="icon-google" onClick={signInWithGoogle}>
                  <FcGoogle />
                </div>
                <div className="icon-facebook" onClick={signInWithFacebook}>
                  <BsFacebook />
                </div>
              </div>
              <Link to={Routes.SIGN_UP}>
                Sign Up Instead
              </Link>
            </div>
          </div>
        </Container>
      </Container>
      <BottomMenu />
    </>
  );
}
