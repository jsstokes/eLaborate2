import React from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import { Col, Row, Form, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { setStudentEmail }from '../../redux/user/user.actions'; 
import { setCurrentWorkshop } from '../../redux/workshop/workshop.actions';

import LabContext from '../../lab.context';

import './student-page.styles.css';
import LabPage from '../lab-page/lab-page.component';
import { setCurrentLab } from '../../redux/lab/lab.actions';

class StudentPage extends React.Component {

    constructor(props) {
        super(props);
        if (props.match.params.student_id) {
            this.state = {tempuser: props.match.params.student_id};
        } else {
            this.state = {tempuser: ""};
        }
        if (props.match.params.workshop_id) {
            this.state = {
                ...this.state,
                workshop_id: props.match.params.workshop_id
            }
            
        } else {
            console.log("*** NO WORKSHOP ID FOUND ***");
        }
    }

    handleKeyChange = (e) => {
        let newUserid = {"tempuser": e.target.value};
        this.setState(newUserid);
    }

    handleSaveButton = () => {
        // this.context.setAuthorized(false, this.state.tempuser); 
        this.props.setStudentEmail(this.state.tempuser);
        this.forceUpdate();
        if (!this.context.currentLab) {
            this.getLab();
        }
    }

    getLab() {
        Axios.get(
            // Not getting the lab directly any longer
            // `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getLab`,
            // getting the workshop instead
            "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getWorkshop",
            { 
                params: {
                    id: this.props.match.params.workshop_id
                }
            }
        )
        .then(response => {
            this.props.setCurrentWorkshop(response.data);
            this.props.setCurrentLab(response.data.lab);
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
        if ((this.props.match.workshop_id) && (!this.props.currentLab)) {
            this.getLab();
        } else {
            console.log("StudentPage didMount: NOT GONNA GET THE LAB:", this.props);
        }
    }

    render() {
        console.log("Email from parent:", window.parent.email)
        if (window.parent.email) {
            console.log("Email from parent:", window.parent.email)
            this.props.setStudentEmail(window.parent.email);
        }
        if (this.props.studentEmail === "") {
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
    studentEmail: state.user.studentEmail,
    currentLab: state.lab.currentLab,
    currentWorkshop: state.workshop.currentWorkshop
})

const mapDispatchToProps = dispatch => ({
    setStudentEmail: email => dispatch(setStudentEmail(email)),
    setCurrentLab: lab => dispatch(setCurrentLab(lab)),
    setCurrentWorkshop: workshop=> dispatch(setCurrentWorkshop(workshop))
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(StudentPage));