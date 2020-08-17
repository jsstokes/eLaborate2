import React from 'react';
import './App.css';
// import SAMPLE_DATA from './sample-lab.data';

import LabContext from './lab.context';
import LabPage from './pages/lab-page/lab-page.component';
import LabSelectPage from './pages/lab-select-page/lab-select-page.component';
import AuthButton from './components/auth-button/auth-button.component';

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

      nextClicked: () => {this.setState({"currentStep": this.state.currentStep + 1 })}
      
    }
  };

  //-----------------------------------------------------
  // Original function - uncomment to restore AuthButton
  // ----------------------------------------------------
  render () {
    return (
      <div>
        <LabContext.Provider value={this.state}>
          <LabContext.Consumer>
          {({context}) => (
            <div>
              <AuthButton/>
              <LabSelectPage />
              <LabPage /> 
            </div>
          )}
          </LabContext.Consumer>
        </LabContext.Provider>
      </div>
    )
  }
}

export default App;
