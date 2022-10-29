import React,{useState} from 'react';
import {Container} from "reactstrap";
import { Link } from 'react-router-dom';
import {AiOutlineCaretRight} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {BsFacebook} from "react-icons/bs";
import {useSignUp} from "../../hook/useSignUp";
import {useSignIn} from "../../hook/useSignIn";
import * as Routes from "../../routes";
import BottomMenu from "../../components/bottom-menu";
import '../sign-in/sign-in.scss';
import './sign-up.scss';

export default function SignUp() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signUp, isPending, error} = useSignUp();
  const {signInWithGoogle, signInWithFacebook} = useSignIn()

  const handelSubmit = async (e) =>{
    signUp(email, password, name)
    e.preventDefault()
  }

  const handleGoogle= async () =>{
    signInWithGoogle()
  }

  const handleFacebook = async () =>{
    signInWithFacebook()
  }

  return (
    <>
      <Container fluid>
        <Container>
          <div className="contain-page">
            <h1>Welcome Back!</h1>
            <form onSubmit={handelSubmit}>
              <div className="name">
                <div><span>Name :</span></div>
                <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Name" required />
              </div>
              <div className="email">
                <div><span>Email :</span></div>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" required/>
              </div>
              <div className="password">
                <div><span>Password :</span></div>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" required/>
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
              <button className="sign-in">
                {!isPending && <span>Sign Up</span>}
                {isPending && <span>Signing Up...</span>}
                <div className="pointer-sign">
                  <AiOutlineCaretRight />
                </div>
              </button>
            </form>
            <div className="process-sign-in">
              <span>Sign up with</span>
              <div className="icon">
                <div className="icon-google" onClick={handleGoogle}>
                  <FcGoogle />
                </div>
                <div className="icon-facebook" onClick={handleFacebook}>
                  <BsFacebook />
                </div>
              </div>
              <Link to={Routes.SIGN_IN}>
                Sign In Instead
              </Link>
            </div>
          </div>
        </Container>
      </Container>
      <BottomMenu />
    </>
  );

}
