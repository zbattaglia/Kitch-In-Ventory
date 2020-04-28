import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditItemPage extends Component {

  render() {
    return (
      <div>
          <h1>Edit Item Page</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
//   username: state.user.username,
});

export default connect(mapStateToProps)(EditItemPage);