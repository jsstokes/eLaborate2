import React, {Fragment} from 'react';
import Axios from "axios";
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { setCurrentLab, setCurrentLabID, setLabList, toggleIsEditing, setLabHasChanged } from '../../redux/lab/lab.actions';

// FontAwesome for buttons 
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LabContext from "../../lab.context";

import {BLANK_LAB} from '../../sample-lab.data';

import "./lab-list.styles.css";
// import { Button } from 'react-bootstrap';

class LabList extends React.Component {

    componentDidMount() {
        Axios.get("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getLabs")
            .then( response => {
                this.props.setLabList(response.data);
            })
    }

    NewLabButton = () => {
        return(
            <Fragment>
                <Button onClick={this.handleNewLab} variant="warning">
                <FontAwesomeIcon icon={faPlus} />&nbsp;New Lab
                </Button>
            </Fragment>
        );
    }
    handleNewLab = () => {
        let newLab = {
            "name": "",
            "description": "",
            "steps": [
                {
                    "title":"",
                    "markdown":"",
                    "textToCopy":""
                }
            ]
        };

        this.props.setCurrentLab(newLab);
    }


    LabListItem = (props) => {
        return(
            <div className="LabListItem">
                <div>Name: {props.lab.name}</div>
                <div>_id: {props.lab._id.$oid}</div>
                <div>Key/Index: {props.index}</div>
                <div><b>Description:</b> {props.lab.description}</div>
                <button 
                    className='btn btn-primary'
                    onClick={ () => {props.onClick(props.lab._id.$oid)}  }
                    >
                    Select
                </button>
                <button 
                    className='btn btn-primary'
                    onClick={ () => {props.onTestClick(props.lab._id.$oid)}  }
                    >
                    Open as Student
                </button>

            </div>
        );
    }

    handleSelectClick = (oid) => {
        this.props.setCurrentLabID(oid);
        Axios.get(
            `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getLab`,
            { 
                params: {
                    id: oid 
                }
            }
        )
        .then(response => {
            this.props.setCurrentLab(response.data);
            this.props.history.push("/lab");
        });
    }

    handleNewLabClick = () => {
        let newLab = JSON.parse(JSON.stringify(BLANK_LAB));
        this.props.setCurrentLab(newLab);
        this.props.setLabHasChanged(false);
        this.props.toggleIsEditing();
        this.props.history.push("/lab");
    }

    NewLabButton = () => {
        return(
            <Button variant='success' onClick={this.handleNewLabClick}>New Lab</Button>
        );
    }

    handleTestClick = (oid) => {
        let newPath = `/student/${oid}`;
        console.log("Setting Student URl is:", newPath);
        this.props.setCurrentLabID(oid);
        this.props.history.push(newPath);
        
    }

    render() {
        if (this.props.labList != null) {
            return(
                <div className="TopLevelDiv">
                    <h1>Available Labs ({this.props.labList.length}) </h1>
                    {
                        this.props.labList.map( (lab, index) => (
                            <this.LabListItem 
                                lab={lab} 
                                key={index} 
                                index={index}
                                onClick={this.handleSelectClick}
                                onTestClick={this.handleTestClick}
                            />
                        ))
                    }
                    <this.NewLabButton/>
                </div>
            );
        }  // End of if labList

        return(<div>No Labs defined</div>);
    }
}

LabList.contextType = LabContext;

const mapStateToProps = (state) => ({
    userid: state.user.userid,
    labList: state.lab.labList,
    isEditing: state.lab.isEditing,
    labHasChanged: state.lab.labHasChanged
})

const mapDispatchToProps = dispatch => ({
    setCurrentLab: lab => dispatch(setCurrentLab(lab)),
    setCurrentLabID: lab_id => dispatch(setCurrentLabID(lab_id)),
    setLabList: labList => dispatch(setLabList(labList)),
    toggleIsEditing: () => dispatch(toggleIsEditing()),
    setLabHasChanged: (hasChanged) => dispatch(setLabHasChanged(hasChanged))
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LabList));