import React from 'react';
import {withRouter} from 'react-router-dom';

import LabContext from '../../lab.context';
import LabSelectPage from '../lab-select-page/lab-select-page.component';
import LabPage from '../lab-page/lab-page.component';

class MainPage extends React.Component {

    render() {
        return(
            <div>
                <LabSelectPage/>
                <LabPage/>
            </div>
        );
    }
}


MainPage.contextType = LabContext;

export default withRouter(MainPage);