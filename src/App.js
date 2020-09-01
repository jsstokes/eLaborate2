import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import SAMPLE_DATA from './sample-lab.data';

import LabContext from './lab.context';
import StudentPage from './pages/student-page/student-page-page';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginPage from './pages/login-page/login-page.page';
import MainPage from './pages/main-page/main-page.page';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      currentLab: null, 
      setCurrentLab: (lab) => {this.setState({"currentLab": lab})},
      
      // Current Lab ID is set either from the LabList or from the URL parm
      currentLabID: null,
      setCurrentLabID: (lab_id) => {this.setState({"currentLabID": lab_id})},
      
      currentStep: 0, 
      setCurrentStep: (step) => {this.setState({"currentStep": step})},
      replaceStep: (index, step) => {
        let newLab = this.state.currentLab;
        newLab.steps[index] = step;
        this.state.setCurrentLab(newLab);
      } ,

      labView: "Details",
      setLabView: (view) => { this.setState({"labView": view})},

      labList: null,
      setLabList: (list) => {this.setState({"labList": list})},

      nextClicked: () => {this.setState({"currentStep": this.state.currentStep + 1 })},

      tempEditStep: null,
      setTempEditStep: (target) => {this.setState({"tempEditStep": target})},

      isEditing: false,
      toggleIsEditing: ()=> {this.setState({"isEditing": !this.state.isEditing})},

      labHasChanged: false,
      setLabHasChanged: (value) => {this.setState({"labHasChanged": value})}
    }
  };

  //-----------------------------------------------------
  // Original function - uncomment to restore AuthButton
  // ----------------------------------------------------
  render () {
    console.log("USERID from redux:", this.props);
    return (
      <Router>
        <div>
          <LabContext.Provider value={this.state}>
            <LabContext.Consumer>
              {({context}) => (
                <Switch>
                  <Route path="/" exact render={props => (
                    this.props.userid === ""
                    ? <LoginPage handleSaveButton={this.handleSaveButton}/>
                    : <MainPage/>
                  )}/>
                  <Route path="/student/:workshop_id/:student_id?" component={StudentPage} />
                  <Route path="/login">
                    <LoginPage redirectTarget="/"/>
                  </Route>
                  <Route>
                    <div className="TopLevelDiv"><h1>Page not found</h1></div>
                  </Route>
                </Switch>
              )}
            </LabContext.Consumer>
          </LabContext.Provider>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  userid: state.user.userid
})

export default connect(mapStateToProps)(App);
