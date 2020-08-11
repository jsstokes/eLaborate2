import React from 'react';
import './App.css';
import SAMPLE_DATA from './sample-lab.data';

import LabContext from './lab.context';
import LabStep from './components/lab-step.component';
import LabDetails from './components/lab-details/lab-details.component';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authorized: true,
      currentLab: SAMPLE_DATA, 
      currentStep: 0, 
      nextClicked: () => {this.setState({"currentStep": this.state.currentStep + 1 })}
    }

  }
  render () {
    return (
      <div className="App">
        <LabContext.Provider value={this.state}>
          { /* 
            <LabStep allowEditing={true}/> 
          */}
          <LabDetails allowEditing={true}/>
        </LabContext.Provider>
      </div>
    )
  }
}

export default App;
