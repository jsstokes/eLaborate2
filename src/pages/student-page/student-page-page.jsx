import React from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';

import LabContext from '../../lab.context';

class StudentPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("Entering StudentPage.componentDidMount - context is:", this.context);
        if ((this.context.currentLabID) && (!this.context.currentLab)) {
            console.log("=== Makeing AXIOS call to get lab");
            Axios.get(
                `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getLab`,
                { 
                    params: {
                        id: this.context.currentLabID 
                    }
                }
            )
            .then(response => {
                console.log("AXIOS Response:", response.data);
                this.context.setCurrentLab(response.data);
            });
        }

    }

    render() {
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}
StudentPage.contextType = LabContext;
export default withRouter(StudentPage);