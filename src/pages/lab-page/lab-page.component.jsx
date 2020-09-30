import React from "react";
import {connect} from 'react-redux';

import LabContext from "../../lab.context";
import LabStep from '../../components/lab-step/lab-step.component';
import LabDetails from '../../components/lab-details/lab-details.component';

import "./lab-page.styles.css";

class LabPage extends React.Component {
    constructor() {
        console.log("In LabPage Constructor()");
        super();
        this.state = {
          currentStep: 0, 
          nextClicked: () => {this.setState({"currentStep": this.state.currentStep + 1 })}
        }
      }

      componentDidMount() {
      }
     
    render() {
        if (this.props.labView === "Steps") {
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

const mapStateToProps = (state) => ({
    labView: state.lab.labView
})

export default connect(mapStateToProps)(LabPage);
