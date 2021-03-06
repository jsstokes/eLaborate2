import React, { Fragment } from "react";
import LabContext from "../../lab.context";
import ReactMarkdown from 'react-markdown';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line
import './lab-step.styles.css'
// eslint-disable-next-line
import CodeBlock from '../CodeBlock/code-block.component';
import ButtonBar from '../button-bar/button-bar.component'; 

import { setCurrentLab, toggleIsEditing, setLabHasChanged } from '../../redux/lab/lab.actions';

// FontAwesome for buttons 
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {BLANK_STEP} from '../../sample-lab.data';
import { Col, Row, Form } from "react-bootstrap";
import { connect } from "react-redux";

// "workshop_id": doc["workshop_id"],
// "student_id": doc["student_id"],
// "current_step": doc["step"] ,


class LabStep extends React.Component {

    constructor(props) {
        super(props);
        var newStep = JSON.parse(JSON.stringify(BLANK_STEP));
        this.state = {
            allowEditing: props.allowEditing,
            tempEditStep: newStep,
            mode: this.props.mode ? props.mode : "STEPS"
        }
    }

    //----------------------------------------------------------------------
    // Toggle the edit state and make a temp copy of the step being edited
    //    to allow the edit to be cancelled
    //----------------------------------------------------------------------
    toggleEdit = (index) => {
        let newStep = JSON.parse(JSON.stringify(this.props.currentLab.steps[index]));
        this.setState({
            tempEditStep: newStep,
        });
        this.props.toggleIsEditing();
    }
    
    handleKeyChange = (e) => {
        let change = this.state.tempEditStep;
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    replaceStep = (index, step) => {
        let newLab = this.props.currentLab;
        newLab.steps[index] = step;
        this.props.setCurrentLab(newLab);
    } 


     handleSave = () => {
         this.replaceStep([this.props.currentStep],this.state.tempEditStep);
         this.toggleEdit(this.props.currentStep);
         this.props.setLabHasChanged(true);
     }

    KillMeNowButton = () => {
        return(<button>test button</button>);
    }

    SaveButton = (props) => {
         return (
             <Fragment>
                <button onClick={this.handleSave} className={props.className + " btn-primary"}>Update</button>&nbsp;
                <button onClick={() =>{this.toggleEdit(this.props.currentStep)}} className={props.className + " btn-secondary"}>Discard</button>
            </Fragment>
         );
    }

    AddStepButton = (props) => {
        if (this.state.allowEditing) {
            return(
                <span onClick={this.handleNewStepAfter}  className={props.className}>
                <FontAwesomeIcon icon={faPlus} />&nbsp;Add
            </span>

            );
        }
        return(null);
    }

    handleForceUpdate = () => {
        this.forceUpdate();
    }

    render() {
        //-------------------------------------
        // If we are editing, render this way
        //-------------------------------------
        if (this.props.isEditing) {
            return(
                <div className="Form StepPage">
                    <i>Step {this.props.currentStep + 1} of {this.props.currentLab.steps.length}</i>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1"  >Title</Form.Label>
                        <Col sm="11">
                            <Form.Control plaintext  name="title" onChange={this.handleKeyChange} value={this.state.tempEditStep.title} className="formControls"/>
                        </Col>
                    </Form.Group>
                    <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noopener noreferrer">Open Markdown Reference</a>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Markdown</Form.Label>
                        <Col>
                        <textarea className="form-control formControls" cols={80} rows={20} name="markdown" onChange={this.handleKeyChange} value={this.state.tempEditStep.markdown}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Text to Copy</Form.Label>
                        <Col>
                        <textarea className="form-control formControls" cols={80} rows={3} name="textToCopy" onChange={this.handleKeyChange} value={this.state.tempEditStep.textToCopy}/>
                        </Col>
                    </Form.Group>
                    <this.SaveButton className="btn"></this.SaveButton>
                </div>
            )
        } 

        //------------------------------------
        // Default render when not editing
        //------------------------------------

        // Put the copyText as the last CodeBlock element of the Mardown
        // eslint-disable-next-line
        var finalMarkDown = this.props.currentLab.steps[this.props.currentStep].markdown + '\n```  \n' +
        this.props.currentLab.steps[this.props.currentStep].textToCopy + '  \n```  \n';
        return (
            <div className="StepPage">
                <h1>{this.props.currentLab.steps[this.props.currentStep].title}</h1>
                <i>Step {this.props.currentStep + 1} of {this.props.currentLab.steps.length}</i>
                <ReactMarkdown 
                    source={finalMarkDown} 
                    renderers={{code: CodeBlock}}
                    /> 
                <button 
                    className='btn btn-success' 
                    onClick={() => {window.top.navigator.clipboard.writeText(this.props.currentLab.steps[this.props.currentStep].textToCopy)}}
                    >Copy Text
                </button>
                <hr/>
                <ButtonBar editToggle={this.toggleEdit} handleSave={this.handleSave} handleForceUpdate={this.handleForceUpdate}/>
            </div>
        );
    }  // End of render()
}

LabStep.contextType = LabContext; 

const mapStateToProps = (state) => ({
    userid: state.user.userid,
    currentLab: state.lab.currentLab,
    currentStep: state.lab.currentStep,
    isEditing: state.lab.isEditing,
    labHasChanged: state.lab.labHasChanged,
})

const mapDispatchToProps = dispatch => ({
    setCurrentLab: lab => dispatch(setCurrentLab(lab)),
    toggleIsEditing: () => dispatch(toggleIsEditing()),
    setLabHasChanged: (hasChanged) => dispatch(setLabHasChanged(hasChanged)),
})
export default connect(mapStateToProps,mapDispatchToProps)(LabStep);
