import React from 'react';
import { connect } from 'react-redux';
import { setCurrentWorkshop } from '../../redux/workshop/workshop.actions';
import {Form, Row, Col, Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';

class WorkShopForm extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            workshop: {
                name: props.currentWorkshop.name,
                description: props.currentWorkshop.description,
                customer: props.currentWorkshop.customer,
                startDate: null,
                owner: props.userid,
                steps: null
            },
        }

    }

    componentDidMount = () => {
        // save state from props??
        
    }

    handleKeyChange = (e) => {
        let change = this.state.workshop;
        change[e.target.name] = e.target.value;
        this.setState(change);

    }
    onDateChange = (date) => {
        var newWorkshop = {
            ...this.state.workshop,
            startDate: date};
        this.setState({workshop: newWorkshop});
    }

    LabNameControl = () => {
        if (this.props.currentLab == null) {
            return(
                <LinkContainer to="/">
                    <Link to="/" >You must have a lab selected to continue - click here</Link>
                </LinkContainer>
            );
        } else {
            return (
                <Form.Control
                    disabled
                    plaintext
                    value={this.props.currentLab?this.props.currentLab.name:"No Lab Selected"}
                    className="formControls"
                    />
            )
        }
    }

    handleSaveWorkshop = () => {
        var workshopToSave = this.state.workshop;
        // ----------------------------------------------------------------
        //   decided to embed the entire Lab doc into the workshop
        //      should prevent any weird issues if someone delete the lab
        // ----------------------------------------------------------------
        workshopToSave.lab = this.props.currentLab;
        this.updateWorkshop(workshopToSave);
    }

    updateWorkshop = (workshopToSave) => {
        this.setState({workshop: workshopToSave});
        axios.post(
            "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/saveWorkshop",
            workshopToSave
        ).then(response => {
            if (response.data.hasOwnProperty("insertedId")) {
                // let newWorkshop = this.state.workshop;
                workshopToSave._id = response.data.insertedId;
                this.props.setCurrentWorkshop(workshopToSave);
            } else {
            }
            // this.props.setLabHasChanged(false);  // Not needed for workshops
        });
    }

    handleCancel = () => {
        this.props.setCurrentWorkshop(null);
    }

    handleTestButton = () => {
        console.log("Props:",this.props);
        console.log("Making Date:", new Date(this.props.currentWorkshop.startDate));
    }

    render() {
        return (
            <div className="TopLevelDiv">
                <h2>Workshop Details</h2>
                <Form.Group as={Row}>
                        <Form.Label column sm="1">Name</Form.Label>
                        <Col sm="11">
                            <Form.Control 
                                plaintext  
                                name="name" 
                                onChange={this.handleKeyChange} value={this.state.workshop.name} 
                                className="formControls"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Customer</Form.Label>
                        <Col sm="11">
                            <Form.Control 
                                plaintext  
                                name="customer" 
                                onChange={this.handleKeyChange} value={this.state.workshop.customer} 
                                className="formControls"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Description</Form.Label>
                        <Col>
                            <textarea 
                                className="form-control formControls" 
                                cols={80} 
                                rows={5} 
                                name="description" 
                                onChange={this.handleKeyChange} 
                                value={this.state.workshop.description}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Start</Form.Label>
                        <Col sm="11">
                            <DatePicker selected={this.state.workshop.startDate} onChange={ date => this.onDateChange(date)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Owner</Form.Label>
                        <Col>
                        <Form.Control
                            disabled
                            plaintext
                            value={this.state.workshop.owner} 
                            className="formControls"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Lab</Form.Label>
                        <Col>
                            <this.LabNameControl/>
                        </Col>
                    </Form.Group>
                    <Button onClick={this.handleSaveWorkshop}>Save </Button>
                    <Button onClick={this.handleCancel}>Discard</Button>
                    <Button onClick={this.handleTestButton}>Test</Button>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    userid: state.user.userid,
    currentWorkshop: state.workshop.currentWorkshop,
    currentLab: state.lab.currentLab,
    labList: state.lab.labList
})

const mapDispatchToProps = dispatch => ({
    setCurrentWorkshop: workshop => dispatch(setCurrentWorkshop(workshop)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkShopForm);