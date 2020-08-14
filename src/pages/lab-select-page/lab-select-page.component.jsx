import React from 'react';

import '../../lab.context';
import "./lab-select-page.styles.css";
import LabContext from '../../lab.context';
import '../../components/lab-list/lab-list.component';
import LabList from '../../components/lab-list/lab-list.component';
import AuthButton from '../../components/auth-button/auth-button.component';

class LabSelectPage extends React.Component {

    render() {
        if (this.context.currentLab) {
            return null;
        }
        return(
            <div>
                <AuthButton/>
                <LabList/>
            </div>
        );
    }
}
LabSelectPage.contextType = LabContext;
export default LabSelectPage;