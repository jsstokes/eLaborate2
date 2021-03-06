import React from 'react';
import './auth-button.styles.css';
import { Modal, Form } from 'react-bootstrap';
import LabContext from '../../lab.context';
import Button from 'react-bootstrap/Button';
// eslint-disable-next-line
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class AuthButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    handleAuthButton = () => {
        var newState = {
            authorized: this.context.isAuthorized,
            show: !this.state.show
        }
        this.setState(newState);
    }

    handleLoginOrLogOut = () => {
        this.context.toggleAuthorized();
        let newState = { show: !this.state.show };
        this.setState(newState);
    }

    handleClose = () => {
        let newState = { show: !this.state.show };
        this.setState(newState);
    }

    AuthModalBody = () => {
        let buttonText = "";
        if (this.context.isAuthorized) {
            buttonText = "Logout";
        } else {
            buttonText = "Login";
        }
        if (this.context.isAuthorized) {
            return(
                <Modal
                    show={this.state.show}
                >
                    <Modal.Header closeButton> 
                        <Modal.Title>eLaborate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Text>Are you sure you want to logout?</Form.Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.handleLoginOrLogOut}>
                            {buttonText}
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
        return(
            <Modal show={this.state.show}>
                <Modal.Header closeButton> 
                    <Modal.Title>eLaborate Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Control 
                    type='text' 
                    name='userid' 
                    value={this.props.studentEmail}
                    placeholder='Enter you user name'
                />
                <Form.Control 
                    type='password' 
                    name='password' 
                    value={this.state.password}
                    placeholder='Enter you user password'
                />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.handleLoginOrLogOut}>
                        {buttonText}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    AuthModalWindow = (props) => {
        return(
            <div>
                <Button onClick={this.handleAuthButton}  className={props.className}>
                    <FontAwesomeIcon icon={props.icon} />
                </Button>
                <this.AuthModalBody />
            </div>
        );
    }
    
    render() {
        return(null);

        // Bug in Bootstrap Modal - so commente out below
        // if (this.context.isAuthorized) {
        //     return(
        //         <this.AuthModalWindow icon={faLockOpen} className="Auth-button"/>
        //     );
        // }
        // return(
        //     <this.AuthModalWindow icon={faLock} className="Auth-button"/>
        //     );
    }
}

AuthButton.contextType = LabContext;

export default AuthButton;