
import React,{useState,useEffect} from 'react';
import Sidebar from './components/sidebar/Sidebar';

import OglasnaTabla from './components/oglasna_tabla/OglasnaTabla'
import Obavestenja from './components/obavestenja/obavestenja'
import Chat from './components/chat/chat'
import Predlozi from './components/predlozi/predlozi'
import Sastanci from './components/sastanak/Sastanci'
import Stanari from './components/stanari/stanari'
import Pocetna from './components/pocetna/pocetna'
import UpdateStanar from'./components/forme/updateStanar'

import Store from './Store'
import Aplikacija from './Aplikacija'



import {BrowserRouter as Router, Switch, Route,useRouteMatch,Redirect} from 'react-router-dom'
import './app.css'

function App() {
 /* const response1=await fetch('http://localhost:5000/WUN/stanarValidation',{
       
    headers:{'Content-Type':'application/json'},
    credentials:'include'
    
   
  })
  const content1=await response1.json();
  console.log(content1);
console.log(content1);*/
const [auth,setAuth]=useState(false);


  const niz=[{id:0, tekst:'Danas se desilo ovo', vreme:'danas',autor:'Pera Peric'},
  { id:1, tekst:'Danas se desilo ovo', vreme:'danas',autor:'Pera Peric'},
  { id:2, tekst:'Danas se desilo ovo', vreme:'danas',autor:'Pera Peric'},
  { id:3, tekst:'Danas se desilo ovo', vreme:'danas',autor:'Pera Peric'}


]

const stanari=[
  {id:0,ime:'Pera',prezime:'Peric',brojSprata:6,brojStana:18,email:'prea.peric@gmail.com',brojTelefona:'06097998'},
  {id:1,ime:'Dragan',prezime:'Peric',brojSprata:2,brojStana:14,email:'drper@outlook.com',brojTelefona:'6753224'},
  {id:2,ime:'Dragan',prezime:'Andric',brojSprata:8,brojStana:13,email:'drper@outlook.com',brojTelefona:'6753224'},
  {id:3,ime:'Dragan',prezime:'Peric',brojSprata:2,brojStana:14,email:'drper@outlook.com',brojTelefona:'6753224'}
]
const p1={
  autor:'Pera Peric',
  datum:new Date().toLocaleString(),
  naslov:'Uvodjenje interfona',
  tekst:'Je l hocete da uvedemo interfon?',
  brojZa:1,
  brojProtiv:2
}

const o1={naslov:'Obavestenje o krecenju zgrade',
tekst:'aksjdjfv gfbfgb  assddf hgrddddddddddddddddddddd gsrgstr     lfegmadlfkgmlt sglkkkkkkkkkkk',
datum:new Date().toLocaleString(),
autor:{ime:'John Doe',
status:'upravnik'}}

const obavestenja=[
  {naslov:'Obavestenje o krecenju zgrade',
tekst:'aksjdjfv gfbfgb  assddf hgrddddddddddddddddddddd gsrgstr     lfegmadlfkgmlt sglkkkkkkkkkkk',
datum:new Date().toLocaleString(),
autor:{ime:'John Doe',
status:'upravnik'}},
{naslov:'Obavestenje o krecenju zgrade',
tekst:'aksjdjfv gfbfgb  assddf hgrddddddddddddddddddddd gsrgstr     lfegmadlfkgmlt sglkkkkkkkkkkk',
datum:new Date().toLocaleString(),
autor:{ime:'John Doe',
status:'upravnik'}}

]

const niz2=[1,2,3]

  return (
    <Store>
      <Aplikacija />
    
    </Store>
     
     
   
  
   
  )
 
   
  
}

export default App;
