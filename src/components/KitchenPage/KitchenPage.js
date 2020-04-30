import React, { Component } from 'react';
import { connect } from 'react-redux';

import './KitchenPage.css';

class KitchenPage extends Component {

    handleEdit = () => {
        this.props.history.push( '/editItem')
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
      if (inventory) {
        return <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { inventory.map( item => 
              <tr key={item.item_id}>
                  <td>{item.name}</td><
                    td>{item.quantity}</td>
                    <td>{item.minimum_quantity}</td>
                    <td><button onClick={ this.handleEdit }>EDIT</button>
                    </td><td><button>ADD TO LIST</button></td>
              </tr>
            )}
          </tbody>
        </table>
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