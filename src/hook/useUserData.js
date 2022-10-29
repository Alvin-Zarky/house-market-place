import {useState, useEffect} from "react"
import {projectFirestore} from "../config/firebase";

export const useUserData = (collection, uid) =>{
  
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [document, setDocument] = useState(null)
  const [noData, setNoData] = useState(false)
  const [isCleanUp, setIsCleanUp]= useState(false)

  useEffect(() =>{
    setIsPending(true)
    setNoData(false)
    setError(null)

    let ref= projectFirestore.collection(collection).where("user_id","==",uid)

    ref.onSnapshot((snapshot) =>{
      let data=[]
      snapshot.docs.forEach((doc) =>{
        data.push({
          ...doc.data(),
          id:doc.id
        })
      })
      if(!isCleanUp){
        setNoData(data.length ===0 ? true: false)
        setDocument(data)
        setIsPending(false)
        setError(null)
      }
    }, (err) =>{
      console.log(err.message)
      
      if(!isCleanUp){
        setDocument(null)
        setIsPending(false)
        setError(null)
        setNoData(false)
      }
    })

    return () =>{
      setIsCleanUp(true)
    }
  }, [collection, isCleanUp, uid])

  return { isPending, error, document, noData }
}