import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShoppingListPage extends Component {

  render() {
    return (
      <div>
          <h1>{this.props.username}'s Shopping List</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
});

export default connect(mapStateToProps)(ShoppingListPage);