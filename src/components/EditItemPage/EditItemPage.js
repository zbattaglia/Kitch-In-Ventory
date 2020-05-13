import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'cirrus-ui';
import './EditItemPage.css';

class EditItemPage extends Component {

  state = {
      name: '',
      quantity: '',
      unit: '',
      minimumQuantity: '',
  }

  handleChangeFor( event, propName ) {
    console.log( 'Got change on', propName, event.target.value );
    this.setState({
      ...this.state,
      [ propName ]: event.target.value,
    })
  }

  handleClick = (event, buttonName, item ) => {
    console.log( 'Got a click on button', buttonName );
    const kitchenId = this.props.kitchenId;
    const itemId = this.props.editItem.id;

    let itemInfo = { name: this.state.name };

    if( this.state.quantity === '' ) {
      itemInfo.quantity = item.quantity
    }
    else {
      itemInfo.quantity = this.state.quantity
    }

    if( this.state.unit === '' ) {
      itemInfo.unit = item.unit
    }
    else {
      itemInfo.unit = this.state.unit
    }

    if( this.state.minimumQuantity === '' ) {
      itemInfo.minimumQuantity = item.minimum_quantity
    }
    else {
      itemInfo.minimumQuantity = this.state.minimumQuantity
    }

    if( buttonName === 'submit' ) {
      this.props.dispatch( { type: 'EDIT_ITEM', payload: {kitchenId: kitchenId, itemId: itemId, itemInfo } } );
      this.setState({
        name: '',
        quantity: '',
        unit: '',
        minimumQuantity: '',
      })
    }
    this.props.history.push( '/kitchen' );
  }

  render() {
    return (
      <div className="row">
        <div className="card col-5" id="edit-item-card">
          <div className="card-head">
            <h4 className="card-head-title" id="card-title">Edit {this.props.editItem.name}</h4>
          </div>
          <div className="content">
            <form>
              <div className="row">
                <div className="col-4 level-item">
                  <p>Quantity:</p>
                </div>
                <div className="col-8 level-item">
                  <input
                  type="number"
                  value={this.state.quantity || this.props.editItem.quantity }
                  onChange={ (event) => this.handleChangeFor( event, "quantity" )}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 level-item">
                  <p>Min Quantity:</p>
                </div>
                <div className="col-8 level-item">
                  <input
                  type="number"
                  value={ this.state.minimumQuantity || this.props.editItem.minimum_quantity }
                  onChange={ (event) => this.handleChangeFor( event, "minimumQuantity" )}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 level-item">
                  <p>Unit:</p>
                </div>
                <div className="col-8 level-item">
                  <input
                  type="text"
                  value={this.state.unit || this.props.editItem.unit }
                  onChange={ (event) => this.handleChangeFor( event, "unit" )}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="action-bar">
            <button className="btn-light" onClick={ (event) => this.handleClick( event, 'back' )}>BACK</button>
            <button className="btn-success" onClick={ (event) => this.handleClick( event, 'submit', this.props.editItem )}>SAVE CHANGES</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    kitchenId: state.inventory.selectedKitchen,
    editItem: state.item,
    inventory: state.inventory,
});

export default connect(mapStateToProps)(EditItemPage);