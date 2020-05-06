import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'cirrus-ui';

class NavDropDown extends Component {

    // initial state (dropdown nav menu is hidden)
    state = {
        listOpen: false,
    };

    // on click of list element, toggle list hidden / showing
    toggleList = () => {
        this.setState({
            listOpen: !this.state.listOpen,
        })
    }

    // this dropdown only shows for mobile screen sizes
  render(){
    return (
        <div className="dd-wrapper">
            <div className="dd-header">
                <div className="dd-title" onClick={ this.toggleList }>
                    <p><i className="fa fa-wrapper fa-bars"></i> Menu</p>
                </div>
            </div>
            { this.state.listOpen &&
                <ul className="dd-list no-bullets" onClick={this.toggleList}>
                    <li className="dd-list-item">
                    <Link to="/home">
                        {/* but call this link 'Home' if they are logged in,
                        and call this link 'Login / Register' if they are not */}
                        {this.props.user.id ? 'Home' : 'Login / Register'}
                    </Link>
                    </li>
                    {this.props.user.id && (
                        <>
                        <li className="dd-list-item">
                            <Link to='/kitchen'>
                                Your Kitchen
                            </Link>
                        </li>
                        <li className="dd-list-item">
                            <Link to='/list'>
                                Shopping List
                            </Link>
                        </li>
                        <li className="dd-list-item">
                            <Link to='/home' onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
                                Log Out
                            </Link>
                        </li>
                        </>
                    )}
                    <li className="dd-list-item">
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                </ul>
            }
      </div>
    )
  }
}











const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(NavDropDown);