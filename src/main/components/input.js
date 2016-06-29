import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TitleActions from '../state/title';

import styles from './input.less';

const Input = ({ title, actions }) => (
  <div class={styles.input}>
    <label class={styles['input-label']}>Enter title</label>
    <input class={styles['input-textbox']}value={title} onChange={e => actions.changeTitle(e.target.value)} autoFocus />
  </div>
)

export default connect (
  // map state to props
  state => ({ title: state.title }),
  // map dispatch to props
  dispatch => ({ actions: bindActionCreators(TitleActions, dispatch) })
)(Input);
