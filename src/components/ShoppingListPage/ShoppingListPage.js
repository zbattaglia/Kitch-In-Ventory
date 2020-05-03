import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShoppingList from '../ShoppingList/ShoppingList';

class ShoppingListPage extends Component {

  componentDidMount() {
    this.props.dispatch( { type: 'GET_SHOPPING_LIST' } );
  }

  render() {
    return (
      <div>
          <h1>{this.props.username}'s Shopping List</h1>
          <ShoppingList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
});

export default connect(mapStateToProps)(ShoppingListPage);