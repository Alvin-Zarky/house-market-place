import {useState, useEffect} from "react";
import {projectFirestore,storageFirestore, timeStamp} from "../config/firebase";
import {useContextHook} from "./useContext";

export const useCreate= () =>{
  
  const [isPending, setIsPending] = useState(false)
  // const [progress, setProgress] = useState(null)
  // const [url, setUrls] = useState([])
  const [error, setError] = useState(null)
  const [isCleanUp, setIsCleanUp]= useState(false)
  const {user} = useContextHook()

  const createList = async (type,name,bed,bath,spot,furnish,address,offer,price,discount,image) =>{
    setIsPending(true)
    setError(null)

    try{
      const imagePath = await storageFirestore.ref(`thumnails/${user.uid}/${image.name}`).put(image)
      const imgUrl = await imagePath.ref.getDownloadURL()

      let createObj={
        type,
        name,
        bed,
        bath,
        spot,
        furnish,
        address,
        offer,
        price,
        discount,
        imgUrl
      }
    
      const createdAt= timeStamp.fromDate(new Date())
      await projectFirestore.collection('listing').add({
        ...createObj,
        createdAt,
        user_id: user.uid
      })

      if(!isCleanUp){
        setError(null)
        setIsPending(false)
      }
    }catch(err){
      if(!isCleanUp){
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }

    // try{

    //   // for upload single image only to firebase storage
    //   // const imageStorage= await storageFirestore.ref(`thumnails/${user.uid}/${image.name}`).put(image)
    //   // const imageUrl= await imageStorage.ref.getDownloadURL();

    //   //for multi images to firebase storage
    //     // // const promises = [];
    //     //   image.forEach((image) => {
    //     //   const uploadTask = storageFirestore.ref(`thumnails/${user.uid}/${image.name}`).put(image);
    //     //   // promises.push(uploadTask);
    //     //   uploadTask.on(
    //     //     "state_changed",
    //     //     (snapshot) => {
    //     //       const progress = Math.round(
    //     //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     //       );
    //     //       setProgress(progress);
    //     //     },
    //     //     (error) => {
    //     //       console.log(error);
    //     //     },
    //     //     async () => {
    //     //       await storageFirestore
    //     //         .ref("thumnails")
    //     //         .child(image.name)
    //     //         .getDownloadURL()
    //     //         .then((urls) => {
    //     //           setUrls((prev) => [...prev, urls])
    //     //       });
    //     //     }
    //     //   );
    //     // });

      

        
      
    // }catch(err){
    //   console.log(err.message)

    //   if(!isCleanUp){
    //     setIsPending(false)
    //     setError(err.message)
    //   }
    // }

  //   return new Promise((resolve, reject) =>{
  //     let uploadTask = storageFirestore.child(`thumnails/${image.name}`).put(image);
  //     uploadTask.on('state_changed', 
  //       (snapshot) => {
  //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log('Upload is ' + progress + '% done');
  //       }, 
  //       (error) => {
  //         reject(error)
  //       }, 
  //       () => {
  //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //           console.log('File available at', downloadURL);
  //           resolve(downloadURL)
  //         });
  //       }
  //     );
  //   })
  // }


  // if(!isCleanUp){
  //   setIsPending(false)
  //   setError(null)
  // }
  }

  useEffect(() =>{
    return () => setIsCleanUp(true)
  }, [])

  return { isPending, error, createList }
}