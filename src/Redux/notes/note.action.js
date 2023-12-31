import axios from "axios";
import { store } from "../store.js";
import { LOGOUT } from "../users/user.type.js";
import { CREATE_NOTES_ERROR, CREATE_NOTES_LOADING, CREATE_NOTES_SUCCESS, DELETE_NOTES_ERROR, DELETE_NOTES_LOADING, DELETE_NOTES_SUCCESS, GET_NOTES_ERROR, GET_NOTES_LOADING, GET_NOTES_SUCCESS, UPDATE_NOTES_ERROR, UPDATE_NOTES_LOADING, UPDATE_NOTES_SUCCESS } from './note.types';

export const getNotes=()=>async(dispatch)=>{
  const {token} = store.getState().userReducer
   dispatch({type:GET_NOTES_LOADING})

   try{
    const res=await axios("http://localhost:4000/note/getAllNotes",{
      method:"get",
      header:{
         Authorization:token
      }
    })

  const {status,message,data}=res.data
     console.log(message);
    if(status==1){
      dispatch({type:GET_NOTES_SUCCESS,payload:data})
    }else if(status==2){
      dispatch({type:LOGOUT})
    }else{
      dispatch({type:GET_NOTES_ERROR})
    }

   }catch(error){
      dispatch({type:GET_NOTES_ERROR})
    
   }

}


export const createNotes=(obj)=>async(dispatch)=>{
  const {token} = store.getState().userReducer
   dispatch({type:CREATE_NOTES_LOADING})

   try{
    const res=await axios("http://localhost:4000/note/createNote",{
      method:"post",
      data:obj,
      header:{
         Authorization:token
      }
    })

    const {status,message}=res.data
     console.log(message);
    if(status==1){
      dispatch({type:CREATE_NOTES_SUCCESS})
      dispatch(getNotes())
    }else if(status==2){
      dispatch({type:LOGOUT})
    }else{
      dispatch({type:CREATE_NOTES_ERROR})
    }

   }catch(error){
      dispatch({type:CREATE_NOTES_ERROR})
    
   }

}

export const deleteNotes=(id)=>async(dispatch)=>{
  const {token} = store.getState().userReducer
   dispatch({type:DELETE_NOTES_LOADING})

   try{
    const res=await axios("http://localhost:4000/note/DeleteNote",{
      method:"delete",
      header:{
         Authorization:token,
         _id:id
      }
    })

    const {status,message}=res.data
     console.log(message);
    if(status==1){
      dispatch({type:DELETE_NOTES_SUCCESS})
      dispatch(getNotes())      
    }else if(status==2){
      dispatch({type:LOGOUT})
    }else{
      dispatch({type:DELETE_NOTES_ERROR})
    }

   }catch(error){
      dispatch({type:DELETE_NOTES_ERROR})
    
   }

}


export const updateNotes=(id,obj)=>async(dispatch)=>{
  const {token} = store.getState().userReducer
   dispatch({type:UPDATE_NOTES_LOADING})

   try{
    const res=await axios("http://localhost:4000/note/UpdateNote",{
      method:"put",
      data:obj,
      header:{
         Authorization:token,
         _id:id
      }
    })

    const {status,message}=res.data
     console.log(message);
    if(status==1){
      dispatch({type:UPDATE_NOTES_SUCCESS})
      dispatch(getNotes())
    }else if(status==2){
      dispatch({type:LOGOUT})
    }else{
      dispatch({type:UPDATE_NOTES_ERROR})
    }

   }catch(error){
      dispatch({type:UPDATE_NOTES_ERROR})
    
   }

}