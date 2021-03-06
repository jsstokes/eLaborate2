import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import LabContext from '../../lab.context';
import { setCurrentStep, setCurrentLab, deleteCurrentStep, setLabView, setLabHasChanged } from '../../redux/lab/lab.actions';
import { setStudentEmail } from '../../redux/user/user.actions';
// FontAwesome for buttons 
import { faChevronLeft,faUserEdit,faChevronRight, faPlus,faTrash, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { updateStatus } from '../../utils/workshop.utils';
import {BLANK_STEP} from '../../sample-lab.data';

class ButtonBar extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false, 
            allowEditing: false,
            mode: this.props.mode ? props.mode : "STEPS"
        }
    }

    handlePrevious = () => {
        if (this.props.currentStep > 0) {
            this.props.setCurrentStep(this.props.currentStep - 1);
            if (this.props.currentWorkshop) {
                updateStatus(  
                    this.props.currentWorkshop._id.$oid,
                    this.props.studentEmail,
                    this.props.currentStep - 1
                );
            }
        }
    }

    handleOverview = ()  => {
        this.props.setLabView("Description");
        if (this.props.currentWorkshop) {
            updateStatus(  
                this.props.currentWorkshop._id.$oid,
                this.props.studentEmail,
                -1
            );
        }
    }

    PreviousButton = (props) => {
        if (this.props.currentStep === 0) {
            return(
                <Button onClick={this.handleOverview} className={props.className}>
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
        if (props.userid) {
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
            if (this.props.currentWorkshop) {
                updateStatus(  
                    this.props.currentWorkshop._id.$oid,
                    this.props.studentEmail,
                    this.props.currentStep + 1
                );
            }
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
                let newLab = this.props.currentLab;
                newLab._id = response.data.insertedId;
                this.props.setCurrentLab(newLab);
            } else {
            }
            this.props.setLabHasChanged(false);
        });
    }   // end of handleSaveLab

    SaveLabButton = (props) => {
        if (this.props.userid) {
            return (
                <button 
                onClick={this.handleSaveLab} 
                className={props.className}
                disabled={!this.props.labHasChanged}
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
ButtonBar.contextType = LabContext;

// ======================

// ==============================


const mapStateToProps = (state) => ({
    userid: state.user.userid,
    currentLab: state.lab.currentLab,
    currentStep: state.lab.currentStep,
    labHasChanged: state.lab.labHasChanged,
    studentEmail: state.user.studentEmail,
    currentWorkshop: state.workshop.currentWorkshop,
})

const mapDispatchToProps = dispatch => ({
    setStudentEmail: email => dispatch(setStudentEmail(email)),
    setCurrentStep: step => dispatch(setCurrentStep(step)),
    setCurrentLab: lab => dispatch(setCurrentLab(lab)),
    deleteCurrentStep: lab  => dispatch(deleteCurrentStep(lab)),
    setLabView: labView => dispatch(setLabView(labView)),
    setLabHasChanged: hasChanged => dispatch(setLabHasChanged(hasChanged)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ButtonBar);
