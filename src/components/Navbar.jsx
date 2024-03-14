import React from 'react';
import './Navbar.css';
import { Navbar, Nav, Image } from 'react-bootstrap';
import userImage from '../assets/user.png';
import yugiohImage from '../assets/Yu-Gi-DB.png';

const NavigationBar = () => {
  return (
    <Navbar className='navbar1' bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="#home"><img className='nav-logo' src={yugiohImage}/></Navbar.Brand>
      <Nav className="mr-auto">
        {/* Add any navigation links here */}
      </Nav>
      <Navbar.Collapse className="justify-content-end">
      <Image src={userImage} roundedCircle width={40} height={40} />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;