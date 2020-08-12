import React from 'react';
// import Axios from "axios";

import LabContext from "../../lab.context";

import "./lab-list.styles.css";

class LabList extends React.Component {

    render() {
        return(
            <div>
                LabList Component Here
            </div>
        );
    }
}

LabList.contextType = LabContext;
export default LabList;