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

  componentDidMount() {
    for ( let prop in this.props.editItem ) {
      this.setState({
        ...this.state,
        name: prop.name,
        quantity: prop.quantity,
        unit: prop.unit,
        minimumQuantity: prop.minimumQuantity,
      })
    }
  }

  handleChangeFor( event, propName ) {
    console.log( 'Got change on', propName, event.target.value );
    this.setState({
      ...this.state,
      [ propName ]: event.target.value,
    })
  }

  handleClick = (event, buttonName ) => {
    console.log( 'Got a click on button', buttonName );
    const kitchenId = this.props.kitchenId;
    const itemId = this.props.editItem.id;
    if( buttonName === 'submit' ) {
      this.props.dispatch( { type: 'EDIT_ITEM', payload: {kitchenId: kitchenId, itemId: itemId, itemInfo: this.state } } );
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
                  value={this.state.quantity || '' }
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
                  value={this.state.minimumQuantity || '' }
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
                  value={this.state.unit || '' }
                  onChange={ (event) => this.handleChangeFor( event, "unit" )}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="action-bar">
            <button className="btn" onClick={ (event) => this.handleClick( event, 'back' )}>BACK</button>
            <button className="btn" onClick={ (event) => this.handleClick( event, 'submit' )}>SAVE CHANGES</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    kitchenId: state.inventory.selectedKitchen,
    editItem: state.item,
});

export default connect(mapStateToProps)(EditItemPage);