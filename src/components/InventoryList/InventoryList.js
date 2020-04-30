import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'cirrus-ui';

class InventoryList extends Component {

  render(){
    return (
        <div>

        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  kitchen: state.kitchen,
});

// Allows for InventoryList to be called on the user Page
export default connect(mapStateToProps)(InventoryList);