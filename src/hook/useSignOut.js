import {useState, useEffect} from "react";
import {useContextHook} from "../hook/useContext";
import { authFirestore, projectFirestore } from "../config/firebase";
import * as Types from "../constant/actionType";

export const useSignOut= () =>{
  
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [isCleanUp, setIsCleanUp] = useState(false)
  const {dispatch, user} = useContextHook()
  
  const signOut= async () =>{

    setIsPending(true)
    setError(null)
    try{
      
      await authFirestore.signOut()
      dispatch({ type: Types.SIGN_OUT })

      await projectFirestore.collection('users').doc(user.uid).update({
        online:false
      }) 

      if(!isCleanUp){
        setError(null)
        setIsPending(false)
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

  return { isPending, error, signOut }
}
