import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ShoppingList.css';

class ShoppingList extends Component {

  // set initial state used for editing list item quantites
  state = {
    editMode: false,
    editList: '',
    editItem: '',
    editQuantity: '',
  }; 

  // either renders the quantity from the database or an input field for editing
  // if the current state is in edit mode or not
  // and the selected current itemId and listId match the clicked buttons
  renderQuantity( itemId, quantity, listId ) {
    if( this.state.editMode === false) {
      return( quantity );
    }
    else {
      console.log( 'Edit Mode State:', this.state )
      if ( listId === this.state.editList ) {
        if( itemId === this.state.editItem ) {
          return <input type="number" value={this.state.editQuantity} onChange={event => this.handleChange(event, itemId, listId)}></input>
        }
        else {
          return( quantity );
        }
      }
      else {
        return( quantity );
      }
    }
  }; // end renderQuantity

  handleChange = ( event, item, list ) => {
    console.log( `Detected Change on list ${list} at item ${item}`, event.target.value );
    this.setState({
      ...this.state,
      editQuantity: event.target.value,
    })
  }

  // checkMin will check if item is below it's min value and should not be removed from list
  // if not below min, return button to allow user to remove from list,
  // if below min, leave td blank
  checkMin( itemId, listId, belowMin ) {
    if ( !belowMin ) {
      return (
        <button
        className="btn btn-animated"
        onClick={(event) => this.handleClickFor( 'delete', itemId, listId )}>
          REMOVE FROM LIST
        </button>
      )
    }
    else {
      return(<></>)
    }
  }

  //Listens for a button click on the page
  handleClickFor = ( buttonName, itemId, quantity, listId ) => {
    console.log( 'Got click on button', buttonName );
    // if the clicked button is the delete button,
    // dispatches an action to delete item from shopping list
    if( buttonName === 'delete' ) {
      console.log( `Deleting item with id ${itemId} from shoppingList with id ${listId}` );
      this.props.dispatch( { type: 'DELETE_FROM_SHOPPING_LIST', payload: { itemId, listId } } );
    }
    // if button is EDIT button,
    // toggles the current edit mode state and either set's the itemId and listId in state,
    // or clears the state
    if ( buttonName === 'edit' ) {
      console.log( 'edit item id', itemId, listId )
      if( this.state.editMode ) {
        const quantity = this.state.editQuantity;
        // console.log( `Ready to dispatch new quantity of ${this.state.editQuantity} for item 
        //               ${this.state.editItem} on list ${this.state.editList}` )
        this.props.dispatch( { type: 'EDIT_SHOPPING_LIST', payload: { listId, itemId, quantity } } );
        this.setState({
          editMode: false,
          editList: '',
          editItem: '',
          editQuantity: '',
        });
      }
      else {
        this.setState({
          editMode: true,
          editList: listId,
          editItem: itemId,
          editQuantity: quantity,
        })
      }
    }
  }; // end handleClickFor

  componentDidMount() {
    this.props.dispatch( { type: 'GET_SHOPPING_LIST' } );
  }

  render() {
    return (
      <div className="card content">
          {this.props.shoppingList.map( kitchenList =>
              <>
                <div className="card-header">
                  <h3 className="card-head-title">{kitchenList.listName}</h3>
                  <div className="divider"></div>
                </div>
                <table className="table small striped" key={kitchenList.listId}>
                  <thead>
                    <tr>
                      <th>Items</th>
                      <th>Quantity</th>
                      <th className="button-column"></th>                      
                      <th className="button-column"></th>
                      <th className="button-column"></th>
                    </tr>
                  </thead>
                  <tbody>
                    { kitchenList.items.map( item => 
                      <tr key={item.itemId}>
                        <td>{item.itemName}</td>
                        <td>
                          {this.renderQuantity( item.itemId, item.quantity, kitchenList.listId ) }
                        </td>
                        <td>
                          <button
                            className="btn btn-animated"
                            onClick={(event) => this.handleClickFor( 'edit', item.itemId, item.quantity, kitchenList.listId )}>
                              EDIT
                          </button>
                        </td>
                        <td><button className="btn btn-animated">BOUGHT_BTN</button></td>
                        <td>
                          {this.checkMin( item.itemId, kitchenList.listId, item.belowMin )}
                        </td>
                      </tr>
                      )}
                  </tbody>
                  <tfoot>
                    <tr className="table-footer">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </>
            )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shoppingList: state.shoppingList,
});

export default connect(mapStateToProps)(ShoppingList);