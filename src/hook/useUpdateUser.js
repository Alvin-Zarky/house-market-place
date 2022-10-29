import { useState, useEffect } from "react";
import { projectFirestore, authFirestore } from "../config/firebase";

export const useUpdateUser = () =>{
  
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCleanUp, setIsCleanUp] = useState(false)
   
  const updateUser = async (name, email) =>{
    setError(null)
    setIsLoading(true)

    try{
      await authFirestore.currentUser.updateProfile({ displayName:name })
      authFirestore.currentUser.updateEmail(email).then(() =>{
        if(!isCleanUp){
          setIsLoading(false)
          setError(null)
        }

      }).then(() =>{
        let objUserUpdate={
          displayName:name,
          email
        }
        projectFirestore.collection('users').doc(authFirestore.currentUser.uid).update(objUserUpdate)
      }).catch((err) =>{
        if(!isCleanUp){
          setError(err.message)
          setIsLoading(false)
        }
      })

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
  }, [])

  return { error, isLoading, updateUser }
}