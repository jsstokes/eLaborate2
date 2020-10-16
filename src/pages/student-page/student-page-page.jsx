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

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class StudentPage extends React.Component {

    constructor(props) {
        super(props);
        console.log("StudentPage.init - props:", props);
        //-----------------------------------------------------------
        //  Check Redux values needed as set when empty 
        //----------------------------------------------------------- 

        // if (!this.props.currentWorkshop) {
        //     this.props.setCurrentWorkshop(props.match.params.workshop_id)
        // } else {
        //     console.log("-- this.props.currentWorkshop:", this.props.currentWorkshop);
        // }
        // if (!this.props.studentEmail) {
        //     this.props.setStudentEmail(props.match.params.student_id)
        // } else {
        //     console.log("-- this.props.studentEmail:", this.props.studentEmail);
        // }
        // if (!this.props.currentLab) {
        //     this.props.setCurrentLab(props.match.params.)
        // } else {
        //     console.log("-- this.props.currentLab:", this.props.currentLab);
        // }

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
            this.getWorkshop(props.match.params.workshop_id);
        } else {
            console.log("*** NO WORKSHOP ID FOUND ***");
        }
        if (props.match.params.student_id) {
            console.log("Setting state.student_id to", props.match.params.student_id);
            this.state = {
                ...this.state,
                "student_id": props.match.params.student_id,
            }
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
        if (!this.props.currentLab) {
            this.getWorkshop(this.props.match.params.workshop_id);
        }
    }

    getWorkshop(workshop_id) {
        Axios.get(
            "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getWorkshop",
            { 
                params: {
                    id: workshop_id
                }
            }
        )
        .then(response => {
            this.props.setCurrentWorkshop(response.data);
            this.props.setCurrentLab(response.data.lab);
        });
    }

    iFrameMessageBox = () => {
        // var linkText = `${window.location.href}/${this.props.studentEmail}`;
        var linkText = `${window.location.href}/student@email.com`;
        return(
            <div className="modal">
                <div className="modal-content">
                    <h2>We will need to open in a new Window (or Tab) in order to make use of the clipboard</h2>
                    <a  href={linkText} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary LinkButton"
                        >
                        <FontAwesomeIcon icon={faPlay}/>&nbsp;&nbsp;Start the Lab
                    </a>
                </div>
            </div>
        );
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
        if ((!this.props.studentEmail) && (this.state.student_id)) {
            console.log("Student ID to Redux.StudentEmail:", this.state.student_id);
            this.props.setStudentEmail(this.state.student_id);
        }
        if ((this.props.match.workshop_id) && (!this.props.currentLab)) {
            this.getLab();
        } else {
            console.log("StudentPage didMount: NOT GONNA GET THE LAB:", this.props);
        }
    }

    render() {
        //-------------------------------------------------------------------------------------------
        //  If inside an iFrame, display link to open in a new window/tab
        //    - copyToClipBoard will not work inside an iFrame
        //  Prompt for Student ID (email address) if we didn't have one passed
        //  
        //  
        //  
        //  
        //  
        //  
        //-------------------------------------------------------------------------------------------
        //
        // console.log("StudentPage.render - window.location:",window.location);
        // console.log("StudentPage.render - window.parent.location:",window.parent.location);
        // if (window.location !== window.parent.location) {
        if (window.self !== window.top) {
            return(<this.iFrameMessageBox/>);
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