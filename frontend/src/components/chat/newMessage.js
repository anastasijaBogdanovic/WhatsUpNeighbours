import React,{useState,useContext,useReducer} from 'react'
import './newMessage.scss'
import {Context} from '../../Store'


export default function NewMessage(props) {

    const [newMessage,setNewMessage]=useState("");
    const [state, dispatch] = useContext(Context);
    const addMessage=()=>{

        const novaPoruka={
            tekst:newMessage,
            autor:state.stanar.ime+" "+state.stanar.prezime,
            autorId:state.stanar.id,
            vreme:new Date()
        }

        if(newMessage==="")
        {
            alert('Ne mozete poslati praznu poruku')
        }
        else{
            props.sendMessage(novaPoruka);
        }

       /*props.setState (prevState=>{
           novaPoruka.id=prevState.length;
           return [novaPoruka,...prevState]})*/
        
        setNewMessage("");

    }
    return (
          
       <div className='porukaInput'>
            <textarea className='polje'  rows='5'  placeholder="Napisite poruku"   value={newMessage} onChange={e=>setNewMessage(e.target.value)}></textarea>
            <div className='dugme' onClick={addMessage}>Posalji poruku</div>
            
        </div>
    )
}
