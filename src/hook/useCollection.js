import {useState, useEffect, useRef} from "react"
import {projectFirestore} from "../config/firebase";

export const useCollection = (collection, _query, _orderBy, limit) =>{
  
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [document, setDocument] = useState(null)
  const [noData, setNoData] = useState(false)
  const [isCleanUp, setIsCleanUp]= useState(false)
  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current

  useEffect(() =>{
    setIsPending(true)
    setNoData(false)
    setError(null)

    let ref= projectFirestore.collection(collection)

    if(query){
      ref= ref.where(...query)
    }
    if(orderBy){
      ref= ref.orderBy(...orderBy)
    }
    if(limit){
      ref= ref.limit(limit)
    }

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
  }, [collection, query, orderBy, isCleanUp, limit])

  return { isPending, error, document, noData }
}