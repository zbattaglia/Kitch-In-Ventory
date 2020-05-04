import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ShoppingList.css';

class ShoppingList extends Component {

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

  handleClickFor = ( buttonName, itemId, listId ) => {
    console.log( 'Got click on button', buttonName );
    if( buttonName === 'delete' ) {
      console.log( `Deleting item with id ${itemId} from shoppingList with id ${listId}` );
      this.props.dispatch( { type: 'DELETE_FROM_SHOPPING_LIST', payload: { itemId, listId } } );
    }
    // if ( buttonName === 'edit' ) {
    //   console.log( 'edit item id', itemId )
    //   this.setState({
    //     ...this.state,
    //     edit: !this.state.edit,
    //   })
    // }
  }

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
                        <td>{item.quantity}</td>
                        <td>
                          <button
                            className="btn btn-animated"
                            onClick={(event) => this.handleClickFor( 'edit', item.itemId )}>
                              EDIT QUANTITY
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