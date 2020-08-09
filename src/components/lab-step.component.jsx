import React from "react";
import LabContext from "../lab.context";
// import context from "react-bootstrap/esm/AccordionContext";
import ReactMarkdown from 'react-markdown';

import {BLANK_STEP} from '../sample-lab.data';

class LabStep extends React.Component {

    constructor() {
        super();
        var newStep = {};
        Object.assign(newStep,BLANK_STEP);
        this.state = {
            isEditing: false, 
            tempEditStep: newStep,
        }
    }

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
        if (this.context.currentLab.step < MAX_STEP) {
            this.context.currentLab.step = this.context.currentLab.step + 1;
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

  render() {
    var currentLab = this.context.currentLab;
    var step = this.context.currentStep;
    var nextClicked = this.context.nextClicked;

    var disableNext = false;
    if ((step + 1) === currentLab.steps.length) {
        console.log("Disabled to true");
        disableNext = true;
    } else {
        console.log("Disabled to false");
        disableNext = false;
    }

    var disablePrevious = false;
    if (step > 0) {
        disablePrevious = false;
    } else {
        disablePrevious = true;
    }

    if (this.state.isEditing) {
        return(
            <div>
                <input type="text" name="title" onChange={this.handleKeyChange} value={this.state.tempEditStep.title} />
                <textarea cols={80} rows={20} name="markdown" onChange={this.handleKeyChange} value={this.state.tempEditStep.markdown}/>
                <button onClick={this.handleSave}>Save</button>
            </div>
        )
    } 

    return (
      <div>
        <h2>{currentLab.steps[step].title}</h2>
        <ReactMarkdown source={currentLab.steps[step].markdown} />
        <button disabled={disablePrevious} onClick={this.handlePrevious}>Previous</button>
        <button onClick={this.toggleEdit}>Edit</button>
        {console.log("in Render: disableNext is",disableNext)}
        <button onClick={nextClicked} disabled={disableNext}>Next</button>
        <button onClick={this.handleNewStepAfter}>New Step After</button>
        <button onClick={this.handleDeleteStep}>Delete</button>
      </div>
    );
  }
}
LabStep.contextType = LabContext;
export default LabStep;
