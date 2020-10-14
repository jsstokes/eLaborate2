import React from 'react';
import NavBar from '../../components/nav-bar/nav-bar.component'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getWorkshopStatus } from '../../utils/workshop.utils';
import './monitor-page.styles.css';

const STATUS_URL = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getStatus";
const TEST_STATUS = [
    { "workshop_id": {"$oid": "5f75eae269f456bf3ad5bab8"}  , "student_id": "student1@mongodb.com", "step": 1 },
    { "workshop_id": {"$oid": "5f75eae269f456bf3ad5bab8"}  , "student_id": "student2@mongodb.com", "step": 2 },
    { "workshop_id": {"$oid": "5f75eae269f456bf3ad5bab8"}  , "student_id": "student3@mongodb.com", "step": 3 },
    { "workshop_id": {"$oid": "5f75eae269f456bf3ad5bab8"}  , "student_id": "student4@mongodb.com", "step": 4 },
    { "workshop_id": {"$oid": "5f75eae269f456bf3ad5bab8"}  , "student_id": "student5@mongodb.com", "step": 5 },
    { "workshop_id": {"$oid": "5f75eae269f456bf3ad5bab8"}  , "student_id": "student6@mongodb.com", "step": 6 },
    { "workshop_id": {"$oid": "5f75eae269f456bf3ad5bab8"}  , "student_id": "student7@mongodb.com", "step": 7 }
];

class MonitorPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: TEST_STATUS
        }
    }

    componentDidMount = () => {
        console.log("MonitorPage.componentdidMount - about to get status for:", this.props.currentWorkshop._id.$oid);
        getWorkshopStatus(this.props.currentWorkshop._id.$oid, this.processNewStatus);
    }

    processNewStatus = (updates) => {
        console.log("MonitorPage.processNewStatus received updates:", updates);
        this.setState({
            status: updates.data
        });
    }

    getCurrentStatus = () => {
        axios.get(  STATUS_URL, 
                    {
                        params: {
                            "workshop_id": this.props.currentWorkshop.workshop_id,
                            "student_id":  this.props.studentEmail
                        }
                    }
            )

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

    }

    StudentStatus = (props) => {
        return(
            <div className="MonitorListItem">
                <p>
                {props.student.student_id} -
                on step <b>{props.student.step}</b>&nbsp;
                of {this.props.currentLab.steps.length}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-primary">View Step {props.student.step}</button>
                </p>
            </div>
        );
    }

    render(props) {
        console.log("Monitoring:",this.props.currentWorkshop);
        console.log("THIS Props:", this.props);
        console.log("search:", this.props.location.search);

        console.log("Props:", props);
        if (this.props.currentWorkshop) {
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
                    <h1>No Workshop is selected</h1>
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

export default connect(mapStateToProps)(withRouter(MonitorPage));