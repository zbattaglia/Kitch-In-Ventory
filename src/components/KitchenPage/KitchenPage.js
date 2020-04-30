import React, { Component } from 'react';
import { connect } from 'react-redux';

import './KitchenPage.css';

class KitchenPage extends Component {

    handleEdit = () => {
        this.props.history.push( '/editItem')
    }

    getKitchen() {
      for( const kitchen of this.props.kitchens ) {
        if ( this.props.kitchen === kitchen.kitchen_id ) {
          return <p>{kitchen.name}</p>
        }
      }
    }

    displayInventory( inventory ) {
      if (inventory) {
        return <ul>
          { inventory.map( item => 
            <li key={item.item_id}>
              <div className="li-row">
                {item.name}: {item.quantity} / {item.minimum_quantity} <button>EDIT</button> <button>ADD TO LIST</button>
              </div>
            </li>
          )}
        </ul>
      }
    }

  render() {
    return (
      <div>
          <p>{JSON.stringify(this.props.inventory)}</p>
          <p>{JSON.stringify(this.props.kitchen)}</p>
          <p>{JSON.stringify(this.props.kitchens)}</p>
          { this.getKitchen() }
          {this.displayInventory(this.props.inventory)}
            {/* <ul>
              {this.props.inventory.map( (item) =>
                <li key={item.id}>
                  {item.name} {item.quantity} / {item.minimum_quantity}
                </li>
              )}
            </ul> */}
            {/* <h1>{this.props.inventory[0].kitchen_name}</h1> */}
            <button className="inverse" onClick={ this.handleEdit }>Edit</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inventory: state.inventory.inventory,
  kitchen: state.inventory.selectedKitchen,
  kitchens: state.kitchen,
});

export default connect(mapStateToProps)(KitchenPage);