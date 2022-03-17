import {Card} from 'react-bootstrap'
import './Sastanak.scss'
import React from 'react'

const ACTIONS={
    NOVI_SASTANAK:'dodaj_sastanak',
    POVECAJ_BROJ_ZAINTERESOVANIH:'povecaj_br_zainteresovanih',
    POVECAJ_BROJ_NEZAINTERESOVANIH:'povecaj_br_nezainteresovanih'
}

export default function Sastanak(props){

    async function povecajZaint(){
        console.log(props.id);
        
        const response=await fetch('http://localhost:5000/WUNSastanci/GlasajZaSastanak/'+props.id,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            credentials:'include'
              
          })
          console.log(response);
        
          if(response.ok)
          props.dispatch({type:ACTIONS.POVECAJ_BROJ_ZAINTERESOVANIH, payload:{id:props.id}});
        else alert('Vec ste se izjasnili da ste zainteresovani za ovaj sastanak, ne mozete to uciniti ponovo!')
    }

   async function smanjiZaint(){

       
        const response=await fetch('http://localhost:5000/WUNSastanci/GlasajProtivSastanka/'+props.id,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            credentials:'include'
              
          })
          console.log(response);
          
          if(response.ok)
          props.dispatch({type:ACTIONS.POVECAJ_BROJ_NEZAINTERESOVANIH, payload:{id:props.id}})
        else alert('Vec ste se izjasnili da niste zainteresovani za ovaj sastanak, ne mozete to uciniti ponovo!')

    }

    return(
       <Card className='sastanak'>
           <Card.Header className='sastanakHeder'><h4>{props.povod}</h4></Card.Header>
           <Card.Body className='sastanakBody'>
               <div>Vreme održavanja: <i>{props.vreme}</i> </div>
               <br />
               <div>Mesto održavanja: <i>{props.mesto}</i> </div>
           </Card.Body>
           <Card.Footer className='sastanakFuter'>
              <div> <button className='dugmeSastanak' type="button" className="btn btn-success" onClick={povecajZaint}>Interesuje me</button>
               <label className='lblSastanak'>Zainteresovani: <i>{props.brZainteresovanih}</i></label></div>
               <div><button  className='dugmeSastanak' type="button" className="btn btn-danger" onClick={smanjiZaint}>Ne interesuje me</button>
               <label className='lblSastanak'>Nezainteresovani: <i>{props.brNezainteresovanih}</i></label></div>
           </Card.Footer>

       </Card>
    )

}
