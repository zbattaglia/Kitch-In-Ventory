import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'cirrus-ui';
import './AddKitchenForm.css';

class AddKitchenForm extends Component {

    state = {
        name: '',
    }

    handleChange = (event) => {
        console.log('got change', event.target.value)
        this.setState({
            name: event.target.value,
        })
    }

    handleClick = () => {
        console.log( 'Got click on addKitchen', this.state);
        this.props.dispatch( { type: 'ADD_KITCHEN', payload: this.state } );
        this.setState({
            name: '',
        })
    }

  render(){
    return (
        <div className="btn-container">
            <div className="input-control">     
                <input
                className="Input-Field"
                type="text"
                value={this.state.name}
                onChange={ (event) => this.handleChange( event )}
                />
            </div> 
            <button type="submit" className="btn-small btn-animated" id="addKitchen-btn" onClick={this.handleClick}>
                Add a Kitchen
            </button>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  kitchen: state.kitchen,
});

// Allows for AddKitchenButton to be used on kitchen list
export default connect(mapStateToProps)(AddKitchenForm);