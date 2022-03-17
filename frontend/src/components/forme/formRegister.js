import React from 'react';

import {Form,Row,Col,Button} from 'react-bootstrap';
import InputGroup from './inputGroup';
//import './formRegister.scss'

export default function FormRegister() {
    return (
        
        <Form >
            <h2 className='text-center'>Registrujte se</h2>
            <p className='text-center'>Vec ste clan?  <a href="#!">Prijavite se</a></p>

           
          
              <InputGroup labelName='Unesite svoje ime:' inputType='text' placeHolder='John' />
             
             
              <InputGroup labelName='Unesite svoje prezime:' inputType='text' placeHolder='Doe' />
             
            <InputGroup labelName='Unesite svoj desetocifreni maticni broj:' inputType='text' placeHolder='xxxxxxxxxx' />
           
            <InputGroup labelName='Unesite svoju lozinku:' inputType='password' placeHolder='' />
            <InputGroup labelName='Unesite lozinku datu od upravnika:' inputType='password' placeHolder='' />
            <InputGroup labelName='Unesite svoj e-mail:' inputType='email' placeHolder='john.doe@gmail.com' />
            <InputGroup labelName='Unesite vas broj telefona' inputType='text' placeHolder='060000000' />
            <Row>
                <Col>
                <InputGroup labelName='Unesite broj vaseg sprata:' inputType='number' placeHolder='' />
              
                </Col>
                
                
              <Col>
              <InputGroup labelName='Unesite broj vaseg stana:' inputType='number' placeHolder='' />
                </Col>
            </Row>
           
            <Button variant="primary" type="submit" block>
                Registruj se
           </Button>
        </Form>
    )
}
