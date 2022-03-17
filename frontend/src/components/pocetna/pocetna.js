import React,{useEffect,useContext} from 'react'
import {Card, Nav} from 'react-bootstrap'
import FormRegister from '../forme/formRegister'
import RegisterForm from '../forme/RegisterForm'
import FormLog from '../forme/FormLog'
import './pocetna.scss'
import {Context} from '../../Store'
import {BrowserRouter as Router, Switch, Route,Link,NavLink} from 'react-router-dom'

export default function Pocetna() {
    return (
       
        <div className='pocetna'>
       
            <h1>WUN</h1>
            <h2 className='podnaslov'>Whats up Neigbours?</h2>
          
            <Card className='kartica'>
                <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
                <Nav.Item className='link'>
                   
                    <NavLink className='l' to='/pocetna'>Prijavi se</NavLink>
                   
                </Nav.Item>
                <Nav.Item className='link'>
                    <Link  className='l'to='pocetna/registracija'>Registruj se</Link>
                </Nav.Item>
            </Nav>
            </Card.Header>
            <Card.Body className='telo'>
               {/* <FormRegister className='forma' />*/}
              {/* <FormLog />*/}
              <Switch>
             
                  <Route exact path='/pocetna'><FormLog /></Route>
                  <Route path='/pocetna/registracija'><RegisterForm /></Route>
                 </Switch>
             

            </Card.Body>
            </Card>
            
        </div>
      
    )
}
