import React from "react";

import LabContext from "../../lab.context";
import LabStep from '../../components/lab-step/lab-step.component';
import LabDetails from '../../components/lab-details/lab-details.component';

// FontAwesome for buttons
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import "./lab-page.styles.css";

class LabPage extends React.Component {
    constructor() {
        super();
        this.state = {
          currentStep: 0, 
          nextClicked: () => {this.setState({"currentStep": this.state.currentStep + 1 })}
        }
      }

    handleAuthButton = () => {
        this.context.toggleAuthorized();
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
                    <LabStep allowEditing={true}  updateParent={this.rerender}/>
                </div>
            );
        } 
        return (
            <div>
                    <LabDetails allowEditing={true} updateParent={this.rerender}/>
            </div>
        );
    }
}

LabPage.contextType = LabContext;

export default LabPage;
