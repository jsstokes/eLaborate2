import React from "react";

import LabContext from "./lab.context";
import LabStep from './components/lab-step.component';
import LabDetails from './components/lab-details/lab-details.component';
// FontAwesome for buttons
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SAMPLE_DATA from './sample-lab.data';

import "./lab-page.styles.css";

class LabPage extends React.Component {
    constructor() {
        super();
        this.state = {
          authorized: false,
          currentLab: SAMPLE_DATA, 
          currentStep: 0, 
          nextClicked: () => {this.setState({"currentStep": this.state.currentStep + 1 })}
        }
      }

    handleAuthButton = () => {
        console.log("handlAuth - authorized begin: ",this.context.authorized);
        var newState = {authorized: !this.state.authorized}
        this.context.authorized = !this.state.authorized;
        console.log("handlAuth - authorized end: ",this.context.authorized);
        this.setState(newState);
    }

        authButton = (props) => {
        if (this.state.authorized) {
            return(
            <span onClick={this.handleAuthButton}  className={props.className}>
                <FontAwesomeIcon icon={faLockOpen} />
            </span>
            );
            return(
            <span onClick={this.handleAuthButton}  className={props.className}>
                <FontAwesomeIcon icon={faLock} />
            </span>
            );
        }
    
        return(
            <span onClick={this.handleAuthButton}  className={props.className}>
              <FontAwesomeIcon icon={faLock} />
            </span>
          ); 
        }
      
    render() {
        // return(<div>Lab Page goes here</div>);
        return (
        <div>
            <div className="Auth-div">
            <this.authButton className="Auth-button" />
            </div>
            <div className="App">
            <LabContext.Provider value={this.state}>
                {/* 
                <LabDetails allowEditing={true}/>
            */}
                <LabStep allowEditing={true} />
            </LabContext.Provider>
            </div>
        </div>
        );
  }
}

LabPage.contextType = LabContext;

export default LabPage;
