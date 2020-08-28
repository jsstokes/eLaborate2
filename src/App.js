import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import SAMPLE_DATA from './sample-lab.data';

import LabContext from './lab.context';
import LabPage from './pages/lab-page/lab-page.component';
import LabSelectPage from './pages/lab-select-page/lab-select-page.component';
import AuthButton from './components/auth-button/auth-button.component';
import StudentPage from './pages/student-page/student-page-page';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginPage from './pages/login-page/login-page.page';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {
        userid: "",
        role: "",
        authorized: false, 
      },
      setAuthorized: (authorized, userid="", role="") => 
      { 
        let newAuth = { "userid": userid,"role": role,"authorized":  authorized};
        this.setState(newAuth);
      },
      isAuthorized: () => { return (this.state.auth.authorized)},
      isInRole: (role) => { 
        if (role === this.state.auth.role) {
          return true
        } else {
          return false
        }
      },
      
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
    return (
      <Router>
        <div>
          <LabContext.Provider value={this.state}>
            <LabContext.Consumer>
              {({context}) => (
                <Switch>
                  <Route path="/" exact>
                    <div>
                      <AuthButton/>
                      <LabSelectPage />
                      <LabPage /> 
                    </div>
                  </Route>
                  <Route path="/student/:workshop_id/:student_id?">
                    <div>
                    <StudentPage>
                      <LabPage /> 
                    </StudentPage>
                    </div>
                  </Route>
                  {
                    // Route for testing stuff
                  }
                  <Route path="/junk"
                    render={props => (
                      this.state.auth.userid === "" 
                      ? <LoginPage handleSaveButton={this.handleSaveButton}/>
                      : <StudentPage/>
                      )}/>
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

export default App;
