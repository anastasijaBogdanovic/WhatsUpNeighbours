import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import InputGroup from "./inputGroup";
import "./registerform.scss";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import {Redirect} from 'react-router-dom'


export default function RegisterForm() {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [matBr, setMatBr] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordZgrada, setPasswordZgrada] = useState("");
  const [brTel, setBrTel] = useState("");
  const [brStana, setBrStana] = useState("");
  const [brSprata, setBrSprata] = useState("");
  const [redirect,setRedirect]=useState(false);

 const [nameError,setNameError]=useState("");
 const [prezimeError,setPrezimeError]=useState("");
 const [emailError,setEmailError]=useState("");
 const [passwordError,setPasswordError]=useState("");
 const [matBrError,setMatBrError]=useState("");
 const [passwordZgradaError,setPasswordZgradaError]=useState("");
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

  if(!passwordZgrada)
  {
    setPasswordZgradaError('Morate uneti lozinku zgrade da biste se registrovali!')
    valid=false;
  }
  else setPasswordZgradaError('');


  return valid;

 }

  const submit=async (ev)=>{
    const isValid=validate();
    ev.preventDefault();
    if(isValid){
    console.log(email,password,brStana,brSprata,matBr,brTel);
    const response=await fetch('http://localhost:5000/WUN/RegistrujStanara',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        ime:ime,
        prezime:prezime,
        email:email,
        password:password,
        sifraZgrade:passwordZgrada,
        brStana:brStana,
        brSprata:brSprata,
        status:'stanar',
        jmbg:matBr,
        brojTelefona:brTel}

      )
     
    })

    const content=await response.json();
    console.log(content);
    if(response.status===200)
    {
    alert('Uspesna registracija! Sada ce se stranica osveziti i moci cete da se prijavite!')
    setRedirect(true);
    }
    else if (content.message==='Pogresna lozinka zgrade!')
    {
      alert('Niste uneli tacnu lozinku zgrade! Pokusajte ponovo ili kontaktirajte upravnika!')
    }
    else
     alert('Izvinjavamo se! Nesto je poslo po zlu, molimo Vas pokusajte kasnije')
    
  }
  else alert('Morate lepo popuniti formu!')

  }
  if(redirect){
    return <Redirect  to='/pocetna'/>
    }

  return (
    <Form className="reg" onSubmit={submit}>
      <div className="regSlika"></div>
      <h2 className="text-center">Registrujte se</h2>
      <p className="text-center">
        Vec ste clan? <a href="#!">Prijavite se</a>
      </p>

      <FormGroup>
        <FormLabel>Unesite svoje ime:</FormLabel>
        <FormControl
          size="sm"
          type="text"
          placeholder="John"
          onChange={(e) => setIme(e.target.value)}
        ></FormControl>
        {nameError?
        (<div className='validacija'>{nameError} </div>):null}
       
      </FormGroup>
      <FormGroup>
        <FormLabel>Unesite svoje prezime:</FormLabel>
        <FormControl
          size="sm"
          type="text"
          placeholder="Doe"
          onChange={(e) => setPrezime(e.target.value)}
        ></FormControl>
          {prezimeError?
        (<div className='validacija'>{prezimeError} </div>):null}
      </FormGroup>
      <FormGroup>
        <FormLabel>Unesite svoj matični broj (13 karaktera):</FormLabel>
        <FormControl
          size="sm"
          type="text"
          placeholder="xxxxxxxxxx"
          onChange={(e) => setMatBr(e.target.value)}
        ></FormControl>
          {matBrError?
        (<div className='validacija'>{matBrError} </div>):null}
      </FormGroup>
      <FormGroup>
        <FormLabel>Unesite svoj e-mail:</FormLabel>
        <FormControl
          size="sm"
          type="text"
          placeholder="johndoe@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        ></FormControl>
          {emailError?
        (<div className='validacija'>{emailError} </div>):null}
      </FormGroup>
      <FormGroup>
        <FormLabel>Unesite vašu lozinku:</FormLabel>
        <FormControl
          size="sm"
          type="password"
          placeholder="Vaša lozinka"
          onChange={(e) => setPassword(e.target.value)}
        ></FormControl>
          {passwordError?
        (<div className='validacija'>{passwordError} </div>):null}
      </FormGroup>
      <FormGroup>
        <FormLabel>Unesite lozinku zgrade:</FormLabel>
        <FormControl
          size="sm"
          type="password"
          placeholder="Lozinka zgrade"
          onChange={(e) => setPasswordZgrada(e.target.value)}
        ></FormControl>
          {passwordZgradaError?
        (<div className='validacija'>{passwordZgradaError} </div>):null}
      </FormGroup>
      <FormGroup>
        <FormLabel>Unesite svoj broj telefona::</FormLabel>
        <FormControl
          size="sm"
          type="text"
          placeholder="060 0000-0000"
          onChange={(e) => setBrTel(e.target.value)}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <FormLabel>Unesite broj svog stana:</FormLabel>
        <FormControl
          size="sm"
          type="number"
          placeholder="22"
          onChange={(e) => setBrStana(e.target.value)}
        ></FormControl>
          {brStanaError?
        (<div className='validacija'>{brStanaError} </div>):null}
      </FormGroup>
      <FormGroup>
        <FormLabel>Unesite broj svog sprata::</FormLabel>
        <FormControl
          size="sm"
          type="number"
          placeholder="2"
          onChange={(e) => setBrSprata(e.target.value)}
        ></FormControl>
          {brSprataError?
        (<div className='validacija'>{brSprataError} </div>):null}
      </FormGroup>

      <Button variant="primary" type="submit" block>
        Registruj se
      </Button>
    </Form>
  );
}
