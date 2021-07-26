import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
class Header extends Component {
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>
            default:
                return <li><a href="/api/logout">Logout</a></li>
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                     to={this.props.auth? '/surveys': '/'} 
                     className="left brand-logo"
                     >
                        SurveysManagement
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}
/*
As the first argument passed in to connect , 
mapStateToProps is used for selecting the part of the data from 
the store that the connected component needs.
It's frequently referred to as just mapState for short.
It is called every time the store state changes
*/
function mapStateToProps(state){
    return {auth:state.auth}
}

export default connect(mapStateToProps)(Header);//connect Header comp to redux store