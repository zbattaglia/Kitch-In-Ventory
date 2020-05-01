import React, { Component } from 'react';
import { connect } from 'react-redux';

import './KitchenPage.css';

class KitchenPage extends Component {

    // on click of edit button, take user to edit item page
    handleEdit = (event, itemId) => {
      const kitchenId = this.props.selectedKitchen;
      // console.log( 'Got an edit', itemId );
      this.props.dispatch( { type: 'SELECT_ITEM', payload: {itemId, kitchenId} } );
      this.props.history.push( `/editItem/${itemId}`)
    }

    // loops over all the kitchens the user is a part of and when finds matching id's with the selected kitchen,
    // returns that kitchen name
    getKitchen() {
      for( const kitchen of this.props.kitchens ) {
        if ( this.props.selectedKitchen === kitchen.kitchen_id ) {
          return <div id="kitchen-title"><h4>{kitchen.name}</h4></div>
        }
      }
    }; // end getKitchen

    // displayInventory used for conditional rendering
    displayInventory( inventory ) {
      // only renders to the DOM if inventory is TRUE,
      // creates a table and for the inventory information
      if (inventory && inventory[0].item_id != null) {
        return <table className="table">
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
              <tr key={item.item_id}>
                  <td>{item.name}</td>
                    <td>{item.quantity} {item.unit}</td>
                    <td>{item.minimum_quantity} {item.unit}</td>
                    <td><button onClick={ (event) => this.handleEdit(event, item.item_id) }>EDIT</button>
                    </td><td><button>ADD TO LIST</button></td>
              </tr>
            )}
          </tbody>
        </table>
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
        </div>
      }
    }; // end displayInventory

  render() {
    // displayInventory called for conditional rendering
    return (
      <div className="content">
          { this.getKitchen() }
          {this.displayInventory(this.props.inventory)}

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