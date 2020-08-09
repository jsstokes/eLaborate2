import React from "react";
// import LabContext from "../lab.context";
// import context from "react-bootstrap/esm/AccordionContext";
import ReactMarkdown from 'react-markdown';

class LabStep extends React.Component {
  render() {
    var disableNext = false;

    if ((this.props.step + 1) === this.props.lab.steps.length) {
        console.log("Disabled to true");
        disableNext = true;
    } else {
        console.log("Disabled to false");
        disableNext = false;
    }
    if (this.props.isEditing) {
        return(
            <div>
                <h2>{this.props.lab.steps[this.props.step].title}</h2>
                <textarea cols={80} rows={20} value={this.props.lab.steps[this.props.step].markdown}/>
                <button onClick={this.props.toggleEdit}>Save</button>
            </div>
        )
    } 

    return (
      <div>
        <h2>{this.props.lab.steps[this.props.step].title}</h2>
        <ReactMarkdown source={this.props.lab.steps[this.props.step].markdown} />
        <button disabled={this.props.previousEnabled()}>Previous</button>
        <button onClick={this.props.toggleEdit}>Edit</button>
        {console.log("in Render: disableNext is",disableNext)}
        <button onClick={this.props.nextClicked} disabled={disableNext}>Next</button>
      </div>
    );
  }
}

export default LabStep;
