import { createContext, useReducer, useEffect } from "react";
import {authFirestore} from "../config/firebase";
import * as Types from "../constant/actionType";

export const AllContext = createContext()

let initialContext= {
  user: null,  // user auth
  isAuthReady: false, // global state
  theme:'#eee', // theme context,
  userLanguage: 'en', // user language switch in context,
  emailVerify: false, //global state
  isSocial: false, //global state
}

const funcReducer =(state, action) =>{
  switch(action.type){
    case Types.SIGN_UP:
      return { ...state, user: action.payload, isAuthReady:true}
    case Types.SIGN_IN:
      return { ...state, user: action.payload, isAuthReady:true}
    case Types.SIGN_OUT:
      return { ...state, user:null, isSocial:false }
    case Types.FORGET_PASSWORD:
      return { ...state, emailVerify: true }
    case Types.SUCCESS_VERIFY:
      return { ...state, emailVerify:false }
    case Types.WITH_GOOGLE:
      return { ...state, user: action.payload, isAuthReady:true, isSocial:true }
      case Types.WITH_FACEBOOK:
        return { ...state, user: action.payload, isAuthReady:true, isSocial:true }
    default:
      return state
  }
}

export const ContextProvider= ({children}) =>{

  const [state, dispatch] = useReducer(funcReducer, initialContext)
  
  useEffect(() =>{
    const unsub= authFirestore.onAuthStateChanged(user =>{
      if(user){
        user.providerData.forEach(val =>{
          if(val.providerId === "facebook.com"){
            dispatch({type: Types.WITH_FACEBOOK, payload:user, isSocial:true})
          }
          else if(val.providerId === "google.com"){
            dispatch({type: Types.WITH_GOOGLE, payload:user, isSocial:true})
          }
          else{
            dispatch({ type: Types.SIGN_UP, payload: user })
          }
        })
      }
      dispatch({ type: Types.SIGN_UP, payload: user })
      unsub()
    })

    // const unsub= authFirestore.onAuthStateChanged(user =>{
    //   dispatch({ type: Types.SIGN_UP, payload: user })
    //   unsub()
    // })
  }, [])

  return (
    <AllContext.Provider value={{...state, dispatch}}>
      {children}
    </AllContext.Provider>
  )
}