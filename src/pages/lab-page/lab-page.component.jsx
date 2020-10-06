import React from "react";
import {connect} from 'react-redux';

import LabContext from "../../lab.context";
import LabStep from '../../components/lab-step/lab-step.component';
import LabDetails from '../../components/lab-details/lab-details.component';
import NavBar from '../../components/nav-bar/nav-bar.component';
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from 'react-router-dom';

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
        console.log("LabPage - props:", this.props);
        if (!this.props.currentLab) {
            return(
                <div>
                    <NavBar/>
                    <div className="TopLevelDiv">
                        <h2>No Lab Selected</h2>
                        <LinkContainer to="/">
                            <Link to="/" >You must have a lab selected - click here to select one</Link>
                        </LinkContainer>
                    </div>
                </div>
            )
        }
        if (this.props.labView === "Steps") {
            return (
                <div>
                    <NavBar/>
                    <LabStep allowEditing={true}/>
                </div>
            );
        } 
        return (
            <div>
                <NavBar/>
                <LabDetails allowEditing={true}/>
            </div>
        );
    }
}

LabPage.contextType = LabContext;

const mapStateToProps = (state) => ({
    labView: state.lab.labView,
    currentLab: state.lab.currentLab
})

export default connect(mapStateToProps)(LabPage);
