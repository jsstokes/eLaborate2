import React, { Fragment } from "react";
import LabContext from "../../lab.context";
import ReactMarkdown from 'react-markdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './lab-step.styles.css'
import CodeBlock from '../CodeBlock/code-block.component';
import MyNavBar from '../navbar/nav-bar-component';
import axios from 'axios';

import Button from 'react-bootstrap/Button';

// FontAwesome for buttons 
import { faPlus, faChevronRight } from "@fortawesome/free-solid-svg-icons";
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

    handlePrevious = () => {
        if (this.context.currentStep > 0) {
            this.context.setCurrentStep(this.context.currentStep - 1);
        }
    }

    handleNext = () => {
        const MAX_STEP = this.context.currentLab.steps.length - 1;
        if (this.context.currentStep < MAX_STEP) {
            this.context.setCurrentStep(this.context.currentStep + 1);
        }
    }

    handleNewStepAfter = () => {
        let newStep = JSON.parse(JSON.stringify(BLANK_STEP));
        this.context.currentLab.steps.splice(this.context.currentStep + 1, 0, newStep); 
        this.context.setCurrentStep(this.context.currentStep + 1);

        this.toggleEdit(this.context.currentStep + 1);
    }

     handleDeleteStep = () => {
         this.context.currentLab.steps.splice(this.context.currentStep,1);
         if (this.context.currentStep > (this.context.currentLab.steps.length -1)) {
            this.context.setCurrentStep(this.context.currentLab.steps.length - 1);
         }
     }

     handleSave = () => {
         this.context.replaceStep([this.context.currentStep],this.state.tempEditStep);
         this.toggleEdit(this.context.currentStep);
     }

    KillMeNowButton = () => {
        return(<button>test button</button>);
    }

    // PreviousButton = (props) => {
    //     return(<div>Mock Previous Button</div>);
        // if (this.context.currentStep === 0) {
        //     return(
        //         <Button onClick={() => {this.context.setLabView("Description")}} className={props.className}>
        //             <FontAwesomeIcon icon={faChevronLeft} />&nbsp;Lab Overview
        //         </Button>
        //     );
        // }
        // return(
        //     <Button onClick={this.handlePrevious} className={props.className}>
        //         <FontAwesomeIcon icon={faChevronLeft} />&nbsp;Previous
        //     </Button>
        // );
    //  }

    // EditButton = (props) => {
    //     if (this.state.allowEditing) {
    //         return(
    //             <Button onClick={props.onClick}  className={props.className}>
    //                 <FontAwesomeIcon icon={faUserEdit} />&nbsp;Edit
    //             </Button>
    //         );
    //     }
    //     return(null);
    // }

    NextButton = (props) => {
        var disableNext = false;
        var lastStep = this.context.currentLab.steps.length - 1;

        if ((this.context.currentStep) === lastStep) {
            disableNext = true;
        } else {
            disableNext = false;
        }
        return(
            <Button onClick={this.handleNext} disabled={disableNext}   className={props.className} >
                Next&nbsp;<FontAwesomeIcon icon={faChevronRight} />
            </Button>
        );
    }

    SaveButton = (props) => {
         return (
             <Fragment>
                <button onClick={this.handleSave} className={props.className + " btn-primary"}>Save</button>
                <button onClick={() =>{this.toggleEdit(this.context.currentStep)}} className={props.className + " btn-secondary"}>Cancel</button>
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

    // DeleteButton = (props) => {
    //     if (this.state.allowEditing) {
    //         return (
    //             <span className={props.className} onClick={this.handleDeleteStep}>
    //                 <FontAwesomeIcon icon={faTrash} />&nbsp;Delete
    //             </span>
    //         );
    //     }
    //     return(null);
    // }

    handleSaveLab = () => {
        axios.post(
            "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/saveLab",
            this.context.currentLab
        ).then(response => {
            alert("Save Lab returned: " + JSON.stringify(response.data,0,2));
        });
    }

    // SaveLabButton = (props) => {
    //     return (<button onClick={this.handleSaveLab} className={props.className}>Save Lab</button>)
    // }

    StepNavBar = () => {
        return (
            <div>
                Heres the new NAVBAR v3
                <this.PreviousButton className="btn btn-primary"/>&nbsp;&nbsp;
            </div>
            );
        // if (this.context.authorized) {
        //     return(
                // <div className="StepNavBar">Working?
                //     <this.PreviousButton className="btn btn-primary"/>

                    // <this.EditButton  onClick={() => {this.toggleEdit(this.context.currentStep)}} className="btn btn-info"/>&nbsp;&nbsp;
                //     <this.AddStepButton className="btn btn-warning"/>&nbsp;&nbsp;
                //     <this.DeleteButton className="btn btn-danger"/>&nbsp;&nbsp;
                //     <this.NextButton className="btn btn-primary"/>&nbsp;&nbsp;
                //     <this.SaveLabButton className='btn'/>
                // </div>
        //     );
        // }

        // return(
        //     <div className="StepNavBar">
        //         <this.PreviousButton className="btn btn-primary"/>&nbsp;&nbsp;
        //         <this.NextButton className="btn btn-primary"/>&nbsp;&nbsp;
        //     </div>
        // );

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
                {/* <this.StepNavBar/> */}
            </div>
        );
    }  // End of render()
}

LabStep.contextType = LabContext;
export default LabStep;
