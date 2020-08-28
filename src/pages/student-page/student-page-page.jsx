import React from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import { Col, Row, Form, Button } from "react-bootstrap";

import LabContext from '../../lab.context';

import './student-page.styles.css';
import LabPage from '../lab-page/lab-page.component';

class StudentPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tempuser: ""};
    }

    handleKeyChange = (e) => {
        let newUserid = {"tempuser": e.target.value};
        this.setState(newUserid);
    }

    handleSaveButton = () => {
        console.log("About to Save userid:", this.state.tempuser);
        console.log("-------------------------------------------------");
        console.log("  context: ", this.context);
        console.log("  props: ", this.props);
        console.log("  state: ", this.state);
        console.log("-------------------------------------------------");
        this.context.setAuthorized(true, this.state.tempuser);
        this.setState({"userid": this.state.tempuser});
        this.forceUpdate();
        if (!this.context.currentLab) {
            this.getLab();
        }
    }

    getLab() {
        console.log(" prior to REST call props are:", this.props);
        console.log("=== Makeing AXIOS call to get lab - ID: ", this.props.match.params.workshop_id);
        Axios.get(
            `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getLab`,
            { 
                params: {
                    id: this.props.match.params.workshop_id 
                }
            }
        )
        .then(response => {
            console.log("AXIOS Response:", response.data);
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
                        <Button onClick={this.handleSaveButton}>Save</Button>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        console.log("Context Props",this.props.match.workshop_id);
        console.log("Entering StudentPage.componentDidMount - context is:", this.context);
        console.log("Entering StudentPage.componentDidMount - state is:", this.state);
        this.setState({"userid": this.context.auth.userid});
        if ((this.props.match.workshop_id) && (!this.context.currentLab)) {
            this.getLab();
        }

    }

    render() {
        console.log("Entering StudentPage.render - state is:", this.state);
        if (this.state.userid === "") {
            console.log("-------------  Rendering the user form ----------------");
            return(<this.emailForm/>);
        }
        console.log("-------------  NOT Rendering the user form ----------------");
        return(
            <div>
                <LabPage />
            </div>
        );
    }
}
StudentPage.contextType = LabContext;
export default withRouter(StudentPage);