import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ShoppingList.css';

class ShoppingList extends Component {

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
                <table className="table small striped">
                  <thead>
                    <tr>
                      <th>Items</th>
                      <th>Quantity</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    { kitchenList.items.map( item => 
                      <tr>
                        <td>{item.itemName}</td>
                        <td>{item.quantity}</td>
                        <td>EDIT_BTN</td>
                        <td>BOUGHT_BTN</td>
                        <td>REMOVE_BTN</td>
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