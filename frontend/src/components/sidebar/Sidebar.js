import React,{useState,useEffect,useContext} from 'react'
import SidebarElement from './SidebarElement'
import './sidebar.scss'
import { FaCalendarAlt,FaCoins } from 'react-icons/fa';
import {AiFillCalendar,AiFillNotification} from 'react-icons/ai'
import {BsClipboardData} from 'react-icons/bs'
import {BsFillPeopleFill, BsFillChatDotsFill,BsFillQuestionDiamondFill} from 'react-icons/bs'
import {Link,Redirect,NavLink} from 'react-router-dom'
import {Context} from '../../Store'

export default function Sidebar() {
    const[redirect,setRedirect]=useState(false);
    const [state, dispatch] = useContext(Context);

    const  odjaviKorisnika=async ()=>{
        const response=await fetch('http://localhost:5000/WUN/Logout',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include'
           
           
          });
          const content=await response.json();
          console.log(content);
          dispatch({type:'SET_PATH',payload:'/app/oglasnaTabla'});
          dispatch({type:'SET_AUTH',payload:0});
           dispatch({type:'SET_STANAR',payload:null});
       setRedirect(true);

    }
    if(redirect){
        return <Redirect  to='/pocetna'/>
        }

    return (
        <div className='sidebar1'>
            <h3 className='logo'>WUN</h3>
            <NavLink  to='/app/azurirajProfil' activeClassName='activeLink' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className='profil'>
                 <h5>{state.stanar.ime + " "+state.stanar.prezime}</h5>
                 <label>-{state.stanar.status}-</label>
                 </div>
           </NavLink>
          
           <SidebarElement Ikonica={BsClipboardData} name='Oglasna tabla' to='/app/oglasnaTabla' notifikacija={state.notifikacije.notifikacijaOglasna} type='SET_NOT_OGLASNA' parametar='oglasna'/>
           <SidebarElement  Ikonica={AiFillNotification} name='Obaveštenja' to='/app/obavestenja' notifikacija={state.notifikacije.notifikacijaObavestenja} type='SET_NOT_OBAVESTENJA' parametar='obavestenja'/>
           <SidebarElement Ikonica={BsFillChatDotsFill} name='Chat' to='/app/chat' notifikacija={state.notifikacije.notifikacijaCet} type='SET_NOT_CET' parametar='cet'/>
           <SidebarElement Ikonica={BsFillQuestionDiamondFill} name='Predlozi' to='/app/predlozi' notifikacija={state.notifikacije.notifikacijaPredlozi} type='SET_NOT_PREDLOZI' parametar='predlozi'/>
           <SidebarElement Ikonica={FaCalendarAlt} name='Sastanci' to='/app/sastanci' notifikacija={state.notifikacije.notifikacijaSastanci} type='SET_NOT_SASTANCI' parametar='sastanci'/>
           <SidebarElement Ikonica={BsFillPeopleFill} name='Stanari' to='/app/stanari' notifikacija="" type=''/>
           <SidebarElement Ikonica={FaCoins} name='Status troškova' to='/app/troskovi' notifikacija={state.notifikacije.notifikacijaTroskovi} type='SET_NOT_TROSKOVI' parametar='troskovi'/>

          <div className='odjava' onClick={odjaviKorisnika}>Odjavi se</div>
        </div>
    )
}
