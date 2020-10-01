import React from 'react';
import NavBar from '../../components/nav-bar/nav-bar.component'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class MonitorPage extends React.Component {

    render() {
        console.log("Monitoring:",this.props.currentWorkshop);
        if (this.props.currentWorkshop) {
            return(
                <div>
                <NavBar/>
                <div className="TopLevelDiv">
                    <h1>Monitoring for {this.props.currentWorkshop.name} </h1>
                    <h3>Workshop ID {this.props.currentWorkshop._id.$oid}</h3>
                </div>
                </div>
            );
        } else {
            return(
                <div>
                <NavBar/>
                <div className="TopLevelDiv">
                    <h1>No Workshop is selected</h1>
                </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    currentWorkshop: state.workshop.currentWorkshop,
    currentLab: state.lab.currentLab,
})

export default connect(mapStateToProps)(withRouter(MonitorPage));