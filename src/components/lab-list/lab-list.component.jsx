import React from 'react';
import Axios from "axios";

import LabContext from "../../lab.context";

import "./lab-list.styles.css";

class LabList extends React.Component {

    componentDidMount() {
        Axios.get("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getLabs")
            .then( response => {
                // console.log("LabList: ", response);
                this.context.setLabList(response.data);
                // console.log("Context:", this.context);
                this.forceUpdate();
            })
    }

    LabListItem = (props) => {
        // console.log("LabItem lab:", props.lab);
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
        // console.log("About to find:", oid);
        Axios.get(
            `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getLab`,
            { 
                params: {
                    id: oid 
                }
            }
        )
        .then(response => {
            // console.log("Item found:",response.data);
            alert("Found this lab: " + JSON.stringify(response.data,0,2));
        });
    }

    render() {
        if (this.context.labList != null) {
            // console.log("labList size is", this.context.labList.length);
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
                </div>
            );
        }  // End of if labList

        return(<div>No Labs defined</div>);
    }
}

LabList.contextType = LabContext;
export default LabList;