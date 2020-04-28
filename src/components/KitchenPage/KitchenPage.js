import React, { Component } from 'react';
import { connect } from 'react-redux';



class KitchenPage extends Component {

    handleEdit = () => {
        this.props.history.push( '/editItem')
    }

  render() {
    return (
      <div>
            <h1>{this.props.username}'s Kitchen</h1>
            <button className="inverse" onClick={ this.handleEdit }>Edit</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
});

export default connect(mapStateToProps)(KitchenPage);