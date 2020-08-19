import React, { Fragment } from "react";
import LabContext from "../../lab.context";
import ReactMarkdown from 'react-markdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './lab-step.styles.css'
import CodeBlock from '../CodeBlock/code-block.component';
import MyNavBar from '../navbar/nav-bar-component';

// FontAwesome for buttons 
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {BLANK_STEP} from '../../sample-lab.data';
import { Col, Row, Form } from "react-bootstrap";

class LabStep extends React.Component {

    constructor(props) {
        super(props);
        var newStep = JSON.parse(JSON.stringify(BLANK_STEP));
        this.state = {
            isEditing: false, 
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
        console.log("Inside of ToggleEdit lab step");
        let newStep = JSON.parse(JSON.stringify(this.context.currentLab.steps[index]));
        this.setState({
            tempEditStep: newStep,
            isEditing: !this.state.isEditing
        });
    }

    handleKeyChange = (e) => {
        let change = this.state.tempEditStep;
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

     handleSave = () => {
         this.context.replaceStep([this.context.currentStep],this.state.tempEditStep);
         this.toggleEdit(this.context.currentStep);
         this.context.setLabHasChanged(true);
     }

    KillMeNowButton = () => {
        return(<button>test button</button>);
    }

    SaveButton = (props) => {
         return (
             <Fragment>
                <button onClick={this.handleSave} className={props.className + " btn-primary"}>Update</button>&nbsp;
                <button onClick={() =>{this.toggleEdit(this.context.currentStep)}} className={props.className + " btn-secondary"}>Discard</button>
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

    render() {
        //-------------------------------------
        // If we are editing, render this way
        //-------------------------------------
        if (this.state.isEditing) {
            return(
                <div className="Form StepPage">
                    <i>Step {this.context.currentStep + 1} of {this.context.currentLab.steps.length}</i>
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
        var finalMarkDown = this.context.currentLab.steps[this.context.currentStep].markdown + '\n```  \n' +
        this.context.currentLab.steps[this.context.currentStep].textToCopy + '  \n```  \n';
        return (
            <div className="StepPage">
                <h1>{this.context.currentLab.steps[this.context.currentStep].title}</h1>
                <i>Step {this.context.currentStep + 1} of {this.context.currentLab.steps.length}</i>
                <ReactMarkdown 
                    source={finalMarkDown} 
                    renderers={{code: CodeBlock}}
                    />
                <button 
                    className='btn btn-success' 
                    onClick={() => {navigator.clipboard.writeText(this.context.currentLab.steps[this.context.currentStep].textToCopy)}}
                    >Copy Text
                </button>
                <hr/>
                <MyNavBar editToggle={this.toggleEdit} handleSave={this.handleSave} handleSaveLab={this.handleSaveLab}/>
            </div>
        );
    }  // End of render()
}

LabStep.contextType = LabContext;
export default LabStep;
