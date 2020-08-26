import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import SAMPLE_DATA from './sample-lab.data';

import LabContext from './lab.context';
import LabPage from './pages/lab-page/lab-page.component';
import LabSelectPage from './pages/lab-select-page/lab-select-page.component';
import AuthButton from './components/auth-button/auth-button.component';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authorized: true, 
      toggleAuthorized: () => { this.setState({"authorized": !this.state.authorized})},
      
      currentLab: null, 
      setCurrentLab: (lab) => {this.setState({"currentLab": lab})},
      
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

  StudentPage = (props) => {
    console.log(props);
    if (!props.match.params.student_id) {
      props.match.params.student_id = "no student id";
    }
    return(
      <div>
        <h1>Student Page here</h1>
        <h2>Workshop ID is {props.match.params.workshop_id}</h2>
        <h2>Student ID is {props.match.params.student_id}</h2>
      </div>
    );
  }

  StudentPageWithRouter = withRouter(this.StudentPage);

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
                    <div className="TopLevelDiv">
                      <this.StudentPageWithRouter/>
                    </div>
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
