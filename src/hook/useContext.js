import {useContext} from "react";
import {AllContext} from "../context/allContext";

export const useContextHook = () =>{
  const contextHook = useContext(AllContext);
  if(!contextHook){
    throw new Error('Context hook should be in the context provider');
  }
  return contextHook;
}