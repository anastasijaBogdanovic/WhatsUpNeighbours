import React, { useState, useContext } from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Context } from "../../Store";
import './updateStanar.scss'

export default function UpdateStanar() {
  const [state, dispatch] = useContext(Context);

  const [ime, setIme] = useState(state.stanar.ime);
  const [prezime, setPrezime] = useState(state.stanar.prezime);
  const [matBr, setMatBr] = useState(state.stanar.jmbg);
  const [email, setEmail] = useState(state.stanar.email);
  const [password, setPassword] = useState(state.stanar.password);
  const [brTel, setBrTel] = useState(state.stanar.brojTelefona);
  const [brStana, setBrStana] = useState(state.stanar.brStana);
  const [brSprata, setBrSprata] = useState(state.stanar.brSprata);

  const [nameError,setNameError]=useState("");
 const [prezimeError,setPrezimeError]=useState("");
 const [emailError,setEmailError]=useState("");
 const [passwordError,setPasswordError]=useState("");
 const [matBrError,setMatBrError]=useState("");
 const [brSprataError,setBrSprataError]=useState("");
 const [brStanaError,setBrStanaError]=useState("");

 const validate=()=>{

    let valid=true;
  
    if(!email.includes('@'))
    {
      setEmailError('Molimo vas unesite ispravan email');
      valid=false;
    }
    else setEmailError('');
    
    if(!prezime)
    {
      setPrezimeError('Morate uneti svoje prezime!');
      valid=false;
    }
    else setPrezimeError('');
  
    if(!ime)
    {
      setNameError('Morate uneti svoje ime!');
      valid=false;
    }
    else setNameError('');
  
    if(!brSprata)
    {
      setBrSprataError('Morate uneti svoj broj sprata!');
      valid=false;
    }
    else setBrSprataError('');
  
    if(!brStana)
    {
      setBrStanaError('Morate uneti svoj broj stana!');
      valid=false;
    }
    else setBrStanaError('');
  
    if(password.length<5)
    {
      setPasswordError('Morate uneti lozinku od najmanje pet karaktera!')
      valid=false;
    }
    else setPasswordError('');
  
    if(matBr.length!==13)
    {
      setMatBrError('Maticni broj mora imati tacno 13 karaktera!')
      valid=false;
    }
    else setMatBrError('')
  
  
  
    return valid;
  
   }

   const submit=async (ev)=>{
       ev.preventDefault();
       if(validate())
       {
           //ovde pisi put zahtev
           console.log(state.stanar.id);
           const response=await fetch('http://localhost:5000/WUN/AzurirajProfil',{

            method:'PUT',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body: JSON.stringify({
              id:state.stanar.id,
              ime:ime,
              prezime:prezime,
              email:email,
              password:password,
              
              brStana:brStana,
              brSprata:brSprata,
              status:'stanar',
              jmbg:matBr,
              brojTelefona:brTel}
      
            )

           })
           console.log(response);

           if(response.ok){
             const azuriranStanar={
              id:state.stanar.id,
              ime:ime,
              prezime:prezime,
              email:email,
              password:password,
              
              brStana:brStana,
              brSprata:brSprata,
              status:'stanar',
              jmbg:matBr,
              brojTelefona:brTel

             }
             dispatch({type:'SET_STANAR',payload:azuriranStanar});
             alert('Uspesno ste azurirali svoj profil!')

           }
       }
       else
        alert('Unete vrednosti nisu validne! Pokusajte ponovo!')
   }
  

  return (
    <div className='stanar'>
        <h2>{state.stanar.ime+" "+state.stanar.prezime}</h2>
        <h3>-Informacije o vama-</h3>
      <Form onSubmit={submit} className='forma'>
        
         
        <FormGroup>
          <FormLabel>Vaše ime:</FormLabel>
          <FormControl
            size="sm"
            type="text"
            value={ime}
            onChange={(e) => setIme(e.target.value)}
          ></FormControl>
          {nameError ? <div className="validacija">{nameError} </div> : null}
        </FormGroup>
       
       
        <FormGroup>
          <FormLabel>Vase prezime:</FormLabel>
          <FormControl
            size="sm"
            type="text"
            value={prezime}
            onChange={(e) => setPrezime(e.target.value)}
          ></FormControl>
          {prezimeError ? (
            <div className="validacija">{prezimeError} </div>
          ) : null}
        </FormGroup>
       
       
        
        <FormGroup>
          <FormLabel>Vas maticni broj:</FormLabel>
          <FormControl
            size="sm"
            type="text"
            value={matBr}
            onChange={(e) => setMatBr(e.target.value)}
          ></FormControl>
          {matBrError ? <div className="validacija">{matBrError} </div> : null}
        </FormGroup>
      
        <FormGroup>
          <FormLabel>Vas email:</FormLabel>
          <FormControl
            size="sm"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
          {emailError ? <div className="validacija">{emailError} </div> : null}
        </FormGroup>
      
      
        <FormGroup>
          <FormLabel>Vasa lozinka:</FormLabel>
          <FormControl
            size="sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
          {passwordError ? (
            <div className="validacija">{passwordError} </div>
          ) : null}
        </FormGroup>
        
        <FormGroup>
          <FormLabel>Vas broj telefona:</FormLabel>
          <FormControl
            size="sm"
            type="text"
            value={brTel}
            onChange={(e) => setBrTel(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel>Vas broj stana:</FormLabel>
          <FormControl
            size="sm"
            type="number"
            placeholder={brStana}
            onChange={(e) => setBrStana(e.target.value)}
          ></FormControl>
          {brStanaError ? (
            <div className="validacija">{brStanaError} </div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <FormLabel>Vas broj sprata:</FormLabel>
          <FormControl
            size="sm"
            type="number"
            placeholder={brSprata}
            onChange={(e) => setBrSprata(e.target.value)}
          ></FormControl>
          {brSprataError ? (
            <div className="validacija">{brSprataError} </div>
          ) : null}
        </FormGroup>

        <Button variant="primary" type="submit" block>
          Ažuriraj svoj profil
        </Button>
      </Form>
    </div>
  );
}
