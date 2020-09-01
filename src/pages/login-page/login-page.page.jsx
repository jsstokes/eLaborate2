import React from 'react';
import { connect } from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
// eslint-disable-next-line
import { Col, Row, Form, Button } from "react-bootstrap";

import { setCurrentUser, setStudentEmail }from '../../redux/user/user.actions'; 

import LabContext from '../../lab.context';
import './login-page.styles.css';

class LoginPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userid: "",
            password: "",
            role: this.props.role
        };
    }

    componentDidMount = () => {
        console.log("Entering LoginWindow.componentDidMount");
    }
    
    handleKeyChange = (e) => {
        let change = {[e.target.name]: e.target.value};
        this.setState(change);
    }

    handleSaveButton = (parms) => {
        this.props.setCurrentUser(parms.userid);    // set userid in Redux
        this.props.setStudentEmail("redux@mongodb.com");
        this.props.history.push(`/`); 
        return(
          <Redirect to="/student/5f35b6b724f7a22dde49e082"/>
        );
    }
    
    SaveButton = () => {
        return(
            <Button className="btn btn-primary " onClick={() => {this.handleSaveButton(this.state)}}>Login</Button>
        );
    }

    render() {
        return (
            <div id="myModal" className="modal">

                <div className="modal-content">
                    <h2>{this.props.prompt}</h2>
                    <div className="Form">
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

            </div>
        );
    }
}

LoginPage.contextType = LabContext;

const mapStateToProps = (state) => ({
    userid: state.user.userid
  });

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setStudentEmail: email => dispatch(setStudentEmail(email))
})
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LoginPage));