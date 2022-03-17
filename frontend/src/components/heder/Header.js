import React from "react";
import { Navbar,Button } from "react-bootstrap";
import './Header.scss'


export default function Header() {
  return (
    <Navbar className='heder'>
      <Navbar.Brand className='logo'>WUN</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Prijavljeni ste kao: <a href="#login">Mark Otto</a>
        </Navbar.Text>
        <Button variant="outline-light">Search</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
