import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../CodeBlock/code-block.component';
import LabContext from '../../lab.context';
import {Form, Row, Col} from 'react-bootstrap';

import {setCurrentLab, setLabView} from '../../redux/lab/lab.actions';

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
        if (this.state.tempLab == null) {
            let tempLab = JSON.parse(JSON.stringify(this.props.currentLab))
            this.setState({tempLab: tempLab});
        }
        this.setState({"isEditing": this.context.isEditing});
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
        this.props.setCurrentLab(this.state.tempLab);
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
            tempLab = JSON.parse(JSON.stringify(this.props.currentLab));
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
        if (this.props.userid) {
            return(
                    <Fragment>
                        <button onClick={this.toggleEdit}  className={props.className}>Edit</button>&nbsp;&nbsp;
                    </Fragment>
                );
        }
        return(null);
    }

    StartLabButton = () => {
        // ----------------------------------------------------------------------------
        // If we're in an iFrame, we need to open in a seperate window
        // for the copy text function to work properly (due to security restrictions)
        // ----------------------------------------------------------------------------
            console.log("=============================");
            console.log("  Context is:", this.props.userid);
            console.log("An IFrame would link to: ", `${window.location.href}/${this.props.userid}`);
            if (window.location !== window.parent.location) {
            console.log("Inside of an iFrame: linking to", `${window.location.href}/${this.props.userid}`);
            return(
                <a  href={`${window.location.href}/${this.props.userid}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary LinkButton"
                    ><FontAwesomeIcon icon={faPlay}/>&nbsp;&nbsp;Start the Lab
                </a>
            );
        }
        // --------------------------
        //  Not inside of an iFrame
        // --------------------------
        return(
          <Button onClick={this.handleStartButton} >
            <FontAwesomeIcon icon={faPlay}/>&nbsp;&nbsp;Start the Lab
          </Button>  
        );
    }

    handleStartButton = () => {
        this.props.setLabView("Steps");
    }


    render() {
        if (this.state.tempLab === null) {
            console.log("in LabDetails.render - tempLab is null");
        }
        if (this.state.isEditing && (this.state.tempLab != null)) {
            return(
                <div className="Form TopLevelDiv">
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
        if (this.props.currentLab){
            return(
                <div className="TopLevelDiv"> 
                    <h1>{this.props.currentLab.name}</h1>
                    <ReactMarkdown
                        source={this.props.currentLab.description}
                        renderers={{code: CodeBlock}}
                    />
                    <this.EditButton className='btn btn-primary'/>
                    <this.StartLabButton/>
                </div>
            );
        }

        return(null);
}  // End of render()
}

LabDetails.contextType = LabContext;

const mapStateToProps = (state) => ({
    userid: state.user.userid,
    currentLab: state.lab.currentLab
})

const mapDispatchToProps = dispatch => ({
    setCurrentLab: lab => dispatch(setCurrentLab(lab)),
    setLabView: labView => dispatch(setLabView(labView))
})

export default connect(mapStateToProps, mapDispatchToProps)(LabDetails);