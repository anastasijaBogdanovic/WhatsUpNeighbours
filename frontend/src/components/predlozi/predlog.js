import React, {useState,useContext} from 'react'
import {Card,Button} from 'react-bootstrap'
import './predlog.scss'
import {AiFillLike, AiFillDislike} from 'react-icons/ai'
import { Context } from "../../Store";

//predlog ima naslov, tekst, datum, autora, brojZa i brojProtiv
export default function Predlog(props) {
   const [glasoviZa, setGlasoviZa]=useState(props.predlog.brZa);
   const [glasoviProtiv, setGlasoviProtiv]=useState(props.predlog.brProtiv);
   const [state, dispatch] = useContext(Context);
   const isAdminOrUpravnik=state.stanar.status==='admin'?
   true:(state.stanar.status==='upravnik'?true:false);

   const glasajZa=async ()=>{
    const response=await fetch('http://localhost:5000/WUNPredlozi/GlasajZaPredlog/'+props.predlog.id,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        credentials:'include'
          
      })
      console.log(response);
    
      if(response.ok)
       setGlasoviZa(prev=>prev+1); 
    else alert('Vec ste glasali za ovaj predlog, ne mozete to uciniti ponovo!')
    }

  const glasajProtiv=async ()=>{
    const response=await fetch('http://localhost:5000/WUNPredlozi/GlasajProtivPredloga/'+props.predlog.id,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        credentials:'include'
          
      })
      console.log(response);
      
      if(response.ok)
      setGlasoviProtiv(prev=>prev+1);
    else alert('Vec ste glasali protiv ovog predloga, ne mozete to uciniti ponovo!')
    }

    const obrisi=async ()=>{
      const response=await  fetch('http://localhost:5000/WUNPredlozi/ObrisiPredlog/'+props.predlog.id,{
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
            credentials:'include'

        });
        console.log(response);
       
        if(response.ok){
            props.setPredlozi(prevState=>{
                return prevState.filter(predl=>(predl.id!==props.predlog.id))
            })
        }
        else{
            const content=await response.json();
        console.log(content);

        }

        }
    


     
     
  
    return (
        <Card className='karticaPredlog'>
            <Card.Header>
               <h5> {props.predlog.naslov}</h5>
                Predlozio: <i>{props.predlog.imeAutora}</i>
                <br />
                 Datum: <i>{props.predlog.datumObjave}</i>


            </Card.Header>
            <Card.Body className='karticaBody'>
                    {props.predlog.opis}
                  
            </Card.Body>
            <Card.Footer className='futer'>
                   <div className='prviDiv glasanje' onClick={glasajZa}>
                       <div ><b>Glasaj za</b>   <AiFillLike className='like' /></div>
                       <div><i>(Broj glasova za: {glasoviZa})</i></div>
                    </div>
                    <div className='glasanje divProtiv' onClick={glasajProtiv}>
                       <div><b>Glasaj protiv </b> <AiFillDislike className='dislike' /></div>
                       <div><i>(Broj glasova protiv: {glasoviProtiv})</i></div>
                    </div>
            </Card.Footer>
            {isAdminOrUpravnik?
           (<Card.Footer>
                <Button variant='danger' block onClick={obrisi}>Obrisi</Button>
            </Card.Footer>):null
}
            
        </Card>
    )
}
