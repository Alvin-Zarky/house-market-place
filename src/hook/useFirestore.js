import {useState, useEffect} from "react";
import {projectFirestore} from "../config/firebase";

export const useFirestore = () =>{
  
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [isCleanUp, setIsCleanUp] = useState(false)
  
  const deleteData = async (id) =>{
    
    try{
      setIsPending(true)
      setError(null)

      await projectFirestore.collection('listing').doc(id).delete()

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

  return { isPending, error, deleteData }
}