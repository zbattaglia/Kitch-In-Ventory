import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddItemForm from '../AddItemForm/AddItemForm';

import 'cirrus-ui'
import './KitchenPage.css';

class KitchenPage extends Component {

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
          return <div id="kitchen-title"><h4>{kitchen.name}</h4></div>
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
 
    // displayInventory used for conditional rendering
    displayInventory( inventory ) {
      // only renders to the DOM if inventory is TRUE,
      // creates a table and for the inventory information
      if (inventory && inventory[0].item_id != null) {
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
                    <td>{item.name}</td>
                      <td>{item.quantity} {item.unit}</td>
                      <td>{item.minimum_quantity} {item.unit}</td>
                      <td>
                        <div className="btn-container">
                          <button
                            className="btn btn-animated"
                            onClick={ (event) => this.handleClick(event, 'edit', item.item_id) }>
                              EDIT
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="btn-container">
                          <button
                            className="btn btn-animated"
                            onClick={ (event) => this.handleClick(event, 'add', item.item_id  ) }>
                              ADD TO LIST
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="btn-container">
                          <button
                            className="btn btn-animated"
                            onClick={ (event) => this.handleClick(event, 'delete', item.item_id) }>
                              DELETE
                          </button>
                        </div>
                      </td>
                </tr>
              )}
            </tbody>
          </table>
          <AddItemForm />
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
        <p>Looks like your kitchen is empty! Start Adding some items below.</p>
        <AddItemForm />
        </div>
      }
    }; // end displayInventory

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
};

// stores the inventory of seleced kitchen on props.inventory
// store the id of the selected kitchen on props.selectedKitchen
// store all the kitchens the user is a member of on props.kitchens
const mapStateToProps = state => ({
  inventory: state.inventory.inventory,
  selectedKitchen: state.inventory.selectedKitchen,
  kitchens: state.kitchen,
});

export default connect(mapStateToProps)(KitchenPage);