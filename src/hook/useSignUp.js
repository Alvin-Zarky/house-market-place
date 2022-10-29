import {useState, useEffect} from "react";
import {projectFirestore, authFirestore, timeStamp} from "../config/firebase";
import {useContextHook} from "./useContext";
import * as Types from "../constant/actionType";

export const useSignUp = () =>{
  
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCleanUp, setIsCleanUp] = useState(false)
  const {dispatch} =useContextHook();

  const signUp = async (email, password, displayName) =>{

    setIsPending(true)
    setError(null)
    try{

      const response= await authFirestore.createUserWithEmailAndPassword(email, password)
      if(!response){
        throw new Error('Auth SignUp could not be succeed');
      }
      await response.user.updateProfile({ displayName })
      dispatch({ type: Types.SIGN_UP, payload: response.user })
      

      let useObj={
        createdAt: timeStamp.fromDate(new Date()),
        email,
        displayName,
        id: response.user.uid,
        online:true
      }
      await projectFirestore.collection('users').doc(response.user.uid).set(useObj)
      
      if(!isCleanUp){
        setIsPending(false)
        setError(null)
      }

    }catch(err){
      console.log(err.message)
      if(!isCleanUp){
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() =>{
    return () => setIsCleanUp(true)
  }, [])

  return { error, isPending, signUp }
}