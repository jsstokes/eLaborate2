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
      isEditing: false,
      toggleEdit: () => { console.log("toggleEdit");this.setState({"editing": !this.state.editing});},
      previousEnabled: () => {console.log("previousenabled"); return(!this.state.currentStep > 0) },
      nextClicked: () => {this.setState({"currentStep": this.state.currentStep + 1 })}
    }

  }
  render () {
    return (
      <div className="App">
        <LabContext.Provider value={this.state}>
          <LabContext.Consumer>
          { context => (
            <LabStep 
              lab={context.currentLab} 
              step={context.currentStep} 
              isEditing={context.isEditing} 
              toggleEdit={context.toggleEdit} 
              previousEnabled={context.previousEnabled}
              nextClicked={context.nextClicked}
            />
          )}
          </LabContext.Consumer>
        </LabContext.Provider>
      </div>
    )
  }
}

export default App;
