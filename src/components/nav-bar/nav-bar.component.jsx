import React from 'react';
import './nav-bar.styles.css';
import {Navbar, Nav} from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'
// import Nav from 'react-bootstrap/Nav';

class MyNavBar extends React.Component {

    render() {
        // var disabledValue = false;
        return(
            <Navbar collapseOnSelect expand="lg" bg="NavBG" variant="dark">
            <Navbar.Brand href="/">eLaborate</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <LinkContainer exact to="/">
                    <Nav.Link href="/" >Select Labs</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/lab">
                    <Nav.Link href="/lab" >Lab</Nav.Link>
                </LinkContainer>
                {/* <Nav.Link href="#order" disabled={true}>Reorder</Nav.Link> */}
                <LinkContainer to="/workshop">
                    <Nav.Link href="/workshop" >Workshops</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/monitor">
                    <Nav.Link href="/monitor" >Monitor</Nav.Link>
                </LinkContainer>
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
                {/* <Nav>
                <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                </Nav.Link>
                </Nav> */}
            </Navbar.Collapse>
            </Navbar>        
        );
    }
}

export default MyNavBar;