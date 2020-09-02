import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import LabContext from '../../lab.context';

// FontAwesome for buttons 
import { faChevronLeft,faUserEdit,faChevronRight, faPlus,faTrash, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import {BLANK_STEP} from '../../sample-lab.data';

class MyNavBar extends React.Component {
   
    constructor(props) {
        super(props);
        var newStep = JSON.parse(JSON.stringify(BLANK_STEP));
        this.state = {
            isEditing: false, 
            allowEditing: false,
            tempEditStep: newStep,
            mode: this.props.mode ? props.mode : "STEPS"
        }
    }

    handlePrevious = () => {
        if (this.context.currentStep > 0) {
            this.context.setCurrentStep(this.context.currentStep - 1);
        }
    }

    PreviousButton = (props) => {
        if (this.context.currentStep === 0) {
            return(
                <Button onClick={() => {this.context.setLabView("Description")}} className={props.className}>
                    <FontAwesomeIcon icon={faChevronLeft} />&nbsp;Lab Overview
                </Button>
            );
        }
        return(
            <Button onClick={this.handlePrevious} className={props.className}>
                <FontAwesomeIcon icon={faChevronLeft} />&nbsp;Previous
            </Button>
        );
     }
     EditButton = (props) => {
        if (this.props.userid) {
            return(
                <Button onClick={props.onClick}  className={props.className}>
                    <FontAwesomeIcon icon={faUserEdit} />&nbsp;Edit
                </Button>
            );
        }
        return(null);
    }

    handleNext = () => {
        const MAX_STEP = this.props.currentLab.steps.length - 1;
        if (this.context.currentStep < MAX_STEP) {
            this.context.setCurrentStep(this.context.currentStep + 1);
        }
    }

    NextButton = (props) => {
        var disableNext = false;
        var lastStep = this.props.currentLab.steps.length - 1;

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
    }   // end of NextButton

    handleNewStepAfter = () => {
        let newStep = JSON.parse(JSON.stringify(BLANK_STEP));
        this.props.currentLab.steps.splice(this.context.currentStep + 1, 0, newStep); 
        this.context.setCurrentStep(this.context.currentStep + 1);

        // Changed
        // this.toggleEdit(this.context.currentStep + 1);
        // to this...
        this.props.editToggle(this.context.currentStep + 1);
    }

    AddStepButton = (props) => {
        if (this.props.userid) {
            return(
                <span onClick={this.handleNewStepAfter}  className={props.className}>
                <FontAwesomeIcon icon={faPlus} />&nbsp;Add Step
            </span>

            );
        }
        return(null);
    }

    handleDeleteStep = () => {
        this.props.currentLab.steps.splice(this.context.currentStep,1);
        if (this.context.currentStep > (this.props.currentLab.steps.length -1)) {
           this.context.setCurrentStep(this.props.currentLab.steps.length - 1);
        } else {
            this.context.setCurrentStep(this.context.currentStep);  // Force page refresh :D
        }
    }

    DeleteButton = (props) => {
        if (this.props.userid) {
            return (
                <span className={props.className} onClick={this.handleDeleteStep}>
                    <FontAwesomeIcon icon={faTrash} />&nbsp;Delete
                </span>
            );
        }
        return(null);
    }


    handleSaveLab = () => {
        axios.post(
            "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/saveLab",
            this.props.currentLab
        ).then(response => {
            if (response.data.hasOwnProperty("insertedId")) {
                // alert("A new lab was inserted, updating _id: " + JSON.stringify(response.data,0,2));
                let newLab = this.props.currentLab;
                newLab._id = response.data.insertedId;
                this.props.setCurrentLab(newLab);
            } else {
                // alert("Lab Updated", JSON.stringify(response.data,0,2));
            }
            this.context.setLabHasChanged(false);
        });
    }   // end of handleSaveLab

    SaveLabButton = (props) => {
        if (this.props.userid) {
            return (
                <button 
                onClick={this.handleSaveLab} 
                className={props.className}
                disabled={!this.context.labHasChanged}
                >
                <FontAwesomeIcon icon={faSave} />
                &nbsp;Save Lab
                </button>
            )
        }
        return(null);
    }   // end of SaveLabButton

    render(props) {
        return(
            <div>
                <this.PreviousButton />&nbsp;&nbsp;
                <this.EditButton  onClick={() => {this.props.editToggle(this.context.currentStep)}} className="btn btn-info"/>&nbsp;&nbsp;
                <this.AddStepButton className="btn btn-warning"/>&nbsp;&nbsp;
                <this.DeleteButton className="btn btn-danger"/>&nbsp;&nbsp;
                <this.NextButton className="btn btn-primary"/>&nbsp;&nbsp;
                <this.SaveLabButton className='btn btn-secondary'/>
            </div>
        );
    }
}
MyNavBar.contextType = LabContext;

const mapStateToProps = (state) => ({
    userid: state.user.userid,
    currentLab: state.lab.currentLab
})
export default connect(mapStateToProps)(MyNavBar);
