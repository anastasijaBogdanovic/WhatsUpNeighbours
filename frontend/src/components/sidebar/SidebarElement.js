import React,{useContext,useState} from 'react'
import './sidebarElement.scss';
import {NavLink} from 'react-router-dom'
import {Context} from '../../Store'


export default function SidebarElement({Ikonica,name,to, notifikacija,type,parametar}) {

    const [state, dispatch] = useContext(Context);

   
    
    //const [obojenost,setObojenost]=useState(false);
    const skiniNotifikaciju=async ()=>{
        //setObojenost(true);
       // console.log('cao');
       if(type){

       dispatch({type:type,payload:false});
       const response=await fetch('http://localhost:5000/WUNNotifikacije/UkloniNotifikaciju/'+parametar,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        credentials:'include'
          
      

       });
       console.log(response);
       await console.log(response.json());
       }
      
       

    }

    return (
        <NavLink to={to} activeClassName='activeLink' style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <div className={notifikacija?'obojena sideEl':'neobojena sideEl'} onClick={skiniNotifikaciju}>
             {Ikonica && <Ikonica className='ikonica'/>}
            {name}
           
        </div>
        </NavLink>
    )
}
