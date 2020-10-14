import axios from 'axios';

export const STATUS_UPDATE_URL = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/saveStatus";
export const GET_STATUS_URL = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getStatus";
export const GET_WORKSHOP_URL = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/elaborate-qxkxj/service/elaborate/incoming_webhook/getWorkshop";

export     function updateStatus(workshopID, studentID, step) {
    console.log("Sending Status update:");
    console.log("   Workshop ID:", workshopID);
    console.log("   Student ID:", studentID);
    console.log("   Step:", step);
    if (studentID === "") {
        console.log("Student Progress not updated - student ID is missing");
    } else {
        axios.post(
            STATUS_UPDATE_URL,
            {
                "workshop_id": workshopID,
                "student_id": studentID,
                "step": step
            }
        ).then( response => {
            console.log("Student Progress updated:", response);
        }

        )
    }
}

export function getWorkshopStatus(workshop_id,callback) {
    axios.post(
        GET_STATUS_URL,
        {"workshop_id": workshop_id}
    ).then(response => {callback(response)});

}

export function getWorkshop(workshop_id,callback) {
    axios.get(
        GET_WORKSHOP_URL,
        {        
            params: {
                id: workshop_id 
            }
        }    
    ).then (response => { callback(response.data)});
}