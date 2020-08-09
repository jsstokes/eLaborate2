import React from 'react';
import './App.css';
import SAMPLE_DATA from './sample-lab.data';

import LabContext from './lab.context';
import LabStep from './components/lab-step.component';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentLab: SAMPLE_DATA, 
      currentStep: 0, 
      nextClicked: () => {this.setState({"currentStep": this.state.currentStep + 1 })}
    }

  }
  render () {
    return (
      <div className="App">
        <LabContext.Provider value={this.state}>
            <LabStep />
        </LabContext.Provider>
      </div>
    )
  }
}

export default App;
