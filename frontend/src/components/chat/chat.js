import React,{useState,useEffect,useRef} from 'react'
import { HubConnectionBuilder,HubConnection
 } from '@microsoft/signalr'

import Message from './message.js'
import NewMessage from './newMessage'
import './chat.scss'

export default function Chat(props) {

     const [messages,setMessages]=useState(new Array());
     const [connection,setConnection]=useState(null);
     const [chat,setChat]=useState([]);
     const latestChat=useRef(null);
     latestChat.current=messages;

     const pokupiPoruke=async ()=>{
         const response=await fetch('http://localhost:5000/WUN/VratiCet');
         const poruke=await response.json();
         poruke.reverse();
         poruke.forEach(p=>p.vreme=new Date(new Date(p.vreme)-new Date().getTimezoneOffset()*60000).toLocaleString());
         setMessages(poruke);

     }

     useEffect(()=>{
         pokupiPoruke();

        
         const newConnection=new HubConnectionBuilder()
        
         
         .withUrl('http://localhost:5000/hubs/chat'
             
         )
         .withAutomaticReconnect()
         .build();
         
   
             newConnection.start()
             .then(result=>{
                 console.log('connect');
                 newConnection.on('ReceiveMessage',message=>{
                     const updatedChat=[...latestChat.current];
                     message.vreme=new Date(message.vreme).toLocaleString();
                     setMessages(prevState=>{return [message,...prevState]});
                     updatedChat.push(message);
                     setChat(updatedChat);

                 });
             })
             .catch(e=>console.log('ne valja',e));
         
     },[]);

     const sendMessage=async (message)=>{
         const chatMessage={
             message:message
         };
         console.log(message);
        const vreme =new Date(message.vreme.getTime()).toJSON();
         
            const response=await fetch('http://localhost:5000/WUN/Chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({

       autor:message.autor,
       autorId:message.autorId,
       vreme:vreme,
        tekst:message.tekst})

      
     
    })
   // const content=await response.json();
   // console.log(content);
        
    }
     

     
     
    return (
        <div className='chat'>
             <NewMessage className='porukaInput' sendMessage={sendMessage} />
            <div className='poruke'>
                {messages.map(message=>{
                    return(<Message key={Date.now()*Math.random()} message={message} />)
                })}
            </div>
           
        </div>
    )
}
