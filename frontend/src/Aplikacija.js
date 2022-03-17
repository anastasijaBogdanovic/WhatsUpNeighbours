import React,{useState,useEffect,useContext} from 'react';
import Sidebar from './components/sidebar/Sidebar';

import OglasnaTabla from './components/oglasna_tabla/OglasnaTabla'
import Obavestenja from './components/obavestenja/obavestenja'
import Chat from './components/chat/chat'
import Predlozi from './components/predlozi/predlozi'
import Sastanci from './components/sastanak/Sastanci'
import Stanari from './components/stanari/stanari'
import Pocetna from './components/pocetna/pocetna'
import StanarProfil from './components/forme/stanarProfil'
import BlagajnikTroskovi from './components/troskovi/blagajnikTroskovi'
import StatusTroskova from './components/troskovi/statusTroskova';
import {Context} from './Store'
import SafeRoute from './SafeRoute'
import {toast} from 'react-toastify'
import { HubConnectionBuilder,HubConnection
} from '@microsoft/signalr'
import 'react-toastify/dist/ReactToastify.css'



import {BrowserRouter as Router, Switch, Route,useRouteMatch,Redirect} from 'react-router-dom'
import './app.css'

toast.configure();
function Aplikacija() {

const [auth,setAuth]=useState(false);
const [state, dispatch] = useContext(Context);
//const [prevPath,setPrevPath]=useState('/app');
useEffect(() => {
    console.log("hi");
    const asyncFetch=async ()=>{
      const response1=await fetch('http://localhost:5000/WUN/stanarValidation',{
         
      headers:{'Content-Type':'application/json'},
      credentials:'include'
      
     
    },)
    const content1=await response1.json();
    console.log(content1);
 
 // await setAuth(content1.id);
 dispatch({type:'SET_STANAR',payload:content1});
 dispatch({type:'SET_AUTH',payload:content1.id});
 
 // console.log(auth);
  console.log('id:'+content1.id);

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

    }
  
    asyncFetch();
    const newConnection=new HubConnectionBuilder()
        
         
    .withUrl('http://localhost:5000/hubs/notifications'
        
    )
    .withAutomaticReconnect()
    .build();
    

        newConnection.start()
        .then(result=>{
            console.log('notifications connect');
            newConnection.on('ReceiveNotification',notification=>{
                console.log(notification);
                toast(notification.tekst);
                console.log(notification);
                if(notification.tip==='oglasna')
                dispatch({type:'SET_NOT_OGLASNA',payload:true});
                else if(notification.tip==='obavestenja')
                {
                  console.log('hiii');
                dispatch({type:'SET_NOT_OBAVESTENJA',payload:true});
                }
                else if(notification.tip==='cet')
                dispatch({type:'SET_NOT_CET',payload:true});
                else if(notification.tip==='predlozi')
                dispatch({type:'SET_NOT_PREDLOZI',payload:true});
                else if(notification.tip==='sastanci')
                dispatch({type:'SET_NOT_SASTANCI',payload:true});
                else if(notification.tip==='troskovi')
                dispatch({type:'SET_NOT_TROSKOVI',payload:true});
                console.log(state.notifikacije);

            });
        })
        .catch(e=>console.log('ne valja',e));
  },[] );


 





  return (
      
      <Router>
       
      <Route path="/pocetna"  >
        {state.isAuth?
        (<Redirect to={state.prevPath} />):
        
     ( <div className='ap'>
        <Pocetna />
        </div>)
}
        </Route>
  <Route  path='/app'>


  <div className='kont'>
<Sidebar />


<Switch>



<SafeRoute path='/app/oglasnaTabla' exact component={OglasnaTabla} />

<SafeRoute Route path='/app/obavestenja' component={Obavestenja} />
<SafeRoute path='/app/chat' component={Chat} />
<SafeRoute path='/app/predlozi' component={Predlozi} />
<SafeRoute path='/app/sastanci' component={Sastanci} />
<SafeRoute path='/app/stanari' component={Stanari} />
<SafeRoute path='/app/azurirajProfil' component={StanarProfil} />
<SafeRoute path='/app/troskovi' component={StatusTroskova} />




   </Switch>
   
   
  </div>

 
</Route>

</Router>

     
   
  
   
  )
 
   
  
}

export default Aplikacija;

