import React from 'react'
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap'

export default function InputGroup({labelName,inputType,placeHolder}) {
    return (
        <FormGroup>
            
            <FormLabel>{labelName}</FormLabel>
            <FormControl size='sm' type={inputType} placeholder={placeHolder}></FormControl>
        </FormGroup>
    )
}
