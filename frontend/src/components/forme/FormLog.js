import React, {useState,useEffect,useContext} from 'react'

import {Form,Row,Col,Button} from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import './formlog.scss'
import {Redirect} from 'react-router-dom'
import {Context} from '../../Store'


export default function FormLog() {

     const [email,setEmail]=useState("");
     const [password,setPassword]=useState("");
     const [redirect,setRedirect]=useState("");
     const [state, dispatch] = useContext(Context);

     const submit=async (ev)=>{
         ev.preventDefault();
         const response=await fetch('http://localhost:5000/WUN/Login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body: JSON.stringify({
              email:email,
              password:password,
             }
      
            )
           
          })
          /*const response=await fetch('https://localhost:5001/WUN/Logout',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            
           
          })*/

          const content=await response.json();
    console.log(content);
    if(content.message==="success"){
   
    const response1=await fetch('http://localhost:5000/WUN/stanarValidation',{
         
      headers:{'Content-Type':'application/json'},
      credentials:'include'
      
     
    })
    const content1=await response1.json();
    console.log(content1);
    const notifikacije=await fetch('http://localhost:5000/WUNNotifikacije/PokupiNotifikacije',{
    credentials:'include'
  });
  console.log(notifikacije);
  if(notifikacije.status===200){
    const notContent=await notifikacije.json();
    dispatch({type:'SET_NOTIFIKACIJE',payload:notContent});
    console.log('notifikacije:');
    console.log(notContent);
  }
 
 // await setAuth(content1.id);
 dispatch({type:'SET_STANAR',payload:content1});
 dispatch({type:'SET_AUTH',payload:content1.id});
 setRedirect(true);
 
 console.log(state.stanar);
    }
    else{
      setEmail("");
      setPassword("");
      console.log(email);
      alert('Pogresno uneti email ili lozinka! Pokusajte ponovo!');
      
    }
   /*const response1=await fetch('http://localhost:5000/WUN/stanarValidation',{
       
        headers:{'Content-Type':'application/json'},
        credentials:'include'
        
       
      })
      const content1=await response1.json();
    console.log(content1);*/
   
      


     }
     if(redirect){
        return <Redirect  to='/app'/>
        }


    return (
        <Form className='log' onSubmit={submit}>
            <div className='logSlika'>
               
            </div>
             <h2 className='text-center'>Prijavite se</h2>
            <p className='text-center'>Nemate nalog?  <a href="#!">Registrujte se</a></p>
            <FormGroup>
                <FormLabel>E-mail:</FormLabel>
                <FormControl size='sm' type="text" placeholder='Unesite svoj e-mail'  onChange={(e) => setEmail(e.target.value) }value={email}></FormControl>
            </FormGroup>
            <FormGroup>
                <FormLabel>Lozinka:</FormLabel>
                <FormControl size='sm' type="password" placeholder='Unesite svoju lozinku'  onChange={(e) => setPassword(e.target.value)} value={password}></FormControl>
           </FormGroup>
           
            <Button variant="primary" type="submit" block>
                Prijavi se
           </Button>
            
        </Form>
    )
}
