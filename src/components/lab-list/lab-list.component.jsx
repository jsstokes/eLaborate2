import React from 'react';
import Axios from "axios";

import LabContext from "../../lab.context";

import {BLANK_LAB} from '../../sample-lab.data';

import "./lab-list.styles.css";
import { Button } from 'react-bootstrap';

class LabList extends React.Component {

    componentDidMount() {
        Axios.get("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getLabs")
            .then( response => {
                this.context.setLabList(response.data);
            })
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
            </div>
        );
    }

    handleSelectClick = (oid) => {
        Axios.get(
            `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getLab`,
            { 
                params: {
                    id: oid 
                }
            }
        )
        .then(response => {
            this.context.setCurrentLab(response.data);
        });
    }

    handleNewLabClick = () => {
        console.log("New Lab Button Clicked: ", "should come in editing");
        let newLab = JSON.parse(JSON.stringify(BLANK_LAB));
        this.context.setCurrentLab(newLab);
        this.context.setLabHasChanged(false);
        this.context.toggleIsEditing();
    }

    NewLabButton = () => {
        return(
            <Button variant='success' onClick={this.handleNewLabClick}>New Lab</Button>
        );
    }

    render() {
        if (this.context.labList != null) {
            return(
                <div className="TopLevelDiv">
                    <h1>Available Labs ({this.context.labList.length}) </h1>
                    {
                        this.context.labList.map( (lab, index) => (
                            <this.LabListItem 
                                lab={lab} 
                                key={index} 
                                index={index}
                                onClick={this.handleSelectClick}
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
export default LabList;