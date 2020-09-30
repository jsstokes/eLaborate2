import React from 'react';
import NavBar from '../../components/nav-bar/nav-bar.component';
import WorkshopForm from '../../components/workshop-form/workshop-form.component';
import WorkshopList from '../../components/workshop-list/workshop-list.component'
import { setCurrentWorkshop } from '../../redux/workshop/workshop.actions';
import { connect } from 'react-redux';


class WorkshopPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    WorkshopPageView = () => {
        if (this.props.currentWorkshop) {
            return(<WorkshopForm />);
        } else {
            return(<WorkshopList/>);
        }
    }

    render() {
        return(
            <div>
                <NavBar></NavBar>
                <this.WorkshopPageView />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentWorkshop: state.workshop.currentWorkshop,
    workshopList: state.workshop.workshopList,
})

const mapDispatchToProps = dispatch => ({
    setCurrentWorkshop: workshop => dispatch(setCurrentWorkshop(workshop)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopPage);