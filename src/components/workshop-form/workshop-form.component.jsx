import React from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class WorkShopForm extends React.Component {

    constructor(props) {
        super(props);
        var junk = new Date();
        junk.setDate(junk.getDate()  + 2);
        this.state = {
            workshop: {
                name: "",
                description: "",
                customer: "",
                startDate: junk,
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
        console.log("State is:", this.state);
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
                    <Button onClick={this.handleSaveWorkshop}>Save </Button>
                    <Button onClick={this.handleSaveWorkshop}>Discard</Button>
            </div>
        )
    }
}

export default WorkShopForm