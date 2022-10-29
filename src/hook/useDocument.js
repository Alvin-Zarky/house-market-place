import {useState, useEffect} from "react"
import {projectFirestore} from "../config/firebase";

export const useDocument = (collection, id) =>{
  
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [document, setDocument] = useState(null)
  const [noData, setNoData] = useState(false)
  // const [isCleanUp, setIsCleanUp]= useState(false)

  useEffect(() =>{
    setIsPending(true)
    setNoData(false)
    setError(null)

    let ref= projectFirestore.collection(collection).doc(id)

    const unSub = ref.onSnapshot((snapshot) =>{
        if(snapshot.exists){
          setDocument(snapshot.data())
          setNoData(false)
          setIsPending(false)
          setError(null)
        }
        else{
          setNoData(true)
          setIsPending(false)
          setError(null)
        }
    }, (err) =>{
      console.log(err.message)
        setDocument(null)
        setIsPending(false)
        setError(null)
        setNoData(false)
    })


    return () =>{
      unSub()
    }
  }, [collection, id])

  return { isPending, error, document, noData }
}