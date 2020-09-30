import React from 'react';
// import { connect } from 'react-redux';
// import { setCurrentWorkshop } from '../../redux/workshop/workshop.actions';
// import {Form, Row, Col, Button} from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import {LinkContainer} from 'react-router-bootstrap'
// import { Link } from 'react-router-dom';

class WorkshopList extends React.Component {
    constructor(props) {
        super(props);

    }
}
const mapStateToProps = (state) => ({
    userid: state.user.userid,
    currentWorkshop: state.workshop.currentWorkshop,
    currentLab: state.lab.currentLab
})

const mapDispatchToProps = dispatch => ({
    setCurrentWorkshop: workshop => dispatch(setCurrentWorkshop(workshop)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopList);