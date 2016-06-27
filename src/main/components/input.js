import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TitleActions from '../state/title';

const Input = ({ title, actions }) => (
  <div>
    <label>Enter new title: </label>
    <input value={title} onChange={e => actions.changeTitle(e.target.value)} />
  </div>
)

export default connect (
  // map state to props
  state => ({ title: state.title }),
  // map dispatch to props
  dispatch => ({ actions: bindActionCreators(TitleActions, dispatch) })
)(Input);
