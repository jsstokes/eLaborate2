import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCurrentWorkshop, setWorkshopList } from '../../redux/workshop/workshop.actions';
import Axios from 'axios';
import { setCurrentLab } from '../../redux/lab/lab.actions';
import { BLANK_WORKSHOP } from '../../redux/workshop/workshop.reducer';
// import {Form, Row, Col, Button} from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import {LinkContainer} from 'react-router-bootstrap'
// import { Link } from 'react-router-dom';

class WorkshopList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount = () => {
        console.log("componentDidMount: getting workshoplist");
        Axios.get("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getWorkshops")
        .then( response => {
        console.log("componentDidMount: response - ", response);
        this.props.setWorkshopList(response.data);
        })
    }

    handleEdit = (id) => {
        console.log("Fetching workshop:", id);
        Axios.get("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getWorkshop",
        {
            params: {
                "id": id
            }
        }).then(response => {
            console.log("Returned:", response.data);
            var newDate = new Date(response.data.startDate);
            response.data.startDate = newDate;
            this.props.setCurrentWorkshop(response.data);
            this.props.setCurrentLab(response.data.lab);
        })
    }

    handleNew = () => {
       this.props.setCurrentWorkshop(BLANK_WORKSHOP); 
    }

    handleMonitorClick = (workshopID) => {
        console.log("Monitor Workshop Clicked:", workshopID);
        Axios.get("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getWorkshop",
        {
            params: {
                "id": workshopID
            }
        }).then(response => {
            console.log("Returned:", response.data);
            var newDate = new Date(response.data.startDate);
            response.data.startDate = newDate;
            this.props.setCurrentWorkshop(response.data);
            this.props.setCurrentLab(response.data.lab);
            this.props.history.push("/monitor");
        })

    }

    WorkListItem = (props) => {
        console.log("returning WorklistItem with:", props);
        return(
            <div className="LabListItem">
            <div>Name: {props.workshop.name}</div>
            <div>_id: {props.workshop._id.$oid}</div>
            <div>Key/Index: {props.index}</div>
            <div><b>Description:</b> {props.workshop.description}</div>
            <div><b>Customer:</b> {props.workshop.customer}</div>
            <button 
                className='btn btn-primary'
                onClick={ () => {this.handleEdit(props.workshop._id.$oid)}  }
                >
                Edit
            </button>
            <button 
                className='btn btn-primary'
                onClick={ () => {props.onMonitorClick(props.workshop._id.$oid)}  }
                >
                Monitor Workshop
            </button>

        </div>

        );
    }

    render() {
        if (this.props.workshopList) {
            console.log("Rendering WorkshopList with elements");
            return(
                <div className="TopLevelDiv">
                    <h1>Workshop List</h1>
                    {
                            this.props.workshopList.map( (workshop, index) => (
                                <this.WorkListItem 
                                    workshop={workshop} 
                                    key={index} 
                                    index={index}
                                    onClick={this.handleSelectClick}
                                    onMonitorClick={this.handleMonitorClick}
                                />
                            ))
                    }
                    <button className='btn btn-primary' onClick={this.handleNew}>New</button>
                </div>
            );
            } else {
                console.log("Rendering WorkshopList WITHOUT elements:");
                return(
                    <div className="TopLevelDiv">
                        <h1>WorkshopList</h1>
                        <button className='btn btn-primary' onClick={this.handleNew}>New</button>
                    </div>
                );
                }
    }
}
const mapStateToProps = (state) => ({
    userid: state.user.userid,
    currentWorkshop: state.workshop.currentWorkshop,
    currentLab: state.lab.currentLab,
    workshopList: state.workshop.workshopList
})

const mapDispatchToProps = dispatch => ({
    setCurrentWorkshop: workshop => dispatch(setCurrentWorkshop(workshop)),
    setWorkshopList: workshopList => dispatch(setWorkshopList(workshopList)),
    setCurrentLab: lab => dispatch(setCurrentLab(lab)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WorkshopList));