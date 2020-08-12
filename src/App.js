import React from 'react';
import './App.css';
import SAMPLE_DATA from './sample-lab.data';

import LabContext from './lab.context';
import LabPage from './pages/lab-page/lab-page.component';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authorized: false,
      currentLab: SAMPLE_DATA, 
      currentStep: 0, 
      labsStarted: false,
      nextClicked: () => {this.setState({"currentStep": this.state.currentStep + 1 })}
    }
  }

  render () {
    return (
      <div>
        <LabContext.Provider value={this.state}>
          <LabContext.Consumer>
          {({context}) => (
            <LabPage /> 
          )}
          </LabContext.Consumer>
        </LabContext.Provider>
      </div>
    )
  }
}

export default App;
