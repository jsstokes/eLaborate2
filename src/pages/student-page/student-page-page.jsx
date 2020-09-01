import React from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import { Col, Row, Form, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { setStudentEmail }from '../../redux/user/user.actions'; 

import LabContext from '../../lab.context';

import './student-page.styles.css';
import LabPage from '../lab-page/lab-page.component';

class StudentPage extends React.Component {

    constructor(props) {
        super(props);
        if (props.match.params.student_id) {
            this.state = {tempuser: props.match.params.student_id};
        } else {
            this.state = {tempuser: ""};
        }
    }

    handleKeyChange = (e) => {
        let newUserid = {"tempuser": e.target.value};
        this.setState(newUserid);
    }

    handleSaveButton = () => {
        this.context.setAuthorized(false, this.state.tempuser); 
        this.props.setStudentEmail(this.state.tempuser);
        this.forceUpdate();
        if (!this.context.currentLab) {
            this.getLab();
        }
    }

    getLab() {
        Axios.get(
            `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getLab`,
            { 
                params: {
                    id: this.props.match.params.workshop_id 
                }
            }
        )
        .then(response => {
            this.context.setCurrentLab(response.data);
        });
    }

    emailForm = () => {
        return(
            <div className="modal">
                <div className="modal-content">
                    <h2>Enter your email address</h2>
                    <div className="Form">
                        <Form.Group as={Row}>
                                <Col sm="11">
                                    <Form.Control plaintext  name="userid" onChange={this.handleKeyChange} value={this.state.tempuser} className="formControls"/>
                                </Col>
                        </Form.Group>
                        <Button onClick={this.handleSaveButton}>Continue...</Button>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.setStudentEmail(this.context.auth.userid);
        if ((this.props.match.workshop_id) && (!this.context.currentLab)) {
            this.getLab();
        }

    }

    render() {
        console.log("Entering StudentPage.render - state is:", this.state);
        if (this.props.studentEmail === "") {
        // if (this.state.tempuser === "") {
            return(<this.emailForm/>);
        }
        return(
            <div>
                <LabPage />
            </div>
        );
    }
}
StudentPage.contextType = LabContext;

const mapStateToProps = (state) => ({
    studentEmail: state.user.studentEmail
})

const mapDispatchToProps = dispatch => ({
    setStudentEmail: email => dispatch(setStudentEmail(email))
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(StudentPage));