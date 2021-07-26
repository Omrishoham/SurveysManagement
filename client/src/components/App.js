import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {connect} from 'react-redux'//we use connect in order to call action creators in class components
import * as actions from '../actions'
import Header from './Header'
import Landing from './Landing'

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();

    }
    render() {
        return (
            <div className="container">
                <Router>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default connect(null,actions)(App);//first arg is map state arg , second is actions; now we can call actions with props