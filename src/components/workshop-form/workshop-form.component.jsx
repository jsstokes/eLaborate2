import React from 'react';
import { connect } from 'react-redux';
import { setCurrentWorkshop } from '../../redux/workshop/workshop.actions';
import {Form, Row, Col, Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class WorkShopForm extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            workshop: {
                name: "",
                description: "",
                customer: "",
                startDate: new Date(),
                owner: props.userid
            },
        }

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

    handleSaveWorkshop = () => {
        console.log("Props:", this.props);
        console.log("State is:", this.state);
        console.log("Current user is:", this.props.userid);
        if (this.props.labList) {
            this.props.labList.forEach(lab  => {
                console.log("lab ID: ", lab._id.$oid);
                console.log("  Name: ", lab.name);
            });
        }
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
                            <Form.Control
                                disabled
                                plaintext
                                value={this.props.currentLab.name}
                                className="formControls"
                                />
                        </Col>
                    </Form.Group>
                    <Button onClick={this.handleSaveWorkshop}>Save </Button>
                    <Button onClick={this.handleSaveWorkshop}>Discard</Button>
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