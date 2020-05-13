import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'cirrus-ui';
import './AddKitchenForm.css';

class AddKitchenForm extends Component {

    state = {
        name: '',
        modal: false,
    }

    handleChange = (event) => {
        console.log('got change', event.target.value)
        this.setState({
            name: event.target.value,
        })
    }

    handleClick = () => {
        console.log( 'Got click on addKitchen', this.state);
        if( this.state.name !== '' ){
            this.props.dispatch( { type: 'ADD_KITCHEN', payload: {name: this.state.name } } );
            this.setState({
                name: '',
            })
        }
        else {
            this.setState({
                modal: true,
            })
        }
    }

    closeModal = () => {
        this.setState({
            modal: false,
        })
    }

  render(){
    return (
        <div className="row" id="page-content">
            <div className="card col-12">
                <div className="btn-container">
                    <div className="input-control">     
                        <input
                        className="Input-Field"
                        type="text"
                        value={this.state.name}
                        onChange={ (event) => this.handleChange( event )}
                        />
                    </div>
                    <div className="btn-container" id="addKitchen-container"> 
                        <button
                            type="submit"
                            className="btn-success"
                            id="addKitchen-btn"
                            onClick={this.handleClick}>
                            Add a Kitchen
                        </button>
                    </div>
                </div>
            </div>
            { this.state.modal && 
                <div
                className="modal-content"
                id="id-kitchen-error"
                onClick={this.closeModal}
                >
                    <div className="modal-header" id="kitchen-modal-header">
                        <h4><i className="fa fa-wrapper fa-exclamation-circle" ></i></h4>
                    </div>
                    <div className="modal-body">
                        <p>Please provide a name for your kitchen.</p>
                    </div>
                </div>
            }
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