import { useState, useEffect } from "react";
import { projectFirestore, authFirestore, googleProvider, facebookProvider, timeStamp } from "../config/firebase";
import { useContextHook } from "./useContext";
import * as Types from "../constant/actionType";

export const useSignIn = () =>{
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isCleanUp, setIsCleanUp] = useState(false)
  const {dispatch} =useContextHook()

  const signInWithGoogle = async () => {

    try{
      const res = await authFirestore.signInWithPopup(googleProvider)
      if(!res){
        throw new Error('Google Auth Could not be done with your informations')
      }
      dispatch({ type: Types.WITH_GOOGLE, payload: res.user })
      
      let googleObj= {
        createdAt: timeStamp.fromDate(new Date()),
        email: res.user.email,
        displayName: res.user.displayName,
        id: res.user.uid,
        online:true
      }
      await projectFirestore.collection('users').doc(res.user.uid).set(googleObj)

    }catch(err){
      console.log(err.message)
    }

  }

  const signInWithFacebook = async () => {
    
    try{
      const res = await authFirestore.signInWithPopup(facebookProvider)
      if(!res){
        throw new Error('Facebook Auth Could not be done with your informations')
      }
      dispatch({ type: Types.WITH_FACEBOOK, payload: res.user })
      
      let facebookObj= {
        createdAt: timeStamp.fromDate(new Date()),
        email: res.user.email,
        displayName: res.user.displayName,
        id: res.user.uid,
        online:true
      }
      await projectFirestore.collection('users').doc(res.user.uid).set(facebookObj)

    }catch(err){
      console.log(err.message)

    }
  }

  const signInWithEmail = async (email, password) =>{
    setIsLoading(true)
    setError(null)

    try{
      const res= await authFirestore.signInWithEmailAndPassword(email, password)
      if(!res){
        throw new Error('Auth Sign In could not be done with your informations')
      }
      dispatch({ type: Types.SIGN_IN, payload: res.user })
      
      await projectFirestore.collection('users').doc(res.user.uid).update({
        online:true
      })
      
      if(!isCleanUp){
        setError(null)
        setIsLoading(false)
      }
    }catch(err){
      console.log(err.message)

      if(!isCleanUp){
        setError(err.message)
        setIsLoading(false)
      }
    }
  }

  useEffect(() =>{
    return () => setIsCleanUp(true)
  },[])

  return { isLoading, error, signInWithGoogle, signInWithFacebook, signInWithEmail }
} 