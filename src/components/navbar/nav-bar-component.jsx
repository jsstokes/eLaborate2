import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import LabContext from '../../lab.context';
import { setCurrentStep, setCurrentLab, deleteCurrentStep, setLabView } from '../../redux/lab/lab.actions';

// FontAwesome for buttons 
import { faChevronLeft,faUserEdit,faChevronRight, faPlus,faTrash, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import {BLANK_STEP} from '../../sample-lab.data';

class MyNavBar extends React.Component {
   
    constructor(props) {
        super(props);
        // var newStep = JSON.parse(JSON.stringify(BLANK_STEP));
        this.state = {
            isEditing: false, 
            allowEditing: false,
            // tempEditStep: newStep,   // Doesn't appear to be needed - delete next time if no issues
            mode: this.props.mode ? props.mode : "STEPS"
        }
    }

    handlePrevious = () => {
        if (this.props.currentStep > 0) {
            this.props.setCurrentStep(this.props.currentStep - 1);
        }
    }

    PreviousButton = (props) => {
        if (this.props.currentStep === 0) {
            return(
                <Button onClick={() => {this.props.setLabView("Description")}} className={props.className}>
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
        if (this.props.currentStep < MAX_STEP) {
            this.props.setCurrentStep(this.props.currentStep + 1);
        }
    }

    NextButton = (props) => {
        var disableNext = false;
        var lastStep = this.props.currentLab.steps.length - 1;

        if ((this.props.currentStep) === lastStep) {
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
        this.props.currentLab.steps.splice(this.props.currentStep + 1, 0, newStep); 
        this.props.setCurrentStep(this.props.currentStep + 1);

        // Changed
        // this.toggleEdit(this.props.currentStep + 1);
        // to this...
        this.props.editToggle(this.props.currentStep + 1);
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
        console.log("NavBar.handleDeleteStep");
        console.log("NavBar.handleDeleteStep - currentStep", this.props.currentStep);
        console.log("NavBar.handleDeleteStep - labSteps", this.props.currentLab.steps.length);
        this.props.deleteCurrentStep(this.props.currentLab);
        this.props.handleForceUpdate();
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
                <this.EditButton  onClick={() => {this.props.editToggle(this.props.currentStep)}} className="btn btn-info"/>&nbsp;&nbsp;
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
    currentLab: state.lab.currentLab,
    currentStep: state.lab.currentStep
})

const mapDispatchToProps = dispatch => ({
    setCurrentStep: step => dispatch(setCurrentStep(step)),
    setCurrentLab: lab => dispatch(setCurrentLab(lab)),
    deleteCurrentStep: lab  => dispatch(deleteCurrentStep(lab)),
    setLabView: labView => dispatch(setLabView(labView))
})
export default connect(mapStateToProps, mapDispatchToProps)(MyNavBar);
