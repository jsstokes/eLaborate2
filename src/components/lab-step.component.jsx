import React, { Fragment } from "react";
import LabContext from "../lab.context";
// import context from "react-bootstrap/esm/AccordionContext";
import ReactMarkdown from 'react-markdown';

import {BLANK_STEP} from '../sample-lab.data';

class LabStep extends React.Component {

    constructor(props) {
        super(props);
        var newStep = {};
        Object.assign(newStep,BLANK_STEP);
        this.state = {
            isEditing: false, 
            allowEditing: props.allowEditing,
            tempEditStep: newStep,
            mode: this.props.mode ? props.mode : "STEPS"
        }
        console.log("This.state:",this.state);
        console.log("Props:", this.props);
    }

    //----------------------------------------------------------------------
    // Toggle the edit state and make a temp copy of the step being edited
    //    to allow the edit to be cancelled
    //----------------------------------------------------------------------
    toggleEdit = () => {
        let newStep = {};
        Object.assign(newStep,this.context.currentLab.steps[this.context.currentStep]);
        this.setState({
            tempEditStep: newStep,
            isEditing: !this.state.isEditing
        });
    }

    handleKeyChange = (e) => {
        console.log("ChangeEvent:", e);
        let change = this.state.tempEditStep;
        change[e.target.name] = e.target.value;
        console.log(e.target.name,":", e.target.value);
        this.setState(change);
    }

    handlePrevious = () => {
        console.log("Handle Previous from:", this.context.step);
        if (this.context.currentStep > 0) {
            console.log("Moving to prebious step, value: ", this.context.currentStep - 1);
            this.context.currentStep = this.context.currentStep - 1;
            this.forceUpdate();
        }
    }

    handleNext = () => {
        const MAX_STEP = this.context.currentLab.steps.length - 1;
        if (this.context.currentStep < MAX_STEP) {
            this.context.currentStep = this.context.currentStep + 1;
            this.forceUpdate();
        }
    }

    handleNewStepAfter = () => {
        var newStep = {};
        Object.assign(newStep,BLANK_STEP);
        this.context.currentLab.steps.splice(this.context.currentStep + 1, 0, newStep); 
        this.context.currentStep = this.context.currentStep + 1;
        this.setState({isEditing: true});
        this.handleNext();       
        this.forceUpdate();
    }

     handleDeleteStep = () => {
         this.context.currentLab.steps.splice(this.context.currentStep,1);
         if (this.context.currentStep > (this.context.currentLab.steps.length -1)) {
            this.context.currentStep = this.context.currentLab.steps.length - 1;
         }
         this.forceUpdate();
     }

     handleSave = () => {
         this.context.currentLab.steps[this.context.currentStep] = this.state.tempEditStep;
         this.toggleEdit();
     }

     PreviousButton = (props) => {
        var disablePrevious = false;
        if (this.context.currentStep > 0) {
            disablePrevious = false;
        } else {
            disablePrevious = true;
        }

        return(
            <Fragment>
            <button disabled={disablePrevious} onClick={this.handlePrevious}>Previous</button>
            </Fragment>
        );
     }

    EditButton = (props) => {
        if (this.state.allowEditing) {
            return(
                <button onClick={this.toggleEdit}>Edit</button>
            );
        }
        return(null);
    }

    NextButton = (props) => {
        var disableNext = false;
        var lastStep = this.context.currentLab.steps.length - 1;

        if ((this.context.currentStep) === lastStep) {
            disableNext = true;
        } else {
            disableNext = false;
        }
        return(
            <button onClick={this.handleNext} disabled={disableNext}>Next</button>
        );
    }

    SaveButton = (props) => {
         return (
             <Fragment>
                <button onClick={this.handleSave}>Save</button>
                <button onClick={this.toggleEdit}>Cancel</button>
            </Fragment>
         );
    }

    AddStepButton = (props) => {
        if (this.state.allowEditing) {
            return(<button onClick={this.handleNewStepAfter}>New Step After</button>);
        }
        return(null);
    }

    DeleteButton = (props) => {
        if (this.state.allowEditing) {
            return(
                <button onClick={this.handleDeleteStep}>Delete</button>
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
                <div>
                    <input type="text" name="title" onChange={this.handleKeyChange} value={this.state.tempEditStep.title} />
                    <textarea cols={80} rows={20} name="markdown" onChange={this.handleKeyChange} value={this.state.tempEditStep.markdown}/>
                    <this.SaveButton></this.SaveButton>
                </div>
            )
        } 

        //------------------------------------
        // Default render when not editing
        //------------------------------------
        return (
            <div>
                <h2>{this.context.currentLab.steps[this.context.currentStep].title}</h2>
                <ReactMarkdown source={this.context.currentLab.steps[this.context.currentStep].markdown} />
                <this.PreviousButton/>
                <this.EditButton/>
                <this.AddStepButton/>
                <this.DeleteButton/>
                <this.NextButton/>
            </div>
        );
    }  // End of render()
}

LabStep.contextType = LabContext;
export default LabStep;
