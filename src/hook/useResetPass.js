import {useState, useEffect} from "react";
import { authFirestore } from "../config/firebase";
import {useContextHook} from "../hook/useContext";
import * as Types from "../constant/actionType";

export const useForgetPassword = () =>{
  
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [isCleanUp, setIsCleanUp] = useState(false)
  const {dispatch} = useContextHook()

  const resetPassword = async (email) =>{
    setIsPending(true)
    setError(null)
    try{
      await authFirestore.sendPasswordResetEmail(email)
      dispatch({ type:Types.FORGET_PASSWORD })

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

  return { isPending, error, resetPassword  }
}