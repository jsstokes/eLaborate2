import React from "react";

import LabContext from "../../lab.context";
import LabStep from '../../components/lab-step/lab-step.component';
import LabDetails from '../../components/lab-details/lab-details.component';

import "./lab-page.styles.css";

class LabPage extends React.Component {
    constructor() {
        super();
        this.state = {
          currentStep: 0, 
          nextClicked: () => {this.setState({"currentStep": this.state.currentStep + 1 })}
        }
      }
      componentDidMount() {
          console.log("Inside of LabPage.componentDidMount");
          console.log("Context values are:", this.context);
      }
     
    render() {
        if (this.context.labView === "Steps") {
            return (
                <div>
                    <LabStep allowEditing={true}/>
                </div>
            );
        } 
        return (
            <div>
                <LabDetails allowEditing={true}/>
            </div>
        );
    }
}

LabPage.contextType = LabContext;

export default LabPage;
