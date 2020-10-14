import React from 'react';

import '../../lab.context';
import "./lab-select-page.styles.css";
import LabContext from '../../lab.context';
import '../../components/lab-list/lab-list.component';
import LabList from '../../components/lab-list/lab-list.component';
import { connect } from 'react-redux';

class LabSelectPage extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
        // if (this.props.currentLab) {
        //     return null;
        // }
        return(
            <div>
                <LabList/>      
            </div>
        );
    }
}
LabSelectPage.contextType = LabContext;

const mapStateToProps = (state) => ({
    currentLab: state.lab.currentLab
})

export default connect(mapStateToProps)(LabSelectPage);