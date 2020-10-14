import axios from "axios";
const GET_LAB_URL = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getLab";

export function getLab(labID, callback) {
    axios.get(
        `GET_LAB_URL`,
        { 
            params: {
                id: labID 
            }
        }
    )
    .then(response => {
        callback(response);
        // this.props.setCurrentLab(response.data);
        // this.props.setLabView("Description");
        // this.props.setCurrentStep(0);
        // this.props.history.push("/lab");
    });

}