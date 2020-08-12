import React, {Fragment} from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../CodeBlock/code-block.component';
import LabContext from '../../lab.context';
import {Form, Row, Col} from 'react-bootstrap';

// FontAwesome for buttons
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import './lab-details.styles.css';

class LabDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            allowEditing: false,
            tempLab: null
        }
    }

    handleKeyChange = (e) => {
        let change = this.state.tempLab;
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    componentDidMount () {
        console.log("Component Did Mount");
        if (this.state.tempLab == null) {
            console.log("creating new tempLab in state");
            let tempLab = JSON.parse(JSON.stringify(this.context.currentLab))
            this.setState({tempLab: tempLab});
        }
    }

    SaveButton = (props) => {
        return (
            <Fragment>
               <button onClick={this.handleSave} className={props.className + " btn-primary"}>Save</button>
               <button onClick={this.toggleEdit} className={props.className + " btn-secondary"}>Cancel</button>
           </Fragment>
        );
    }
    handleSave = () => {
        this.context.currentLab = this.state.tempLab0;
        this.toggleEdit();
    }

    //----------------------------------------------------------------------
    // Toggle the edit state and make a temp copy of the step being edited
    //    to allow the edit to be cancelled
    //----------------------------------------------------------------------
    toggleEdit = () => {
        //
        // If we are about to edit, make a copy of the lab so we can cancel
        //
        let tempLab;
        if (!this.state.isEditing) {
            tempLab = JSON.parse(JSON.stringify(this.context.currentLab));
            this.setState({
                tempLab: tempLab,
                isEditing: !this.state.isEditing
            });
        }
        else {
            this.setState({
                tempLab: null,
                isEditing: !this.state.isEditing
            });
        }
    }


    EditButton = (props) => {
        if (this.context.authorized) {
            return(
                <Fragment>
                    <button onClick={this.toggleEdit}  className={props.className}>Edit</button>&nbsp;&nbsp;
                </Fragment>
            );
        }
        return(null);
    }

    StartLabButton = () => {
        return(
          <Button onClick={this.handleStartButton} >
            <FontAwesomeIcon icon={faPlay}/>&nbsp;&nbsp;Start the Lab
          </Button>  
        );
    }

    handleStartButton = () => {
        console.log("Starting the labs...");
        this.context.labsStarted = true;
        console.log("LabDetails.handleStartButton context:", this.context);
        this.forceUpdate();
        this.props.updateParent();
    }


    render() {
        if (this.state.isEditing && (this.state.tempLab != null)) {
            return(
                <div className="Form DetailsPage">
                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Name</Form.Label>
                            <Col sm="11">
                                <Form.Control 
                                    plaintext  
                                    name="name" 
                                    onChange={this.handleKeyChange} value={this.state.tempLab.name} 
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
                            rows={20} 
                            name="description" 
                            onChange={this.handleKeyChange} 
                            value={this.state.tempLab.description}
                        />
                        </Col>
                    </Form.Group>
                    <this.SaveButton/>
                </div>
            );
        }  // end of if(isEditing)

        return(
            <div className="DetailsPage">
                <h1>{this.context.currentLab.name}</h1>
                <ReactMarkdown
                    source={this.context.currentLab.description}
                    renderers={{code: CodeBlock}}
                />
                <this.EditButton className='btn btn-primary'/>
                <this.StartLabButton/>
            </div>
        );
    }  // End of render()
}

LabDetails.contextType = LabContext;

export default LabDetails;