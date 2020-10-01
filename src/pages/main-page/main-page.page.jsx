import React from 'react';
import {withRouter} from 'react-router-dom';
import NavBar from '../../components/nav-bar/nav-bar.component';

import LabContext from '../../lab.context';
import LabSelectPage from '../lab-select-page/lab-select-page.component';
// import LabPage from '../lab-page/lab-page.component';
// import { NavBar } from 'react-bootstrap';

class MainPage extends React.Component {

    render() {
        return(
            <div>
                <NavBar/>
                <LabSelectPage/>
            </div>
        );
    }
}


MainPage.contextType = LabContext;

export default withRouter(MainPage);