import React from 'react';
import './nav-bar.styles.css';
import {Navbar, Nav} from 'react-bootstrap';
// import Nav from 'react-bootstrap/Nav';

class MyNavBar extends React.Component {

    render() {
        var disabledValue = true;
        return(
            <Navbar collapseOnSelect expand="lg" bg="NavBG" variant="dark">
            <Navbar.Brand href="#home">eLaborate</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#features">Labs</Nav.Link>
                <Nav.Link href="#features" disabled={disabledValue}>Labs</Nav.Link>
                <Nav.Link href="#features" disabled={disabledValue}>Labs</Nav.Link>
                <Nav.Link href="#features" disabled={disabledValue}>Labs</Nav.Link>
                <Nav.Link href="#pricing" disabled={disabledValue}>Pricing</Nav.Link>
                {
                //     <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                //     <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                //     <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                //     <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                //     <NavDropdown.Divider />
                //     <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                // </NavDropdown>
                }
                </Nav>
                <Nav>
                <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>        
        );
    }
}

export default MyNavBar;