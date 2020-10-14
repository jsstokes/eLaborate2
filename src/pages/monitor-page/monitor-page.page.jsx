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
        console.log("MonitorPage.constructor props:", props);
        this.state = {
            "workshop_id": props.match.params.workshop_id
        }
        console.log("MonitorPage.constructor state set to:", this.state);
    }

    componentDidMount = () => {
        // console.log("MonitorPage.componentdidMount - about to get status for:", this.props.currentWorkshop._id.$oid);
        console.log("MonitorPage.componentdidMount - about to get status for:", this.props.match.workshop_id);
        // getWorkshopStatus(this.props.currentWorkshop._id.$oid, this.processNewStatus);
        if (!this.props.currentWorkshop) {
            console.log("MonitorPage.componentDidMount: getting currentWorkshop");
            getWorkshop(this.state.workshop_id, this.processNewWorkshop);
        }
        // if (!this.props.currentLab) {
        //     console.log("MonitorPage.componentDidMount: getting currentLab");
        //     getLab( )
        // }
        console.log("MonitorPage.componentDidMount: getting status");
        getWorkshopStatus(this.state.workshop_id, this.processNewStatus);
    }

    processNewWorkshop = (workshop) => {
        this.props.setCurrentWorkshop(workshop);
        this.props.setCurrentLab(workshop.lab);
    }

    processNewStatus = (updates) => {
        console.log("MonitorPage.processNewStatus received updates:", updates);
        this.setState({
            status: updates.data
        });
    }

    // getCurrentStatus = () => {
    //     axios.get(  STATUS_URL, 
    //                 {
    //                     params: {
    //                         "workshop_id": this.state.workshop_id,
    //                         "student_id":  this.props.studentEmail
    //                     }
    //                 }
    //         )

        // filterDoc = {
        //      "workshop_id": "0101",
        //      "student_id": "mitch@mail.com"
        //    }

        // Axios.get("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getWorkshop",
        // {
        //     params: {
        //         "id": id
        //     }
        // }).then(response => {
        //     console.log("Returned:", response.data);
        //     var newDate = new Date(response.data.startDate);
        //     response.data.startDate = newDate;
        //     this.props.setCurrentWorkshop(response.data);
        //     this.props.setCurrentLab(response.data.lab);
        // })

    // }

    StudentStatus = (props) => {
        //
        // Temporarily remove the View Step Button until that functionality is available
        //
        return(
            <div className="MonitorListItem">
                <p>
                {props.student.student_id} -
                on step <b>{props.student.step}</b>&nbsp;
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
        //console.log("Monitoring:",this.props.currentWorkshop);
        console.log("THIS Props:", this.props);
        console.log("search:", this.props.location.search);
        console.log("MonitorPage.render state:", this.state);

        console.log("MonitorPage.render - Props:", this.props);
        console.log("MonitorPage.render - State:", this.state);
        if ((this.props.currentWorkshop) && (this.state.status) && (this.props.currentLab)) {
            return(
                <div>
                <NavBar/>
                <div className="TopLevelDiv">
                    <h1>Monitoring for  </h1>
                    <h5>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.currentWorkshop.name} 
                        (&nbsp;<i>_id: {this.props.match.workshop_id}</i>&nbsp;) - {this.state.status.length} Students Participating
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