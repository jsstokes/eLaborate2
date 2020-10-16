import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../CodeBlock/code-block.component';
import LabContext from '../../lab.context';
import {Form, Row, Col} from 'react-bootstrap';

import {setCurrentLab, setLabView, toggleIsEditing, setLabHasChanged} from '../../redux/lab/lab.actions';

import { updateStatus } from '../../utils/workshop.utils';


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
        this.props.setLabHasChanged(true);
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
        if (!this.props.isEditing) {
            tempLab = JSON.parse(JSON.stringify(this.props.currentLab));
            this.setState({
                tempLab: tempLab
            });
            this.props.toggleIsEditing();
        }
        else {
            this.setState({
                tempLab: null
            });
            this.props.toggleIsEditing();
        }
    }


    EditButton = (props) => {
         if (props.userid) {
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
        if (window.location !== window.parent.location) {
            var linkText = `${window.location.href}/${this.props.studentEmail}`;
            console.log("iFrame link is using:", this.props.studentEmail);
            console.log("iFrame link text:", linkText);
            return(
                <a  href={linkText} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary LinkButton"
                    ><FontAwesomeIcon icon={faPlay}/>&nbsp;&nbsp;Start the Lab Details
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
        if (this.props.currentWorkshop) {
            updateStatus(
                this.props.currentWorkshop._id.$oid,
                this.props.studentEmail,
                0
            );
        } 
    }


    render() {
        if (this.props.isEditing && (this.state.tempLab != null)) {
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
    currentLab: state.lab.currentLab,
    isEditing: state.lab.isEditing,
    labHasChanged: state.lab.labHasChanged,
    currentWorkshop: state.workshop.currentWorkshop,
    studentEmail: state.user.studentEmail,
})

const mapDispatchToProps = dispatch => ({
    setCurrentLab: lab => dispatch(setCurrentLab(lab)),
    setLabView: labView => dispatch(setLabView(labView)),
    toggleIsEditing: () => dispatch(toggleIsEditing()),
    setLabHasChanged: hasChanged => dispatch(setLabHasChanged(hasChanged)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LabDetails);