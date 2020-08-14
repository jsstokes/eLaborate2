import React from "react";

import LabContext from "../../lab.context";
import LabStep from '../../components/lab-step/lab-step.component';
import LabDetails from '../../components/lab-details/lab-details.component';
import AuthButton from '../../components/auth-button/auth-button.component';

// FontAwesome for buttons
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SAMPLE_DATA from '../../sample-lab.data';

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
        // var newState = {authorized: !this.state.authorized}
        this.context.toggleAuthorized();
        console.log("handlAuth - authorized end: ",this.context.authorized);
        // this.setState(newState);
    }

    authButton = (props) => {
        if (this.context.authorized) {
            return(
            <span onClick={this.handleAuthButton}  className={props.className}>
                <FontAwesomeIcon icon={faLockOpen} />
            </span>
            );
        }
        return(
            <span onClick={this.handleAuthButton}  className={props.className}>
                <FontAwesomeIcon icon={faLock} />
            </span>
        );
    }

    rerender = () => {
        this.forceUpdate();
    }
      
    render() {
        if (this.context.labView === "Steps") {
            return (
                <div>
                    {/* <AuthButton /> */}
                    <div className="App">
                        <LabStep allowEditing={true}  updateParent={this.rerender}/>
                    </div>
                </div>
            );
        } 
        return (
            <div>
                {/* <AuthButton /> */}
                <div className="App">
                        <LabDetails allowEditing={true} updateParent={this.rerender}/>
                </div>
            </div>
        );
    }
}

LabPage.contextType = LabContext;

export default LabPage;
