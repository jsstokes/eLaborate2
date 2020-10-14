import React from 'react';
import NavBar from '../../components/nav-bar/nav-bar.component'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import axios from 'axios';
import { getWorkshopStatus, getWorkshop } from '../../utils/workshop.utils';
import { setCurrentWorkshop } from '../../redux/workshop/workshop.actions';
import { setCurrentLab } from '../../redux/lab/lab.actions';
import './monitor-page.styles.css';

// const STATUS_URL = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getStatus";
// const TEST_STATUS = [
//     { "workshop_id": {"$oid": "5f75eae269f456bf3ad5bab8"}  , "student_id": "student1@mongodb.com", "step": 1 },
//     { "workshop_id": {"$oid": "5f75eae269f456bf3ad5bab8"}  , "student_id": "student2@mongodb.com", "step": 2 },
//     { "workshop_id": {"$oid": "5f75eae269f456bf3ad5bab8"}  , "student_id": "student3@mongodb.com", "step": 3 },
//     { "workshop_id": {"$oid": "5f75eae269f456bf3ad5bab8"}  , "student_id": "student4@mongodb.com", "step": 4 },
//     { "workshop_id": {"$oid": "5f75eae269f456bf3ad5bab8"}  , "student_id": "student5@mongodb.com", "step": 5 },
//     { "workshop_id": {"$oid": "5f75eae269f456bf3ad5bab8"}  , "student_id": "student6@mongodb.com", "step": 6 },
//     { "workshop_id": {"$oid": "5f75eae269f456bf3ad5bab8"}  , "student_id": "student7@mongodb.com", "step": 7 }
// ];

class MonitorPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "workshop_id": props.match.params.workshop_id
        }
    }

    componentDidMount = () => {
        if (!this.props.currentWorkshop) {
            getWorkshop(this.state.workshop_id, this.processNewWorkshop);
        }
        getWorkshopStatus(this.state.workshop_id, this.processNewStatus);
    }

    processNewWorkshop = (workshop) => {
        this.props.setCurrentWorkshop(workshop);
        this.props.setCurrentLab(workshop.lab);
    }

    processNewStatus = (updates) => {
        this.setState({
            status: updates.data
        });
    }


    StudentStatus = (props) => {
        //
        // Temporarily remove the View Step Button until that functionality is available
        //
        console.log("props.student:", props.student);
        return(
            
            <div className="MonitorListItem">
                <p>
                {props.student.student_id} -
                on step <b>{props.student.current_step.$numberInt}</b>&nbsp;
                of {this.props.currentLab.steps.length}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
            </div>
        );
        // ---------------------------------------------------------------------------------
        //  This code renders the View Step button - uncomment when functionality is ready
        // ---------------------------------------------------------------------------------
        // return(
        //     <div className="MonitorListItem">
        //         <p>
        //         {props.student.student_id} -
        //         on step <b>{props.student.step}</b>&nbsp;
        //         of {this.props.currentLab.steps.length}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        //         <button className="btn btn-primary">View Step {props.student.step}</button>
        //         </p>
        //     </div>
        // );
    }

    render(props) {
        if ((this.props.currentWorkshop) && (this.state.status) && (this.props.currentLab)) {
            return(
                <div>
                <NavBar/>
                <div className="TopLevelDiv">
                    <h1>Monitoring for  </h1>
                    <h5>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.currentWorkshop.name} 
                        (&nbsp;<i>_id: {this.props.currentWorkshop._id.$oid}</i>&nbsp;) - {this.state.status.length} Students Participating
                    </h5>
                    <hr/>
                    {
                        this.state.status.map( (student, index) => (
                            <this.StudentStatus student={student} key={index} />
                        ) )
                    }
                </div>
                </div>
            );
        } else {
            return(
                <div>
                <NavBar/>
                <div className="TopLevelDiv">
                    <h1>No Workshop is selected - please wait while it is being retrieved</h1>
                </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    currentWorkshop: state.workshop.currentWorkshop,
    currentLab: state.lab.currentLab,
})

const mapDispatchToProps = dispatch => ({
    setCurrentWorkshop: workshop => dispatch(setCurrentWorkshop(workshop)),
    setCurrentLab: lab => dispatch(setCurrentLab(lab)),
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(MonitorPage));