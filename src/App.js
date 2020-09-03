import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LabContext from './lab.context';
import StudentPage from './pages/student-page/student-page-page';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginPage from './pages/login-page/login-page.page';
import MainPage from './pages/main-page/main-page.page';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  //-----------------------------------------------------
  // Original function - uncomment to restore AuthButton
  // ----------------------------------------------------
  render () {
    return (
      <Router>
        <div>
          <LabContext.Provider value={this.state}>
            <LabContext.Consumer>
              {({context}) => (
                <Switch>
                  <Route path="/" exact render={props => (
                    this.props.userid === ""
                    ? <LoginPage handleSaveButton={this.handleSaveButton}/>
                    : <MainPage/>
                  )}/>
                  <Route path="/student/:workshop_id/:student_id?" component={StudentPage} />
                  <Route path="/login">
                    <LoginPage redirectTarget="/"/>
                  </Route>
                  <Route>
                    <div className="TopLevelDiv"><h1>Page not found</h1></div>
                  </Route>
                </Switch>
              )}
            </LabContext.Consumer>
          </LabContext.Provider>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  userid: state.user.userid
})

export default connect(mapStateToProps)(App);
