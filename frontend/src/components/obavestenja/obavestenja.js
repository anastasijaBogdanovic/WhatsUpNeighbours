import React,{useState,useContext,useEffect} from 'react'
import Obavestenje from './obavestenje'
import {Form, Button, FormGroup,FormControl,FormLabel} from 'react-bootstrap'
import './obavestenja.scss'
import {Context} from '../../Store'
import {HiChevronDoubleUp} from 'react-icons/hi'


export default function Obavestenja() {
    const [state, dispatch] = useContext(Context);

    const [obavestenja,setObavestenja]=useState([]);
    const [formDisplay,setFormDisplay]=useState("");
    const [naslov,setNaslov]=useState("");
    const [tekst,setTekst]=useState("");
    const isAuthorized=state.stanar.status==='upravnik'?true:state.stanar.status==='admin'?true:state.stanar.status==='blagajnik'?true:false;
    const toggleForm=()=>{
        console.log('toggling');
        setFormDisplay('true');
    }
    const closeForm=()=>{
        console.log('closing');
        setFormDisplay('');
    }

    useEffect(()=>{
        dispatch({type:'SET_PATH',payload:'/app/obavestenja'});
        console.log(state.prevPath);
        const asyncFetch=async ()=>{
            const response1=await fetch('http://localhost:5000/WUNObavestenja/VratiObavestenja');
            const listaStavki=await response1.json();
            listaStavki.map(obavestenje=>{obavestenje.vreme=new Date(obavestenje.vreme).toLocaleString()})
            listaStavki.reverse();
            setObavestenja(listaStavki)
      
          }
  
        
        
          asyncFetch();

    },[])

    function renderCreate(){
        if(isAuthorized)
          return    <Button variant='danger' onClick={toggleForm}>Kreiraj novo obavestenje</Button>
          
    }

    const kreirajObavestenje=async ()=>{
       if(naslov==="" || tekst==="")
         alert("Morate popuniti sva polja!")
        else{

        const novo={
            imeAutora:state.stanar.ime+" "+state.stanar.prezime,
            statusAutora:state.stanar.status,
            naslov:naslov,
            tekst:tekst,
            vreme:new Date().toLocaleString()
        }

     

        const response=await fetch('http://localhost:5000/WUNObavestenja/KreirajObavestenje',{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            credentials:"include",
            body:JSON.stringify({
                naslov:naslov,
                tekst:tekst,
                
                vreme:new Date(new Date().getTime()-(new Date().getTimezoneOffset()*60000)).toJSON(),
                
            })

        });
        const content=await response.json();
        setObavestenja(prevState=>{
            novo.id=content.id;
            return [novo,...prevState]

        })
        setFormDisplay("");
    }
}
    return (
        <div className='obavestenjaKont'>
              {renderCreate()}
       {formDisplay &&
        <Form className='formaObavestenja'>
            <FormGroup>
                <FormLabel>Unesite naslov obavestenja: </FormLabel>
                <FormControl type='text' value={naslov}  onChange={e=>setNaslov(e.target.value)}/>
            </FormGroup>
          <FormGroup>
              <FormLabel>Unesite sadrzaj obavestenja: </FormLabel>
              <textarea  rows='6' value={tekst} onChange={e=>setTekst(e.target.value)}></textarea>
          </FormGroup>

          <Button variant="danger" onClick={kreirajObavestenje} >
                Kreiraj obavestenje
           </Button>
           <HiChevronDoubleUp  className='doubleUp' onClick={closeForm} />

            
        </Form>
}

              {obavestenja.map(obavestenje=>
                (<Obavestenje key={obavestenje.id} obavestenje={obavestenje} />))}
              
        </div>
    )
}
