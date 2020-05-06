import React from 'react';
import { connect } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It only cares if the user is logged in or not

const AboutPage = (props) => (
  <div className="content">

    {props.user.id ? 
      <p>
        logged in
      </p>
      :
      <p>
        The Kitch-In-Ventory app makes it so user's never have to try and remember what's in their kitchen again!
        Create a kitchen and record the amount of each item and the minimum allowable amount for that item.
        Whenever the amount of an item in the kitchen is below it's minimum it will automatically be added to a shopping list
        for easy shopping when at the grocery store.
        < br />
        Just create an account to get started!
      </p>
    }
  </div>
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(AboutPage);