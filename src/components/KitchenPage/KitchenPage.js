import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddItemForm from '../AddItemForm/AddItemForm';

import 'cirrus-ui'
import './KitchenPage.css';

class KitchenPage extends Component {

  state = {
    modal: false,
    itemId: '',
    selectedName: '',
  }

    // on click of button, take user to edit item page for selected item,
    // or delete item based on button clicked
    handleClick = (event, buttonName, itemId) => {
      const kitchenId = this.props.selectedKitchen;
      console.log( 'itemId in hanldeClick', itemId )
      // console.log( 'Got an edit', itemId );
      if( buttonName === 'edit' ) {
        this.props.dispatch( { type: 'SELECT_ITEM', payload: {itemId, kitchenId} } );
        this.props.history.push( `/editItem/${itemId}`)
      }
      else if( buttonName === 'delete' ) {
        console.log( 'deleting item');
        this.props.dispatch( { type: 'DELETE_ITEM', payload: {itemId, kitchenId } } );
      }
      // else buttonName = add
      else {
        console.log( 'Adding item to shopping list' );
        this.props.dispatch( { type: 'ADD_TO_SHOPPING_LIST', payload: { itemId, kitchenId } } );
      }
    }; // end handleClick

    // loops over all the kitchens the user is a part of and when finds matching id's with the selected kitchen,
    // returns that kitchen name
    getKitchen() {
      for( const kitchen of this.props.kitchens ) {
        if ( this.props.selectedKitchen === kitchen.kitchen_id ) {
          return <div id="kitchen-title"><h4 id="kitchen-title">{kitchen.name}</h4></div>
        }
      }
    }; // end getKitchen

    // check quantity compares the current quantity in the kitchen to the min for each item as .map occurs
    checkQuantity( quantity, minimum) {
      if( Number(quantity) <= Number(minimum) ) {
        // if the current quantity is below the min value,
        // the item is highlighted on the iventory table
        return 'selected';
      }
    }; // end checkQuantity

    toggleRow = ( event, itemId, itemName ) => {
      console.log( 'Row Selected', itemId );
      if( this.state.modal === false ){
        this.setState({
          modal: true,
          itemId: itemId,
          selectedName: itemName,
        })
      }
      else {
        this.setState({
          modal: false,
          itemId: '',
          selectedName: '',
        })
      }
    }
 
    // displayInventory used for conditional rendering
    displayInventory( inventory ) {
      // only renders to the DOM if inventory is TRUE,
      // creates a table and for the inventory information
      if (inventory && inventory[0].item_id != null && window.innerWidth > 760) {
        return <div>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Minimum</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { inventory.map( item => 
                <tr key={item.item_id} className={this.checkQuantity(item.quantity, item.minimum_quantity)}>
                    <td className="item-name">{item.name}</td>
                      <td>{item.quantity} {item.unit}</td>
                      <td>{item.minimum_quantity} {item.unit}</td>
                      <td>
                        <div className="btn-container">
                          <button
                            className="btn-warning btn-animated"
                            onClick={ (event) => this.handleClick(event, 'edit', item.item_id) }>
                              EDIT
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="btn-container">
                          <button
                            className="btn-success btn-animated"
                            onClick={ (event) => this.handleClick(event, 'add', item.item_id  ) }>
                              ADD TO LIST
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="btn-container">
                          <button
                            className="btn-primary btn-animated"
                            onClick={ (event) => this.handleClick(event, 'delete', item.item_id) }>
                              DELETE
                          </button>
                        </div>
                      </td>
                </tr>
              )}
            </tbody>
          </table>
          <AddItemForm className="kitchen-content"/>
        </div>
      }
      else if (inventory && inventory[0].item_id != null && window.innerWidth < 760) {
        return <div className="kitchen-content">
          <table className="table" id="listTable">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Minimum</th>
              </tr>
            </thead>
            <tbody>
              { inventory.map( item => 
                <tr
                  key={item.item_id}
                  className={this.checkQuantity(item.quantity, item.minimum_quantity)}
                  onClick={(event) => this.toggleRow( event, item.item_id, item.name)}>
                    <td className="item-name">{item.name}</td>
                    <td>{item.quantity} {item.unit}</td>
                    <td>{item.minimum_quantity} {item.unit}</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* div below this point is a modal only visible after clicking on a table row */}
          {this.state.modal && 
          <div className="modal-content" id="edit-item-modal" onClick={this.toggleRow}>
            <div className="modal-body">
              <h5><i className="fa fa-wrapper fa-info-circle"></i>
                Edit {this.state.selectedName}
              </h5>
            </div>
            <div id="edit-modal-body">
            <div className="btn-container">
              <button
                className="btn-small btn-animated btn-warning"
                onClick={ (event) => this.handleClick(event, 'edit', this.state.itemId) }>
                  EDIT
              </button>
            </div>
            <div className="btn-container">
              <button
                className="btn-small btn-animated btn-success"
                onClick={ (event) => this.handleClick(event, 'add', this.state.itemId  ) }>
                  ADD
              </button>
            </div>
            <div className="btn-container">
              <button
                className="btn-small btn-animated btn-primary"
                onClick={ (event) => this.handleClick(event, 'delete', this.state.itemId) }>
                  DELETE
              </button>
            </div>
            </div>
          </div>
        }
          <AddItemForm className="kitchen-content"/>
        </div>
      }
      else {
        return <div>
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Minimum</th>
              <th></th>
            </tr>
          </thead>
        </table>
        <p id="empty-kitchen-message">Looks like your kitchen is empty! Start Adding some items below.</p>
        <AddItemForm />
        </div>
    }; // end displayInventory
  }

  render() {
    // get current kitchen
    // then displayInventory called for conditional rendering
    return (
      <div className="content">
        { this.getKitchen() }
        { this.displayInventory(this.props.inventory) }
      </div>
    );
  }
}


// stores the inventory of seleced kitchen on props.inventory
// store the id of the selected kitchen on props.selectedKitchen
// store all the kitchens the user is a member of on props.kitchens
const mapStateToProps = state => ({
  inventory: state.inventory.inventory,
  selectedKitchen: state.inventory.selectedKitchen,
  kitchens: state.kitchen,
});

export default connect(mapStateToProps)(KitchenPage);