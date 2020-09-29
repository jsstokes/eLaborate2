import React from 'react';
import NavBar from '../../components/nav-bar/nav-bar.component';
import WorkshopForm from '../../components/workshop-form/workshop-form.component';


class WorkshopPage extends React.Component {
    render() {
        return(
            <div>
                <NavBar></NavBar>
                <WorkshopForm />
            </div>
        );
    }
}
export default WorkshopPage;