import React from 'react';
import {withRouter} from 'react-router-dom';
import { Col, Row, Form, Button } from "react-bootstrap";

import LabContext from '../../lab.context';
import './login-page.styles.css';

class LoginPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userid: "",
            password: ""
        };
    }

    componentDidMount = () => {
        console.log("Entering LoginWindow.componentDidMount");
    }
    handleKeyChange = (e) => {
        let change = {[e.target.name]: e.target.value};
        this.setState(change);
    }

    handleSaveButton = () => {
        this.context.toggleAuthorized();
        console.log(this.props); 
        if (this.props.redirectTarget) {
            this.props.history.push(this.props.redirectTarget);
        }
    }

    SaveButton = () => {
        return(
            <Button className="btn btn-primary " onClick={this.handleSaveButton}>Login</Button>
        );
    }
    render() {
        return (
            <div className='center'>
            <div className="Form LoginPage ">
                <Form.Group as={Row}>
                    <Form.Label column sm="1"  >User ID</Form.Label>
                    <Col sm="11">
                        <Form.Control plaintext  name="userid" onChange={this.handleKeyChange} value={this.state.userid} className="formControls"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="1">Password</Form.Label>
                    <Col>
                    <Form.Control type="password" className="form-control formControls" name="password" onChange={this.handleKeyChange} value={this.state.password}/>
                    </Col>
                </Form.Group>
                <this.SaveButton ></this.SaveButton>
            </div>
            </div>
        );
    }
}

LoginPage.contextType = LabContext;

export default withRouter(LoginPage);