import React from 'react';
import {Form, Row, Col} from 'react-bootstrap';

class WorkShopForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workshop: {
                name: "",
                description: "",
                date: null
            },
        }

    }

    handleKeyChange = (e) => {
        let change = this.state.workshop;
        change[e.target.name] = e.target.value;
        this.setState(change);

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
                            <Form.Control 
                                date  
                                name="date" 
                                onChange={this.handleKeyChange} value={this.state.workshop.name} 
                                className="formControls"
                            />
                        </Col>
                    </Form.Group>
            </div>
        )
    }
}

export default WorkShopForm