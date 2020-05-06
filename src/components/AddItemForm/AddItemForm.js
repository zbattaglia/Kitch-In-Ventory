import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'cirrus-ui';
import './AddItemForm.css';

class AddItemForm extends Component {

  // set initial state
  state = {
    name: '',
    quantity: '',
    minimumQuantity: '',
    unit: '',
  }

  // tracks changes on input fields and updates state
  handleChangeFor( event, propName ) {
    console.log( 'Got change on input', propName, event.target.value );
    this.setState({
      ...this.state,
      [ propName ]: event.target.value,
    })
  }; // end handle change

  // onClick of add to kitchen button,
  // dispatch action with current state, and reset state for next input
  handleClick = () => {
    console.log( 'Add to kitchen:', this.state );
    const kitchenId = this.props.kitchenId;
    this.props.dispatch( { type: 'ADD_ITEM', payload: {kitchenId: kitchenId, itemInfo: this.state } } );
    this.setState({
      name: '',
      quantity: '',
      minimumQuantity: '',
      unit: '',
    })
  }; // end handle click

  render(){
    return (
        <div className="row">
        <div className="card col-10" id="edit-item-card">
          <div className="card-header">
            <h4 className="card-header-title" id="card-title">Add Item</h4>
          </div>
          <div className="divider"></div>
          <div className="content">
            <form>
                <div className="row item-content">
                    <div className="col-4 level-item">
                        <p>Name:</p>
                    </div>
                    <div className="col-8 level-item">
                    <input
                      type="text"
                      value={this.state.name}
                      onChange={ (event) => this.handleChangeFor( event, "name" )}
                    />
                    </div>
                </div>
              <div className="row item-content">
                <div className="col-4 level-item">
                  <p>Quantity:</p>
                </div>
                <div className="col-8 level-item">
                  <input
                  type="number"
                  value={this.state.quantity}
                  onChange={ (event) => this.handleChangeFor( event, "quantity" )}
                  />
                </div>
              </div>
              <div className="row item-content">
                <div className="col-4 level-item">
                  <p>Min Quantity:</p>
                </div>
                <div className="col-8 level-item">
                  <input
                  type="number"
                  value={this.state.minimumQuantity}
                  onChange={ (event) => this.handleChangeFor( event, "minimumQuantity" )}
                  />
                </div>
              </div>
              <div className="row item-content">
                <div className="col-4 level-item">
                  <p>Unit:</p>
                </div>
                <div className="col-8 level-item">
                  <input
                  type="text"
                  value={this.state.unit}
                  onChange={ (event) => this.handleChangeFor( event, "unit" )}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="divider"></div>
          <div id="item-footer">
            <button className="btn-info" onClick={ (event) => this.handleClick( event )}>ADD TO KITCHEN</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  kitchenId: state.inventory.selectedKitchen,
});

export default connect(mapStateToProps)(AddItemForm);